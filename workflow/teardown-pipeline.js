export const meta = {
  name: "teardown-pipeline",
  description: "Multi-agent teardown pipeline: researcher gathers evidence, writer drafts, auditor loops until clean, business-owner persona checks clarity.",
  phases: [
    { name: "research", title: "Gather evidence" },
    { name: "draft", title: "Draft teardown" },
    { name: "audit", title: "Audit and repair" },
    { name: "owner-review", title: "Owner clarity check" },
    { name: "publish", title: "Publish final doc" }
  ]
};

const inputs = args ?? {};
const target = inputs.target;
const teardownType = inputs.teardown_type || "competitor";
const context = inputs.context || "";
const briefClient = inputs.client || "";
const briefCustomer = inputs.target_customer || "";
const briefMarket = inputs.market || "";
const briefDecision = inputs.decision || "";

if (!target || typeof target !== "string" || target.trim() === "") {
  return {
    __hatchWorkflowControl: "blocked",
    result: {
      blocked_reason: "missing_target",
      message: "Launch with args like: { target: \"Business Name\", teardown_type: \"competitor\" (or \"self\"), client: \"who the report serves\", target_customer: \"...\", market: \"...\", decision: \"the decision this report should support\" }."
    }
  };
}

const BRIEF = "Shared brief. Client this report serves: " + (briefClient || "not specified") +
  ". Target customer: " + (briefCustomer || "not specified") +
  ". Market: " + (briefMarket || "not specified") +
  ". Decision this report should support: " + (briefDecision || "not specified") + ".";

const STYLE = "House rules for everything you write: never mention AI, language models, or automation as the method. Never mention our service fees or pricing. Relevant, verified, published competitor prices may be cited as evidence; never use speculative price estimates. Write in real, complete sentences, no fragments. Keep formatting plain and scannable markdown. Tone is fun and peer-to-peer, never salesy.";

const EVIDENCE = "Evidence rules: attach a source link and an observation date to every important factual claim. Separate what you observed, what you infer, and what remains unknown, and label each one. Agreement between two drafts never counts as corroboration.";

const BOUNDARY = "Research boundary: walk the public customer journey only. Understand the offer, find proof, locate the next step, inspect what the form asks for. Do NOT submit any form, book any appointment, or contact staff; those are separately approved tests. A visible contact form does not establish response speed or follow-up quality. Finding no ads does not establish that they run none. Check the review platforms relevant to this business and mark inaccessible evidence plainly.";

phase("research");
log("Researching target: " + target);
const evidence = await agent(
  "You are the teardown researcher for a small-business intelligence service. " +
  "Target business: \"" + target + "\". Teardown type: " + teardownType + ". Extra context: " + context + " " +
  BRIEF + " " +
  "Use web search to research this business across public sources: its website, lead flow and forms, offers and promotions, customer reviews (Google, Yelp, BBB, Reddit), social media presence, visible advertising, and every data-collection touchpoint you can find. " +
  (teardownType === "self"
    ? "This is a SELF teardown: focus on what data the business collects about its own customers, where leads come from, and where tracking or attribution breaks down."
    : "This is a COMPETITOR teardown: document how they win business, where they create friction, and where they are vulnerable, always in service of the shared brief above.") + " " +
  EVIDENCE + " " + BOUNDARY + " " + STYLE + " " +
  "Return a detailed evidence brief in markdown, with every important claim carrying its source link and observation date.",
  { key: "research-1", label: "Gather teardown evidence", timeoutMs: 900000 }
);

phase("draft");
log("Drafting teardown document.");
await agent(
  "You are the teardown writer. Using the evidence brief below, write the teardown document in markdown and save it as \"teardown-draft.md\" in the current working directory. " +
  "Structure it exactly: 1) What this is (one short paragraph), 2) How they win customers" +
  (teardownType === "self" ? " (for a self teardown: how the business currently finds and handles customers)" : "") +
  ", 3) Weaknesses and gaps, 4) The single biggest opening, 5) What to do next (three concrete moves), 6) Evidence appendix: every important claim with its source link and observation date, each labeled observed, inferred, or unknown. " +
  "Recommendations must fit what the brief's client can actually deliver. " +
  STYLE + " Return the word done and nothing else.\n\nShared brief: " + BRIEF + "\n\nEvidence brief:\n" + evidence,
  { key: "draft-1", label: "Draft teardown document", timeoutMs: 600000 }
);

phase("audit");
const auditSchema = {
  type: "object",
  required: ["passed", "retryable", "feedback"],
  properties: {
    passed: { type: "boolean" },
    retryable: { type: "boolean" },
    feedback: { type: "string" },
    blockers: { type: "string" }
  }
};
let attempt = 0;
let auditPassed = false;
let auditFeedback = "";
while (attempt < 3 && !auditPassed) {
  attempt += 1;
  log("Audit pass " + attempt + " of 3.");
  const audit = await agent(
    "You are the teardown auditor. Read \"teardown-draft.md\" in the working directory. Check: every important claim has a source link and observation date; inferred and unknown items are labeled as such; no claim rests on draft agreement as corroboration; recommendations follow from the evidence and fit what the brief's client can actually deliver; confusing structure; any mention of AI or of our service fees (both forbidden; verified published competitor prices are allowed). " +
    "Return JSON with: passed (boolean), retryable (boolean, false only if the draft is unfixable), feedback (string describing exactly what to fix), blockers (string, anything unfixable).",
    { key: "audit-" + attempt, label: "Audit teardown draft", schema: auditSchema, timeoutMs: 300000 }
  );
  auditPassed = audit.passed;
  auditFeedback = audit.feedback;
  if (!auditPassed && audit.retryable && attempt < 3) {
    log("Repairing draft after audit feedback.");
    await agent(
      "You are the teardown writer. The auditor rejected \"teardown-draft.md\". Fix every item in this feedback and rewrite the file: " + auditFeedback + " " + STYLE + " Return the word done and nothing else.",
      { key: "repair-" + attempt, label: "Repair teardown draft", timeoutMs: 600000 }
    );
  }
  if (!auditPassed && !audit.retryable) {
    log("Auditor flagged unfixable blockers; stopping repair loop.");
    break;
  }
}

phase("owner-review");
log("Running business-owner clarity check.");
const ownerSchema = {
  type: "object",
  required: ["clear", "confusing_parts", "most_valuable"],
  properties: {
    clear: { type: "boolean" },
    confusing_parts: { type: "string" },
    most_valuable: { type: "string" }
  }
};
const owner = await agent(
  "You are a busy small-business owner reading \"teardown-draft.md\" cold. This is a CLARITY check only: does the report explain the opening and make the next move obvious? Flag anything confusing, jargon-heavy, or hard to follow. " +
  "This does not establish whether a real owner would find the advice useful; that gets tested with a real owner later. " +
  "Return JSON with: clear (boolean), confusing_parts (string), most_valuable (string describing the single most valuable insight).",
  { key: "owner-review-1", label: "Business-owner clarity check", schema: ownerSchema, timeoutMs: 300000 }
);
if (!owner.clear) {
  log("Clarifying flagged sections.");
  await agent(
    "You are the teardown writer. A business owner found these parts of \"teardown-draft.md\" confusing: " + owner.confusing_parts +
    " Rewrite those sections in plain language a non-technical owner follows easily. " + STYLE + " Return the word done and nothing else.",
    { key: "owner-fix-1", label: "Clarify confusing sections", timeoutMs: 600000 }
  );
}

phase("publish");
const slug = target.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "teardown";
const finalPath = "workspace/your_files/teardowns/" + slug + "-teardown.md";
log("Publishing final document.");
const published = await agent(
  "Copy the finished \"teardown-draft.md\" from the working directory to \"" + finalPath + "\", creating folders as needed. Return the exact final path and nothing else.",
  { key: "publish-1", label: "Save final teardown", timeoutMs: 120000 }
);

return "Teardown of " + target + " is complete.\n\nSaved to: " + published +
  "\n\nThe pipeline ran evidence research, a draft, " + attempt + " audit pass(es)" +
  (auditPassed ? " (passed)" : " (finished with open items)") +
  ", and a business-owner clarity check. Most valuable insight flagged: " + owner.most_valuable;