# Teardown Process (exact)

This is the full process, start to finish. Two independent teardowns are produced (mine and GPT's), then merged into one best-of-both document. The runnable versions are `workflow/teardown-pipeline.js` (stages 1-3 and 6-7) and `workflow/teardown-merge.js` (stages 4-5, plus its own audit and owner check).

## The shared brief (required before anything starts)

Both researchers work from the same brief, defined in the target JSON:

- **client**: who the report serves.
- **competitor**: the business being torn down.
- **target_customer**: who the client serves.
- **market**: the geographic and category market.
- **decision**: the decision this report should help make.

"The single biggest opening" means something different depending on who benefits, so the brief comes first and recommendations must fit what the client can actually deliver.

## Stage 1: Research

Role: teardown researcher.

Input: company name, website URL, teardown type (`competitor` or `self`), the shared brief, any extra notes.

Job: walk the public customer journey. Understand the offer, find proof, locate the next step, inspect what the form asks for. Cover the website, lead flow and forms, offers and promotions, customer reviews (Google, Yelp, BBB, Reddit), social media presence, visible advertising, and every data-collection touchpoint you can find.

- For `competitor`: document how they win business, where they create friction, and where they are vulnerable, always in service of the shared brief.
- For `self`: focus on what data the business collects about its own customers, where leads come from, and where tracking or attribution breaks down.

Research boundary: do NOT submit any form, book any appointment, or contact staff. Those are separately approved tests. A visible contact form does not establish response speed or follow-up quality. Finding no ads does not establish that they run none. Check the review platforms relevant to this business and mark inaccessible evidence plainly.

Evidence rules: attach a source link and an observation date to every important factual claim. Separate what you observed, what you infer, and what remains unknown, and label each one. Do not invent facts.

Output: a detailed evidence brief in markdown, with every important claim carrying its source link and observation date.

## Stage 2: Draft

Role: teardown writer.

Input: the evidence brief and the shared brief.

Job: write the teardown document in markdown, structured exactly like this:

1. What this is (one short paragraph).
2. How they win customers (for a self teardown: how the business currently finds and handles customers).
3. Weaknesses and gaps.
4. The single biggest opening.
5. What to do next (three concrete moves).
6. Evidence appendix: every important claim with its source link and observation date, each labeled observed, inferred, or unknown.

Recommendations must fit what the brief's client can actually deliver.

Output: `teardown-draft.md`.

## Stage 3: Audit (loop, up to 3 passes)

Role: teardown auditor.

Input: the draft.

Job: check that every important claim has a source link and observation date, that inferred and unknown items are labeled as such, that no claim rests on draft agreement as corroboration, that recommendations follow from the evidence and fit what the client can deliver, and that the structure is clear. Flag any mention of AI or of our service fees (both forbidden; verified published competitor prices are allowed).

Output: a verdict of `passed` or not, plus exact feedback on what to fix. If the draft fails and is fixable, the writer repairs it using the feedback and the draft goes through audit again. After three passes, whatever stands is what ships, and open items are flagged honestly. Corrections are required before release.

## Stage 4: Independent second teardown (GPT)

GPT runs its own independent teardown of the same company, from the same shared brief and the same evidence rules. The two versions must not see each other until the merge. Save both original drafts; they are kept alongside the merged report.

## Stage 5: Merge (best of both, selective)

Role: teardown editor.

Input: both finished teardowns and the shared brief.

Job: produce ONE combined teardown. Follow this rubric exactly:

1. Keep the claim with the stronger evidence, never the longer or more polished version.
2. Remove duplicates so each insight appears once.
3. Build one coherent argument, not a grab bag of every interesting idea.
4. Where conflicting evidence cannot be resolved, say so plainly and preserve the uncertainty.
5. Every recommendation must fit what the brief's client can actually deliver.
6. Agreement between the two versions never counts as corroboration.

Then the merged document goes through one audit pass (same auditor rules as stage 3). If it fails and is fixable, the editor repairs it once. Corrections are required before release.

Output: `teardown-merged.md`.

## Stage 6: Owner review (clarity check only)

Role: busy small-business owner reading cold.

Input: the merged document.

Job: check whether the report explains the opening and makes the next move obvious. Flag anything confusing, jargon-heavy, or hard to follow.

This does not establish whether a real owner would find the advice useful. The first pilot goes to a real owner with two questions: "What did this help you decide?" and "What would you do next?"

If anything is flagged, the editor rewrites those sections in plain language a non-technical owner follows easily.

## Stage 7: Publish

Job: save the finished document as `<company-slug>-teardown-combined.md` and hand it over with a short summary, including how many audit passes ran and the most valuable insight flagged. Keep the saved originals: both independent drafts and the merged report.

## House rules (every stage, no exceptions)

- Never mention AI, language models, or automation as the method.
- Never mention our service fees or pricing. Relevant, verified, published competitor prices may be cited as evidence; never use speculative price estimates.
- Real, complete sentences. No fragments.
- Plain, scannable markdown. No flashy design.
- Fun, peer-to-peer tone. Never salesy. Accuracy and usefulness lead.
