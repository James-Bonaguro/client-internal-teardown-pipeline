export const meta = {
  name: "teardown-merge",
  description: "Merge two independent teardowns (mine and GPT's) into one best-of-both document, then audit and owner-review it.",
  phases: [
    { name: "merge", title: "Merge best of both" },
    { name: "audit", title: "Audit merged doc" },
    { name: "owner-review", title: "Owner clarity check" },
    { name: "publish", title: "Publish final doc" }
  ]
};

const inputs = args ?? {};
const target = inputs.target;
const mine = inputs.mine;
const gpt = inputs.gpt;

if (!target || typeof target !== "string" || target.trim() === "" || !mine || !gpt) {
  return {
    __hatchWorkflowControl: "blocked",
    result: {
      blocked_reason: "missing_inputs",
      message: "Launch with args { target: \"Business Name\", mine: \"markdown text of my teardown\", gpt: \"markdown text of GPT's teardown\" }."
    }
  };
}

const STYLE = "House rules for everything you write: never mention AI, language models, or automation as the method. Never mention pricing. Write in real, complete sentences, no fragments. Keep formatting plain and scannable markdown. Tone is fun and peer-to-peer, never salesy.";

phase("merge");
log("Merging the two teardowns for: " + target);
await agent(
  "You are the teardown editor. Below are two independent teardowns of the same business, \"" + target + "\". " +
  "Version A is the first teardown. Version B is the second teardown. Produce ONE combined teardown that keeps the best of both: the strongest insights, the most specific evidence, the clearest explanations. " +
  "Where the versions conflict, keep the better-supported claim and note the disagreement in one sentence. Where one version has material the other lacks, fold it in. Do not invent new facts. " +
  "Structure it exactly: 1) What this is (one short paragraph), 2) How they win customers, 3) Weaknesses and gaps, 4) The single biggest opening, 5) What to do next (three concrete moves). " +
  STYLE + " Save the result as \"teardown-merged.md\" in the working directory. Return the word done and nothing else.\n\n--- VERSION A ---\n" + mine + "\n\n--- VERSION B ---\n" + gpt,
  { key: "merge-1", label: "Merge both teardowns", timeoutMs: 600000 }
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
log("Auditing merged teardown.");
const audit = await agent(
  "You are the teardown auditor. Read \"teardown-merged.md\" in the working directory. Check for: factual holes, claims not supported by either source version, missing obvious angles, confusing structure, any mention of AI or pricing (both are forbidden). " +
  "Return JSON with: passed (boolean), retryable (boolean, false only if the draft is unfixable), feedback (string describing exactly what to fix), blockers (string, anything unfixable).",
  { key: "audit-1", label: "Audit merged teardown", schema: auditSchema, timeoutMs: 300000 }
);
if (!audit.passed && audit.retryable) {
  log("Repairing merged teardown after audit feedback.");
  await agent(
    "You are the teardown editor. The auditor rejected \"teardown-merged.md\". Fix every item in this feedback and rewrite the file: " + audit.feedback + " " + STYLE + " Return the word done and nothing else.",
    { key: "repair-1", label: "Repair merged teardown", timeoutMs: 600000 }
  );
}
if (!audit.passed && !audit.retryable) {
  log("Auditor flagged unfixable blockers; shipping merged doc with open items noted.");
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
  "You are a busy small-business owner reading \"teardown-merged.md\" cold. Flag anything confusing, jargon-heavy, or hard to follow. " +
  "Return JSON with: clear (boolean), confusing_parts (string), most_valuable (string describing the single most valuable insight).",
  { key: "owner-review-1", label: "Business-owner clarity check", schema: ownerSchema, timeoutMs: 300000 }
);
if (!owner.clear) {
  log("Clarifying flagged sections.");
  await agent(
    "You are the teardown editor. A business owner found these parts of \"teardown-merged.md\" confusing: " + owner.confusing_parts +
    " Rewrite those sections in plain language a non-technical owner follows easily. " + STYLE + " Return the word done and nothing else.",
    { key: "owner-fix-1", label: "Clarify confusing sections", timeoutMs: 600000 }
  );
}

phase("publish");
const slug = target.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "teardown";
const finalPath = "workspace/your_files/teardowns/" + slug + "-teardown-combined.md";
log("Publishing final combined document.");
const published = await agent(
  "Copy the finished \"teardown-merged.md\" from the working directory to \"" + finalPath + "\", creating folders as needed. Return the exact final path and nothing else.",
  { key: "publish-1", label: "Save final combined teardown", timeoutMs: 120000 }
);

return "Combined teardown of " + target + " is complete.\n\nSaved to: " + published +
  "\n\nThe merge took the best of both independent teardowns, ran one audit pass" +
  (audit.passed ? " (passed)" : " (finished with open items)") +
  ", and a business-owner clarity check. Most valuable insight flagged: " + owner.most_valuable;