#!/usr/bin/env node
// Scans every drafted question and enforces two owner rules:
//   1. no question may repeat (exact, normalised or near-duplicate wording of the same fact)
//   2. no meta/curriculum word may appear anywhere in a question (stem, option, explanation, cue)
// Usage: node scripts/question-lint.mjs [--write]
// With --write it emits content/questions/DRAFT_UNIQUE_QUESTIONS.json and .md from the approved parts.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PARTS = [
  'part-01-physical-world', 'part-02-india', 'part-03-international', 'part-04-science-culture',
  'part-05-india-extended', 'part-06-world-extended', 'part-07-science-extended', 'part-08-culture-extended',
];

// Words that talk about the course instead of the world. Banned in both languages.
// 'module' is not banned bare: "Command Module" and "lunar module" are NASA proper names.
// The curriculum senses are caught through 'learning module' / 'module-wise' instead.
const BANNED = [
  'syllabus', 'syllabi', 'syllabus-wise',
  'assessing', 'assess', 'assessment', 'assessments', 'assessed',
  'curriculum', 'curricula',
  'learning outcome', 'learning outcomes', 'learning objective', 'learning objectives',
  'question paper', 'question papers', 'exam pattern', 'exam-pattern', 'multiple choice', 'mcq', 'mcqs',
  'quiz', 'quizzes', 'test yourself', 'test your', 'practice set', 'revision set',
  'chapter', 'chapters', 'chapter-wise', 'unit-wise', 'topic-wise',
  'learning module', 'learning modules', 'module-wise',
  'negative marking', 'marking scheme', 'as per the syllabus', 'this question',
  'पाठ्यक्रम', 'पाठ्यक्रम-आधारित', 'मूल्यांकन', 'अध्याय', 'प्रश्न पत्र', 'परीक्षा पैटर्न', 'यूनिट', 'प्रश्नोत्तरी',
];

// Normalisation follows the repo rule: punctuation is stripped, but digits, decimal points,
// degree signs and micro/prefix symbols are kept so that 2.5 and 25 stay different distractors.
const norm = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^0-9a-z\u0900-\u097F.%°²³×\- ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const STOP = new Set([
  'a', 'an', 'the', 'of', 'in', 'on', 'at', 'to', 'for', 'is', 'are', 'was', 'were', 'which', 'what', 'who',
  'whom', 'whose', 'these', 'those', 'this', 'that', 'it', 'its', 'by', 'with', 'from', 'as', 'be', 'been',
  'do', 'does', 'did', 'not', 'or', 'and', 'than', 'then', 'when', 'where', 'how', 'why', 'has', 'have', 'had',
  'का', 'की', 'के', 'को', 'में', 'से', 'पर', 'है', 'हैं', 'था', 'थी', 'थे', 'और', 'या', 'काउ', 'निम्नलिखित', 'किस', 'कौन', 'क्या', 'है।',
]);
const words = (s) => norm(s).split(' ').filter((w) => w && !STOP.has(w));
const jaccard = (a, b) => {
  const A = new Set(a);
  const B = new Set(b);
  const inter = [...A].filter((w) => B.has(w)).length;
  const union = new Set([...A, ...B]).size;
  return union === 0 ? 0 : inter / union;
};

const problems = [];
const fail = (id, kind, detail) => problems.push({ id, kind, detail });

const records = [];
for (const part of PARTS) {
  const path = join(ROOT, 'content/questions/parts', `${part}.json`);
  const list = JSON.parse(readFileSync(path, 'utf8'));
  for (const q of list) {
    if (!Array.isArray(list) || list.indexOf(q) !== list.lastIndexOf(q)) fail(q.id, 'PART_DUPLICATE', part);
    records.push({ ...q, part });
  }
}

// ---- structural checks -------------------------------------------------
for (const q of records) {
  const id = q.id ?? '(missing id)';
  if (!q.q?.en || !q.q?.hi) fail(id, 'MISSING_TEXT', 'needs English and Hindi stem');
  if (!Array.isArray(q.options) || q.options.length !== 4) fail(id, 'OPTIONS', 'needs exactly four options');
  else {
    const seen = new Map();
    q.options.forEach((o, i) => {
      if (!o?.en || !o?.hi) fail(id, 'OPTION_TEXT', `option ${i + 1} needs English and Hindi`);
      const n = norm(o.en);
      if (seen.has(n)) fail(id, 'OPTION_COLLISION', `"${o.en}" repeats option ${seen.get(n) + 1}`);
      else seen.set(n, i);
    });
  }
  if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) fail(id, 'ANSWER', 'correctIndex must be 0-3');
  if (!q.explanation?.en || !q.explanation?.hi) fail(id, 'EXPLANATION', 'needs English and Hindi explanation');
  if (!q.sourceIds?.length) fail(id, 'SOURCE', 'needs at least one sourceId from SOURCE_REGISTRY.json');
}

// ---- banned meta-language scan ----------------------------------------
for (const q of records) {
  const fields = [
    ['stem', q.q?.en], ['stem', q.q?.hi],
    ['explanation', q.explanation?.en], ['explanation', q.explanation?.hi],
    ['cue', q.memoryCue?.en], ['cue', q.memoryCue?.hi],
    ...(q.options ?? []).flatMap((o, i) => [[`option ${i + 1}`, o?.en], [`option ${i + 1}`, o?.hi]]),
  ];
  for (const [where, text] of fields) {
    if (!text) continue;
    const hay = ` ${text.toLowerCase()} `;
    for (const bad of BANNED) if (hay.includes(bad)) fail(q.id, 'BANNED_WORD', `"${bad}" in ${where}: ${text}`);
  }
}

// ---- uniqueness --------------------------------------------------------
const ids = new Map();
const stems = new Map();
const facts = new Map();
for (const q of records) {
  if (ids.has(q.id)) fail(q.id, 'ID_COLLISION', `same id as record ${ids.get(q.id)}`);
  else ids.set(q.id, q.part);

  const stem = norm(q.q.en);
  const fingerprint = createHash('sha256').update(stem + '|' + q.options.map((o) => norm(o.en)).sort().join('|')).digest('hex').slice(0, 16);
  q.fingerprint = fingerprint;

  if (stems.has(stem)) fail(q.id, 'EXACT_DUPLICATE', `identical stem to ${stems.get(stem)}`);
  else stems.set(stem, q.id);

  const answer = norm(q.options[q.correctIndex]?.en ?? '');
  const key = answer;
  const w = words(q.q.en);

  // Owner rule: one question per fact, not three or four reworded variants of it.
  // A fact is identified by the answer plus the source it was drawn from.
  const factKey = `${answer}|${(q.sourceIds ?? []).join(',')}`;
  if (facts.has(`FACT${factKey}`)) {
    fail(q.id, 'SAME_FACT_REWORDED', `the fact "${q.options[q.correctIndex].en}" already has a question (${facts.get(`FACT${factKey}`)[0].id}); one question per fact`);
  } else facts.set(`FACT${factKey}`, [{ id: q.id, words: w }]);
  if (facts.has(key)) {
    for (const prior of facts.get(key)) {
      if (jaccard(w, prior.words) >= 0.5) fail(q.id, 'SAME_FACT_REWORDED', `same answer "${q.options[q.correctIndex].en}" as ${prior.id} with similar wording`);
    }
    facts.get(key).push({ id: q.id, words: w });
  } else facts.set(key, [{ id: q.id, words: w }]);
}

// near-identical wording even when the answer differs
for (let i = 0; i < records.length; i++) {
  for (let j = i + 1; j < records.length; j++) {
    const sim = jaccard(words(records[i].q.en), words(records[j].q.en));
    if (sim >= 0.8) fail(records[j].id, 'NEAR_DUPLICATE', `${Math.round(sim * 100)}% same wording as ${records[i].id}`);
  }
}

// ---- answer-position spread -------------------------------------------
// A bank where the right answer always sits in the same slot is guessable, so
// no position may hold more than 40% of the answers.
if (records.length >= 20) {
  const spread = [0, 0, 0, 0];
  for (const q of records) spread[q.correctIndex]++;
  const worst = spread.indexOf(Math.max(...spread));
  const share = spread[worst] / records.length;
  if (share > 0.4) {
    fail('CORPUS', 'ANSWER_POSITION_SKEW',
      `position ${'ABCD'[worst]} holds ${spread[worst]}/${records.length} answers (${Math.round(share * 100)}%); re-run the option rotation`);
  }
  console.log(`answer positions: A=${spread[0]} B=${spread[1]} C=${spread[2]} D=${spread[3]}`);
}

// ---- app-schema payload ------------------------------------------------
const payload = records.map((q, i) => ({
  id: `DRAFT-${q.id}`,
  subjectId: '',
  chapterId: '',
  topicId: '',
  conceptIds: [],
  question: { en: q.q.en, hi: q.q.hi },
  options: q.options.map((o) => ({ en: o.en, hi: o.hi })),
  correctIndex: q.correctIndex,
  difficulty: q.difficulty,
  angle: 'SINGLE_FACT_RECALL',
  explanation: { en: q.explanation.en, hi: q.explanation.hi },
  detailedExplanation: { en: q.explanation.en, hi: q.explanation.hi },
  wrongReasons: [],
  memoryCue: { en: q.memoryCue?.en ?? '', hi: q.memoryCue?.hi ?? '' },
  factCardIds: [],
  sourceIds: q.sourceIds,
  fingerprint: q.fingerprint,
  lifecycle: 'DRAFT_PENDING_REVIEW',
  qualityScore: 0,
  dynamic: false,
  validUntil: null,
  kind: 'AUTHORED_DRAFT',
  order: i + 1,
}));

const report = {
  scannedFiles: PARTS.length,
  questionsScanned: records.length,
  uniqueStems: new Set(records.map((q) => norm(q.q.en))).size,
  uniqueFingerprints: new Set(records.map((q) => q.fingerprint)).size,
  uniqueAnswers: new Set(records.map((q) => norm(q.options[q.correctIndex].en))).size,
  bannedWordHits: problems.filter((p) => p.kind === 'BANNED_WORD').length,
  duplicateHits: problems.filter((p) => ['EXACT_DUPLICATE', 'SAME_FACT_REWORDED', 'NEAR_DUPLICATE', 'ID_COLLISION'].includes(p.kind)).length,
  structuralHits: problems.filter((p) => !['BANNED_WORD', 'EXACT_DUPLICATE', 'SAME_FACT_REWORDED', 'NEAR_DUPLICATE', 'ID_COLLISION'].includes(p.kind)).length,
  problems,
};

if (process.argv.includes('--write')) {
  const out = join(ROOT, 'content/questions');
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, 'DRAFT_UNIQUE_QUESTIONS.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), lifecycle: 'DRAFT_PENDING_REVIEW', count: payload.length, bannedWordPolicy: BANNED, questions: payload }, null, 2)}\n`);
  const md = [
    '# Draft question bank — unique, meta-word free',
    '',
    `Generated ${new Date().toISOString()} by \`node scripts/question-lint.mjs --write\`.`,
    '',
    `- ${payload.length} questions, ${report.uniqueStems} distinct stems, ${report.uniqueFingerprints} distinct fingerprints`,
    `- Banned meta-language scan: ${report.bannedWordHits} hits`,
    `- Duplication scan: ${report.duplicateHits} hits`,
    `- Lifecycle: DRAFT_PENDING_REVIEW — not eligible for practice until human review accepts them (see \`src/domain.ts eligible()\`).`,
    '',
  ];
  for (const q of payload) {
    md.push(`### ${q.order}. ${q.question.en}`, `**${q.question.hi}**`, '');
    q.options.forEach((o, i) => md.push(`- ${'ABCD'[i]}. ${o.en} — ${o.hi}`));
    md.push('', `**Answer: ${'ABCD'[q.correctIndex]}. ${q.options[q.correctIndex].en}**`, '');
    md.push(`> ${q.explanation.en}`, `> ${q.explanation.hi}`, '');
    md.push(`Source: ${q.sourceIds.join(', ')} · ${q.difficulty}`, '', '---', '');
  }
  writeFileSync(join(out, 'DRAFT_UNIQUE_QUESTIONS.md'), `${md.join('\n')}\n`);
}

console.log(`scanned ${PARTS.length} part files, ${records.length} questions`);
console.log(`distinct stems: ${report.uniqueStems} | distinct fingerprints: ${report.uniqueFingerprints} | distinct answers: ${report.uniqueAnswers}`);
console.log(`banned meta-word hits: ${report.bannedWordHits} | duplication hits: ${report.duplicateHits} | structural hits: ${report.structuralHits}`);
for (const p of problems) console.log(`FAIL ${p.id} ${p.kind}: ${p.detail}`);
console.log(problems.length ? `RESULT: FAIL (${problems.length} problems)` : 'RESULT: PASS — every question unique, zero meta-language words');
process.exit(problems.length ? 1 : 0);
