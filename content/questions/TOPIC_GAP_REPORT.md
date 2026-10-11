# Topic-level question counts

Generated 2026-10-11 from `GLOBAL_GAP_QUEUE.json`.

**26 subjects · 342 topics · 4,089 questions recorded across them.**

Corrections to earlier figures in this session:
- The `required: 20000` / `actual: 5016` pair is **not** per topic. It lives on one
  project-level record, `QUESTIONS-20000`. Topic records carry no `required` or `actual`
  field at all — their seven keys are `id, subjectId, topicId, missingConceptIds,
  questions, status, videoStatus`.
- `QUESTIONS-20000` carries this reason verbatim: *"Large verified corpus has not been
  researched or supplied. Continue source ingestion and review; do not inflate via
  translations or restatements."*
- Topic titles exist nowhere in this checkout, so topics are listed by `topicId` only.

| Subject | Topics | Questions recorded | Topics with none |
| --- | --- | --- | --- |
| S01 | 13 | 25 | 12 |
| S02 | 11 | 0 | 11 |
| S03 | 30 | 5 | 29 |
| S04 | 32 | 8 | 31 |
| S05 | 17 | 12 | 16 |
| S06 | 17 | 14 | 14 |
| S07 | 16 | 14 | 14 |
| S08 | 17 | 4 | 16 |
| S09 | 12 | 6 | 11 |
| S10 | 14 | 6 | 13 |
| S11 | 10 | 2 | 9 |
| S12 | 24 | 6 | 23 |
| S13 | 10 | 6 | 9 |
| S14 | 7 | 8 | 6 |
| S15 | 9 | 8 | 8 |
| S16 | 9 | 8 | 8 |
| S17 | 8 | 12 | 7 |
| S18 | 9 | 4 | 8 |
| S19 | 14 | 15 | 12 |
| S20 | 8 | 11 | 6 |
| S21 | 8 | 6 | 7 |
| S22 | 7 | 2 | 6 |
| S23 | 12 | 8 | 11 |
| S24 | 9 | 3 | 8 |
| S25 | 9 | 0 | 9 |
| S26 | 10 | 3896 | 9 |
| **All** | **342** | **4,089** | **313** |

Per topic: mean 12.0, median 0, max 3896, min 0.
313 of 342 topics have no questions recorded.

Full per-topic detail is in `TOPIC_TARGETS.json`.
