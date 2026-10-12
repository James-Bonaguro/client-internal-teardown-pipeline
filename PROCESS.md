# Teardown Process (exact)

This is the full process, start to finish. Each stage hands its output to the next. The runnable version of this exact process is `workflow/teardown-pipeline.js`.

## Stage 1: Research

Role: teardown researcher.

Input: company name, website URL, teardown type (`competitor` or `self`), any extra notes.

Job: use web search to research the business across public sources. Cover the website, lead flow and forms, offers and promotions, customer reviews (Google, Yelp, BBB, Reddit), social media presence, visible advertising, and every data-collection touchpoint you can find.

- For `competitor`: pose as a prospective customer. Document how they win business, where they create friction, and where they are vulnerable.
- For `self`: focus on what data the business collects about its own customers, where leads come from, and where tracking or attribution breaks down.

Rules: do not invent facts. Note where evidence is thin.

Output: a detailed evidence brief in markdown.

## Stage 2: Draft

Role: teardown writer.

Input: the evidence brief.

Job: write the teardown document in markdown, structured exactly like this:

1. What this is (one short paragraph).
2. How they win customers (for a self teardown: how the business currently finds and handles customers).
3. Weaknesses and gaps.
4. The single biggest opening.
5. What to do next (three concrete moves).

Output: `teardown-draft.md`.

## Stage 3: Audit (loop, up to 3 passes)

Role: teardown auditor.

Input: the draft.

Job: check for factual holes, claims not supported by evidence, missing obvious angles, confusing structure, and any mention of AI or pricing (both are forbidden).

Output: a verdict of `passed` or not, plus exact feedback on what to fix. If the draft fails and is fixable, the writer repairs it using the feedback and the draft goes through audit again. After three passes, whatever stands is what ships, and open items are flagged honestly.

## Stage 4: Owner review

Role: busy small-business owner reading cold.

Input: the draft.

Job: flag anything confusing, jargon-heavy, or hard to follow. Name the single most valuable insight.

If anything is flagged, the writer rewrites those sections in plain language a non-technical owner follows easily.

## Stage 5: Publish

Job: save the finished document as `<company-slug>-teardown.md` and hand it over with a short summary, including how many audit passes ran and the most valuable insight flagged.

## House rules (every stage, no exceptions)

- Never mention AI, language models, or automation as the method.
- Never mention pricing.
- Real, complete sentences. No fragments.
- Plain, scannable markdown. No flashy design.
- Fun, peer-to-peer tone. Never salesy.
