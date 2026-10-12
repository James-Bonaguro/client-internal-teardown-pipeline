# Teardown Pipeline

The end-to-end process for running a competitor teardown or a self teardown on any business. One input in, one finished document out.

## How to run a new teardown

1. Copy `targets/_template.json` to `targets/<company-name>.json`.
2. Fill in the company's website URL (that is the only required field).
3. Tell Bill Jones: "run the teardown on <company name>." The pipeline reads the target file and does the rest.
4. Collect the finished document. It lands alongside the sample in `samples/`.

That is the whole manual process. Everything else lives in `PROCESS.md` and `workflow/teardown-pipeline.js`.

## What the pipeline does

1. **Research.** A researcher poses as a prospective customer and gathers public evidence: the website, lead flow, offers, reviews (Google, Yelp, BBB, Reddit), social presence, visible ads, and every data-collection touchpoint.
2. **Draft.** A writer turns the evidence into a structured teardown document.
3. **Audit.** An auditor picks the draft apart for holes, overclaims, and confusion. The draft goes back for fixes, up to three passes, until it is clean.
4. **Owner review.** A business-owner persona reads it cold and flags anything confusing. Confusing sections get rewritten in plain language.
5. **Publish.** The finished document is saved and handed over.

Two flavors: `competitor` (tear down a rival to find openings) and `self` (tear down your own company to find where tracking and attribution break).

## House rules (baked into every stage)

- Never mention AI, language models, or automation as the method.
- Never mention pricing.
- Real, complete sentences. No fragments.
- Plain, scannable formatting. No flashy design.
- Fun, peer-to-peer tone. Never salesy.

## Layout

- `targets/` — one JSON file per teardown. The URL is the only required input.
- `PROCESS.md` — the exact stage-by-stage process with the prompts used at each step.
- `workflow/teardown-pipeline.js` — the runnable version of this process (the agent pipeline).
- `samples/` — finished teardowns. `vitou-financial-services-teardown.md` is the reference example of what a finished document looks like.
