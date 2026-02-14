import { SYSTEM_PROMPT } from "./plannerPrompt.js";
import { callLLM } from "../infra/llmClient.js";
import { validatePlan } from "./validator.js";

export async function createPlan(intent) {
    const raw = await callLLM({
        systemPrompt: SYSTEM_PROMPT,
        userPrompt: intent
    });

    let plan;

    try {
        plan = JSON.parse(raw);
    } catch (err) {
        throw new Error("Planner returned invalid JSON: " + err.message);
    }

    // 🔒 Enforce determinism
    validatePlan(plan);

    return plan;
}
