#!/usr/bin/env node
// Builds (1) a downloadable ZIP of the draft question bank and (2) the static preview page.
// Usage: node scripts/build-preview.mjs
// Re-run it after any edit to content/questions/parts/*.json + `node scripts/question-lint.mjs --write`.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ZIP_NAME = 'Crorepati_Questions_138_DRAFT.zip';
const bank = JSON.parse(readFileSync(join(ROOT, 'content/questions/DRAFT_UNIQUE_QUESTIONS.json'), 'utf8'));

// ---- ZIP ---------------------------------------------------------------
const staging = join(ROOT, 'preview/.zipstage');
rmSync(staging, { recursive: true, force: true });
mkdirSync(staging, { recursive: true });

// The lint scan runs first so the ZIP can never ship records that fail the owner's two rules.
execFileSync('node', [join(ROOT, 'scripts/question-lint.mjs'), '--write'], { stdio: 'inherit' });

const files = {
  [ZIP_NAME.replace('.zip', '') + '/README.md']: 'content/questions/README.md',
  [ZIP_NAME.replace('.zip', '') + '/DRAFT_UNIQUE_QUESTIONS.json']: 'content/questions/DRAFT_UNIQUE_QUESTIONS.json',
  [ZIP_NAME.replace('.zip', '') + '/DRAFT_UNIQUE_QUESTIONS.md']: 'content/questions/DRAFT_UNIQUE_QUESTIONS.md',
  [ZIP_NAME.replace('.zip', '') + '/parts/part-01-physical-world.json']: 'content/questions/parts/part-01-physical-world.json',
  [ZIP_NAME.replace('.zip', '') + '/parts/part-02-india.json']: 'content/questions/parts/part-02-india.json',
  [ZIP_NAME.replace('.zip', '') + '/parts/part-03-international.json']: 'content/questions/parts/part-03-international.json',
  [ZIP_NAME.replace('.zip', '') + '/parts/part-04-science-culture.json']: 'content/questions/parts/part-04-science-culture.json',
  [ZIP_NAME.replace('.zip', '') + '/COMPLETE_QUESTION_BANK.txt']: 'content/questions/COMPLETE_QUESTION_BANK.txt',
  [ZIP_NAME.replace('.zip', '') + '/scripts/question-lint.mjs']: 'scripts/question-lint.mjs',
};

// Plain-text CSV alongside the JSON, for anyone opening the bank in a spreadsheet.
const esc = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
const csv = ['no,id,difficulty,sourceIds,question_en,question_hi,optA_en,optB_en,optC_en,optD_en,optA_hi,optB_hi,optC_hi,optD_hi,answer,explanation_en,explanation_hi']
  .concat(bank.questions.map((q) => [
    q.order, q.id, q.difficulty, q.sourceIds.join(' | '),
    q.question.en, q.question.hi,
    ...q.options.map((o) => o.en), ...q.options.map((o) => o.hi),
    `${'ABCD'[q.correctIndex]}. ${q.options[q.correctIndex].en}`,
    q.explanation.en, q.explanation.hi,
  ].map(esc).join(',')));
writeFileSync(join(ROOT, 'content/questions/DRAFT_UNIQUE_QUESTIONS.csv'), `\uFEFF${csv.join('\n')}\n`);
files[ZIP_NAME.replace('.zip', '') + '/DRAFT_UNIQUE_QUESTIONS.csv'] = 'content/questions/DRAFT_UNIQUE_QUESTIONS.csv';

for (const [dest, src] of Object.entries(files)) {
  const abs = join(ROOT, src);
  if (!existsSync(abs)) throw new Error(`missing file required by the ZIP: ${src}`);
  const out = join(staging, dest);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, readFileSync(abs));
}

const ZIP_TARGETS = [join(ROOT, 'preview', ZIP_NAME), join(ROOT, 'content/questions', ZIP_NAME)];
for (const target of ZIP_TARGETS) {
  rmSync(target, { force: true });
  mkdirSync(dirname(target), { recursive: true });
}
execFileSync('python3', ['-c', `
import os,zipfile
stage=${JSON.stringify(staging)}
name=${JSON.stringify(ZIP_NAME)}
for out in [${JSON.stringify(join(ROOT, 'preview', ZIP_NAME))}, ${JSON.stringify(join(ROOT, 'content/questions', ZIP_NAME))}]:
    os.makedirs(os.path.dirname(out), exist_ok=True)
    if os.path.exists(out): os.remove(out)
    with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for root,_,fs in os.walk(stage):
            for f in sorted(fs):
                p=os.path.join(root,f)
                z.write(p, os.path.relpath(p, stage))
print('zip written')
`], { stdio: 'inherit' });

// ---- preview page ------------------------------------------------------
const template = readFileSync(join(ROOT, 'preview-src/index.template.html'), 'utf8');
const html = template
  .replaceAll('__DATA__', JSON.stringify(bank).replace(/</g, '\\u003c'))
  .replaceAll('__ZIPNAME__', ZIP_NAME)
  .replaceAll('__COUNT__', String(bank.questions.length))
  .replaceAll('__SOURCES__', String(new Set(bank.questions.flatMap((q) => q.sourceIds)).size))
  .replaceAll('__ZIPSIZE__', `${(readFileSync(join(ROOT, 'preview', ZIP_NAME)).length / 1024).toFixed(0)} KB`);
writeFileSync(join(ROOT, 'preview/index.html'), html);
rmSync(staging, { recursive: true, force: true });

console.log(`preview/index.html written (${(html.length / 1024).toFixed(0)} KB, ${bank.questions.length} questions inlined)`);
console.log(`zip: preview/${ZIP_NAME} and content/questions/${ZIP_NAME}`);
