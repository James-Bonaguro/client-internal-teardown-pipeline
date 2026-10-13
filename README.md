# Teardown Pipeline

The end-to-end process for running a competitor teardown or a self teardown on any business. Two independent teardowns (mine and GPT's) get merged into one best-of-both document.

## How to run a new teardown

1. Copy `targets/_template.json` to `targets/<company-name>.json`.
2. Fill in the company's website URL **and the shared brief**: who the report serves (client), the target customer, the market, and the decision the report should support. The URL alone is not enough; both researchers need the same brief.
3. Tell Bill Jones: "run the teardown on <company name>." The pipeline reads the target file and does the rest.
4. In parallel, have GPT run its own independent teardown of the same company from the same brief and evidence rules (no peeking at mine).
5. Hand both finished documents to Bill Jones: "combine these." The merge keeps the best of both under an explicit rubric, audits the result, and runs the owner clarity check.
6. Collect the finished combined document. Both original drafts are saved alongside it in `samples/`.

That is the whole manual process. Everything else lives in `PROCESS.md`, `workflow/teardown-pipeline.js`, and `workflow/teardown-merge.js`.

## What the pipeline does

1. **Shared brief.** Client, target customer, market, and the decision the report should support. Written once, used by every researcher.
2. **Research.** A researcher walks the public customer journey: the offer, the proof, the next step, the form fields. Public steps only; no form submissions or staff contact without separate approval.
3. **Draft.** A writer turns the evidence into a structured teardown with an evidence appendix. Every important claim carries a source link and an observation date, labeled observed, inferred, or unknown.
4. **Audit.** An auditor checks sources, labels, and whether the recommendations follow from the evidence and fit the client. Up to three repair passes. Corrections required before release.
5. **Second teardown (GPT).** An independent teardown of the same company from the same brief, done separately so the versions don't influence each other.
6. **Merge.** An editor combines both under a strict rubric: strongest evidence wins (not the longest version), duplicates removed, one coherent argument, unresolved conflicts stated plainly. One audit pass on the merged result.
7. **Owner review.** A business-owner persona reads it cold as a clarity check only. The first pilot goes to a real owner afterward.
8. **Publish.** The finished combined document is saved and handed over, with both originals kept.

Two flavors: `competitor` (tear down a rival to find openings) and `self` (tear down your own company to find where tracking and attribution break).

## House rules (baked into every stage)

- Never mention AI, language models, or automation as the method.
- Never mention our service fees or pricing. Verified published competitor prices may be cited as evidence; no speculative estimates.
- Every important claim needs a source link and an observation date. Observed, inferred, and unknown are labeled. Agreement between drafts is never corroboration.
- Real, complete sentences. No fragments.
- Plain, scannable formatting. No flashy design.
- Fun, peer-to-peer tone. Never salesy. Accuracy and usefulness lead.

## Layout

- `targets/` — one JSON file per teardown: the URL plus the shared brief.
- `PROCESS.md` — the exact stage-by-stage process.
- `workflow/teardown-pipeline.js` — the runnable version of research through publish.
- `workflow/teardown-merge.js` — the runnable version of the merge (takes both teardowns, outputs the combined doc).
- `samples/` — finished teardowns. `vitou-financial-services-teardown.md` is the reference example of what a finished document looks like.
