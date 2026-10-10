# Crorepati Revision V2 — build state

- PHASE: A — application and pipeline implementation
- ACTIVE_PASS: reusable source-first B04A/B04B/B04C plus B05M-0001–4793 and B06E-0001–0016 validated and saved; 4,911 NEW original bilingual questions
- AUTHORITATIVE: `/home/harsh/CrorePati_Revision_V2_Work`
- D_CHECKPOINT: `/mnt/d/crorepati revision v2` (owner's explicit folder override)
- SPECIFICATION: `docs/FINAL_FROZEN_BUILD_LOCK.md`, exact copy of supplied 2,963-line file
- SUBJECTS_STRUCTURALLY_REPRESENTED: 26/26
- CHAPTERS: 82
- TOPICS_TOTAL: 345
- MANIFEST_VALID: true (3,808 nodes; 1,606 subtopics; 1,749 concepts; prior identities retained)
- EXPERT_DEPTH_AUDIT_COMPLETE: false
- SOURCES: 34 authoritative/specialist caches (29 retained; 3 NIST SI sources added for B05; 5 IMF/World Bank/NOAA/Parliament sources added for B06)
- FACTCARDS: 4,985 (4,880 new reusable extractions, including 4,793 B05 parametric and 16 B06 evidence-first facts); concepts with evidence 181/1749; 1,568 original broad concepts MISSING
- VERIFIED_QUESTIONS: 5,016; OLD 105 → NEW TOTAL 5,016; 4,911 NEW (24 + 34 + 44 + 4,793 + 16); prior 5,000 records hash-identical
- SUBJECT_BREADTH: 24/26 with questions (12 previously empty subjects populated); 32/345 topics with questions
- EMPTY_SUBJECTS: S02 Current Affairs; S25 Visual / Identification GK
- S01_BATCH: 25 supported atoms/questions under India basics; four broad requirement nodes MISSING; topic video BLOCKED
- QUESTION_GAP: 14,984 to 20,000; 313 topics have no questions
- BLOCKED_TOPICS: full names/IDs and missing requirements in `reports/B04_BLOCKED_TOPICS.json`, `GLOBAL_GAP_QUEUE.json`, and `reports/B06_GAP_ASSESSMENT.md`; B06 populated IMF/World Bank, Ocean exploration, Constitution and Parliament topics narrowly, while broad gaps and blocked videos remain
- VIDEO_PLANS_READY: 3 (47 prepared scene prompts); 342 topic plans evidence-blocked
- FLOW_JOBS_SUBMITTED: 0; paid credits incurred: 0
- VIDEOS_GENERATED: 0
- VIDEOS_APPROVED: 0
- TESTS: B05 baseline and B06 chunk 15 pipeline/validation/unit checks PASS; 30 Node tests PASS; B04/B05/B06 baselines and prior saves preservation PASS; SINGH accepted the HOV packet; `reports/B06_CHECKS_5016.json`
- LAST_FULL_BUILD_BROWSER: historical S01-B02, 57-question corpus; service worker ad0d592b1e80; s01-b02-final-20261003: 31 passed, 2 skipped, 0 failed
- BROWSER_COVERAGE: Chromium desktop/phone/tablet at that historical milestone; native Safari/WebKit, Edge, Firefox and physical-device installation unverified
- PWA: historical shell/offline behavior verified at S01-B02; current public JSON/gzip packs validated. Local dist/ is older and excluded from checkpoints.
- EVIDENCE: B04 reports, all B05 checks/seals through 5,000, `reports/B06_BASELINE_5000.json`, `reports/B06_CHECKS_5015.json`, `reports/B06_CHECKS_5016.json`, `reports/B06_PUBLISHED_5013.json`, `reports/B06_PUBLISHED_5015.json`, `reports/B06_PUBLISHED_5016.json`, `reports/B06_PROGRESS.json`, `reports/B06_GAP_ASSESSMENT.md`, `reports/20K_BLOCKER_REPORT.md`, `reports/INDEPENDENT_REVIEW_BLOCKER.md`, `reports/PROGRESS_20000.md`, `reports/PIPELINE_VALIDATION.json`, `reports/TESTING_REPORT.md`, `PROJECT_STATE.json`, and `RUN_RECOVERY.json`; prior reports retained
- DEPLOYMENT: not deployed; no authorized hosting project supplied
- BLOCKERS: dated/fresh Current Affairs; usable visual-identification assets; 1,568 broad evidence gaps/expert audit; 14,984-question minimum gap; actual PYQs; approved videos; authorized HTTPS hosting
- B07_CONTENT: 3,000 NEW source-backed candidate questions and 3,000 staged FactCards saved in three 1,000-question chunks under `content-pipeline/pending-review/B07/`. All are `PENDING_REVIEW`; new verified count is 0. Total written is 8,016 = 5,016 verified + 3,000 pending. Narrow NIST terminology/abbreviation relations only; no human reviewer metadata and no broad coverage completion are claimed.
- NEXT_ACTION: Review `content-pipeline/pending-review/B07/REVIEW_PACKET.md`, including source context, answers, distractors, Hindi language and semantic novelty. Do not run verified publication on pending B07 input. The 20K verified shortfall remains 14,984. Preserve all ZIPs; do not rerun B05 chunks 0–19 or either --start command.
- BATCH_WORKFLOW: The latest user instruction for B07 is 1,000-question durable content saves within a maximum 3,000-question batch. `reports/B07_PROGRESS.json` stores each immutable chunk hash and separate verified/pending counts. `scripts/b07-content.mjs` reuses the cached NIST export and saves only pending content; no runner infrastructure was rewritten. The existing accepted-only B06 pipeline remains isolated from unreviewed B07 records.
- FULL_QA_WORKFLOW: full builds/browser QA for app-code changes or justified milestones; fast content checks for each substantial batch. Avoid whole-tree snapshots and repeated unchanged-source research.
- CHECKPOINT: `npm run checkpoint` creates a unique D_CHECKPOINT/deliverables ZIP, verifies CRC/every entry hash, and writes receipts beside it and in reports/; current reviewed checkpoint is `D:\\crorepati revision v2\\deliverables\\Crorepati_Revision_V2_CHECKPOINT_REVIEWED_5016_V2.zip`; retain the 5,000 baseline ZIP and earlier archives
- FINAL_ELIGIBLE: false

Read current state and relevant source/gap reports before resuming. Existing source caches were indexed once in `content-pipeline/CACHED_FACT_INVENTORY.json`; this covers accepted excerpts, not every full-source claim. `content-pipeline/fact-bank.mjs` compiles reusable answer fields while preserving historical evidence rows. The compiler rejects repeated tested relations, unreviewed facts, absent fields, colliding bilingual options and unresolved new similarity candidates. These gates do not replace manual source comparison or expert review. `PROJECT_STATE.json` and `RUN_RECOVERY.json` record the exact saved count and next safe action.

Historical S01 and B03 baselines remain immutable. `reports/B04_BASELINE.json` protects all 105 earlier records, 18 sources and 3,734 identities; `reports/B04_PUBLISHED_207.json` protects the B04 publication; `reports/B05_BASELINE_207.json` protects the B05 starting publication; and `reports/B05_PROGRESS.json` retains every saved B05 seal through `reports/B05_PUBLISHED_5000.json`; `reports/B06_PROGRESS.json` retains the B06 publication. Changed generated/documentation bytes are kept in `reports/history/`. The D: project copy and prior archives are retained. Frozen lock SHA-256: `47bdf3f54a3189a6477010b2798d5a56a1dbd257ca20da39d9bb6eeaef2c3083`.
