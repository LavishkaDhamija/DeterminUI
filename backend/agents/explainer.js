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

    // We reuse the callLLM client which expects JSON back usually, 
    // BUT for explanation we might want text. 
    // However, our current llmClient.js implementation is STRICT about JSON.
    // So we must ask the LLM to return JSON with an "explanation" field.

    // To fit the existing infrastructure without rewriting llmClient:
    const jsonEnforcedPrompt = SYSTEM_PROMPT + `
    
    Format your response as valid JSON:
    {
      "explanation": "Your detailed explanation here..."
    }
    `;

    try {
        const response = await callLLM({
            systemPrompt: jsonEnforcedPrompt,
            userPrompt: userPrompt
        });

        const parsed = JSON.parse(response);
        return parsed.explanation || "No explanation provided.";
    } catch (error) {
        console.error("Explainer Agent failed:", error);
        return "Explanation could not be generated.";
    }
}
