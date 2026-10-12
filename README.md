# Teardown Pipeline

The end-to-end process for running a competitor teardown or a self teardown on any business. Two independent teardowns (mine and GPT's) get merged into one best-of-both document.

## How to run a new teardown

1. Copy `targets/_template.json` to `targets/<company-name>.json`.
2. Fill in the company's website URL (that is the only required field).
3. Tell Bill Jones: "run the teardown on <company name>." The pipeline reads the target file and does the rest.
4. In parallel, have GPT run its own independent teardown of the same company (same five-section structure, no peeking at mine).
5. Hand both finished documents to Bill Jones: "combine these." The merge keeps the best of both, audits the result, and runs the owner clarity check.
6. Collect the finished combined document. It lands alongside the sample in `samples/`.

That is the whole manual process. Everything else lives in `PROCESS.md`, `workflow/teardown-pipeline.js`, and `workflow/teardown-merge.js`.

## What the pipeline does

1. **Research.** A researcher poses as a prospective customer and gathers public evidence: the website, lead flow, offers, reviews (Google, Yelp, BBB, Reddit), social presence, visible ads, and every data-collection touchpoint.
2. **Draft.** A writer turns the evidence into a structured teardown document.
3. **Audit.** An auditor picks the draft apart for holes, overclaims, and confusion. The draft goes back for fixes, up to three passes, until it is clean.
4. **Second teardown (GPT).** An independent teardown of the same company, done separately so the two versions don't influence each other.
5. **Merge.** An editor combines both into one best-of-both document, keeping the strongest insights and best-supported claims, then audits the merged result once.
6. **Owner review.** A business-owner persona reads it cold and flags anything confusing. Confusing sections get rewritten in plain language.
7. **Publish.** The finished combined document is saved and handed over.

Two flavors: `competitor` (tear down a rival to find openings) and `self` (tear down your own company to find where tracking and attribution break).

## House rules (baked into every stage)

- Never mention AI, language models, or automation as the method.
- Never mention pricing.
- Real, complete sentences. No fragments.
- Plain, scannable formatting. No flashy design.
- Fun, peer-to-peer tone. Never salesy.

## Layout

- `targets/` — one JSON file per teardown. The URL is the only required input.
- `PROCESS.md` — the exact stage-by-stage process.
- `workflow/teardown-pipeline.js` — the runnable version of stages 1-3 and 6-7 (research through publish).
- `workflow/teardown-merge.js` — the runnable version of the merge (takes both teardowns, outputs the combined doc).
- `samples/` — finished teardowns. `vitou-financial-services-teardown.md` is the reference example of what a finished document looks like.
