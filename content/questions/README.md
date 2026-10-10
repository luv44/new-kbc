# Draft question bank — 138 unique, meta-word-free questions

`node scripts/question-lint.mjs` scans every question in `parts/` and fails on any repeat or any
meta-language word. `--write` regenerates `DRAFT_UNIQUE_QUESTIONS.json` and `.md` from the parts.

## What is enforced on every question

| Rule | Check | Last run |
| --- | --- | --- |
| No question repeats | exact stem, SHA-256 fingerprint, same-answer rewording (≥50% word overlap), near-identical wording (≥80%) | 0 hits / 138 questions |
| No curriculum meta-language | banned word list in both English and Hindi, applied to stem, all 4 options, explanation and cue | 0 hits |
| Options usable | exactly 4, both languages present, no two options equal after normalisation | 0 hits |
| Record complete | `correctIndex` 0–3, explanation in both languages, at least one `sourceId` | 0 hits |

Banned: `syllabus`, `assessing`/`assessment`, `curriculum`, `learning outcome/objective`,
`question paper`, `exam pattern`, `multiple choice`/`MCQ`, `quiz`, `test yourself`, `chapter`,
`unit-wise`/`topic-wise`, `learning module`, `this question`, `negative marking`, and the Hindi
equivalents `पाठ्यक्रम`, `मूल्यांकन`, `अध्याय`, `प्रश्न पत्र`, `परीक्षा पैटर्न`, `प्रश्नोत्तरी`, `यूनिट`.

`module` is deliberately **not** banned bare, because "Command Module" and "lunar module" are NASA
proper names; the curriculum senses are caught through `learning module` / `module-wise`.

## Lifecycle — read before publishing

Every record is `DRAFT_PENDING_REVIEW`. `src/domain.ts eligible()` only accepts `VERIFIED`, so none
of these reach practice until a human reviewer accepts them.

They are authored against the 34 sources registered in `SOURCE_REGISTRY.json`, but the reviewed
excerpts in `content-pipeline/source-cache/` are **not present in this checkout**, so no FactCard
link, evidence locator or factual certification is claimed. `subjectId`, `chapterId`, `topicId` and
`conceptIds` are empty because `coverage/subjects/*.json` is also absent here; fill them from the
manifest before the merger runs.

Nothing here is added to the 5,016 verified count and no prior seal is touched.
