# Crorepati Revision V2 — checkpoint

This is the authoritative Ubuntu/WSL working copy:

`/home/harsh/CrorePati_Revision_V2_Work`

The owner’s checkpoint folder is:

`/mnt/d/crorepati revision v2`

## Local development

```bash
npm ci
npm run dev
```

Open the Vite URL shown in the terminal. The guest flow is local-first: onboarding, subject/topic browsing, available evidence-linked practice, bookmarks, wrong-answer notebook, revision state, and profile progress are stored in IndexedDB on the device.

## Verification

```bash
npm run pipeline   # rebuilds the manifest/evidence-derived artifacts
npm run validate   # structural, evidence, catalog, PWA, and video-status checks
npm test           # deterministic pipeline artifact tests
npm run build      # app-code changes / milestones: production build and service worker
npm run test:e2e   # app-code changes / milestones: Playwright browser checks
npm run checkpoint # unique CHECKPOINT ZIP on D:, integrity checks and receipt
```

The current checkpoint has a machine-valid 26-subject manifest with 3,808 nodes and 345 topics. It contains 34 authoritative/specialist sources, **4,985 complete verified FactCards** and **5,016 unique verified bilingual practice questions**. The immutable 5,000-question recovery ZIP remains preserved; B06 added 16 narrow source-backed questions from official IMF, World Bank, NOAA and Parliament of India pages. Questions reach 24 subjects and 32 topics; S02 Current Affairs and S25 Visual GK remain empty. 1,568 broad concepts remain missing; 14,984 questions remain to reach the frozen 20,000-question requirement. Three video plans are prompt-ready and 342 evidence-blocked. See `reports/CONTENT_REPORT.json`, `reports/B06_CHECKS_5016.json`, `reports/B06_GAP_ASSESSMENT.md`, `PROJECT_STATE.json`, and `RUN_RECOVERY.json`. The next outer batch is capped at 3,000 NEW questions and saves durable progress every 250 questions.

Routine content batches use pipeline/validation/Node tests and lightweight record preservation. B06 chunk saves passed pipeline, validation and all 30 Node tests with the 5,000 baseline and prior-seal preservation. The current reviewed D: checkpoint is `D:\\crorepati revision v2\\deliverables\\Crorepati_Revision_V2_CHECKPOINT_REVIEWED_5016_V2.zip`; the earlier `FINAL_5000.zip` is never overwritten. Browser evidence remains historical unless a fresh `npm run test:e2e` result is explicitly recorded. Checkpoint archives exclude `dist/`; build when preparing a new production bundle.

## Resume

1. Read `BUILD_STATE.md`, `PROJECT_STATE.json`, `RUN_RECOVERY.json`, `reports/B06_GAP_ASSESSMENT.md`, `docs/FINAL_FROZEN_BUILD_LOCK.md`, `reports/PIPELINE_VALIDATION.md`, and `VIDEO_COVERAGE_REPORT.md`.
2. Verify the preserved baseline `D:\\crorepati revision v2\\deliverables\\Crorepati_Revision_V2_FINAL_5000.zip` and the current B06 seal `reports/B06_PUBLISHED_5015.json` before continuing. Do not rerun B05 chunks 0–19 or either existing `--start` command.
3. For future growth, select accessible authoritative evidence from remaining static gaps, then reassess dated Current Affairs, licensed visual assets and complete official PYQ paper/key pairs. Extract bounded facts once into reusable answer fields and author distinct English/Hindi question specs; never label unsupported or incomplete work verified.
4. After separate human review accepts the next source packet, run `B06_BATCH_START_INDEX=16 BATCH_MAX_NEW_QUESTIONS=3000 BATCH_PROGRESS_EVERY=250 npm run verified-batch`. It saves and validates each 250-question window, resumes from `reports/B06_PROGRESS.json` after a crash, and creates a unique timestamped checkpoint after the outer batch completes. Preserve every prior seal, ZIP, baseline and stable ID; never restart or inflate the 5,016-question count.
5. Flow submissions, paid credits and deployment remain prohibited without owner authorization.

Use Node 22.18+ (verified with 22.23.3). Browser setup requires `npx playwright install chromium` and its Linux dependencies. The current WSL session uses locally extracted libraries; see `reports/TESTING_REPORT.md` for the exact `LD_LIBRARY_PATH` and results. Desktop, phone and tablet profiles all use Chromium; they do not certify native Safari or Edge.

Existing `coverage/subjects/01.json` through `26.json` are authoritative inputs to the merger. Extend those shards while preserving IDs. `coverage/blueprint.mjs` records the minimum denominator; removing required topics/facets fails reconciliation. Changed generated files are archived by hash under `reports/history/`. `content-pipeline/evidence.mjs` imports the historical S01 modules and additive `evidence-cross-b03a.mjs`/`evidence-cross-b03b.mjs`; reviewed sources include excerpts, locators and scope notes. B03's source-review `.mjs` is the authoring input and its generated `.json` is the review artifact. Preparation has already been applied; `node scripts/content-batches.mjs --prepare a` and `--prepare b` are idempotent. Counts reflect distinct source-grounded relations, with English/Hindi treated as one question.

## Deployment

No hosting project or production credentials are present. No HTTPS deployment is claimed. The PWA shell and service-worker build are local artifacts only until an authorized hosting project is supplied.

<!-- B04-CURRENT -->
## Reusable fact-bank authoring

`content-pipeline/fact-bank.mjs` separates extraction from question generation. `production-b04.mjs` aggregates batches A/B/C and `production-b05.mjs` selects bounded B05 slices; each question chooses a reviewed answer field with exact source locator, four unambiguous bilingual options and an explanation. B05 parameter signatures are independently recomputed by the publication validator. Rewording the same fact-field pair is rejected. Historical evidence inputs and immutable pack versions are retained. Validation is not independent factual/expert certification.
