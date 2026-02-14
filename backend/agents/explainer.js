/**
 * Explainer Agent
 * 
 * Generates a human-readable explanation for why a specific UI plan was generated
 * based on the user's intent.
 */

import { callLLM } from "../infra/llmClient.js";

const SYSTEM_PROMPT = `
You are a senior frontend architect.

Explain why this UI layout was chosen based on the user's goal.

Focus on:
- How the structure supports the intent
- UX best practices
- Component hierarchy reasoning
- Why this layout is logical and usable

Do NOT generate code.
Do NOT suggest alternatives.
Only explain the reasoning.
`;

export async function explainPlan(intent, plan) {
    if (!intent || !plan) {
        throw new Error("Explainer agent requires both intent and plan.");
    }

    const userPrompt = `
User Intent:
${intent}

UI Plan:
${JSON.stringify(plan, null, 2)}
`;

    try {
        // 🧩 Fix: Call LLM with expectJson: false because explanation is natural text
        const textResponse = await callLLM({
            systemPrompt: SYSTEM_PROMPT, // No JSON enforcement prompt needed
            userPrompt: userPrompt,
            expectJson: false
        });

        // The response is already the raw text explanation
        return textResponse || "No explanation provided.";

    } catch (error) {
        console.error("Explainer Agent failed:", error);
        return "Explanation could not be generated.";
    }
}
