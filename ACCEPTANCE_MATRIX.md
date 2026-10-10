# Acceptance matrix — current checkpoint

| Gate | Status | Evidence |
| --- | --- | --- |
| G1 production web project runs | PASS at last app milestone | S01-B02 build generated `dist/` plus `sw.js`; B04 source/public content has fast validation, not a fresh production build. |
| G2 guest core flow | PASS local Chromium at S01-B02 | Historical onboarding, navigation and evidence review on desktop/phone/tablet; `reports/TESTING_REPORT.md`. |
| G4 exactly 26 subjects | PASS | `reports/PIPELINE_VALIDATION.json`. |
| G5–G8 structural coverage | PASS machine validation; expert depth audit open | `content-pipeline/MANIFEST_VALIDATION.md`, `MASTER_QUESTION_COVERAGE_MANIFEST.json`. |
| G9 source/FactCard engine | PASS for current evidence set | `content-pipeline/FACTCARDS.json`, `npm run validate`. |
| G10 PYQ provenance | BLOCKED | `content-pipeline/PYQ_REGISTRY.json` reports `actualPYQs: 0`. |
| G11 Current Affairs freshness | BLOCKED | `content-pipeline/CURRENT_AFFAIRS_EVENTS.json` has no published events. |
| G12 validation/dedupe | PASS for current 207-question set | `content-pipeline/DEDUPE_REPORT.json`, 30 passing Node tests; all 105 prior records retained; reusable answer-field/source links, bilingual options and distinct relations checked. |
| G13 20,000 questions | BLOCKED | 207 verified questions; gap 19,793; 24 subjects/28 topics have questions. |
| G15–G18 video planning/queue | PARTIAL | 3 prompt-ready, 342 evidence-blocked; 0 Flow jobs submitted. |
| G19–G21 approved video coverage | BLOCKED | 0 approved videos and 0 MP4 bytes. |
| G22 revision/notebook/bookmarks/search/mocks | PASS tested local subset | Revision/scoring unit tests; notebook/bookmarks/history persistence, bilingual search, mocks and challenge lifelines browser-tested. Full timed/backup interaction coverage open. |
| G23 offline question packs | PASS integrity for current packs; browser evidence at S01-B02 | B04 JSON/gzip/catalog hashes validated. Historical selective download, tamper rejection and offline reload on three viewports covered the 25-question S01 pack. |
| G24 selective offline video | UNVERIFIED | No approved media exists; playback, caption caching and quota/range behavior need real media tests. |
| G25–G26 responsive/PWA | PASS tested local subset | Three Chromium viewports, screenshot/overflow checks, manifest assets and service-worker offline shell. Other engines and physical installation remain open. |
| G28 production HTTPS | BLOCKED | No authorized hosting project. |

`FINAL_ELIGIBLE=false` remains intentional.
