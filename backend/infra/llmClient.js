/**
 * LLM Client (Provider Layer)
 * 
 * Abstraction for calling the local LLM (Mistral via Ollama).
 * Ensures clean separation between AI provider and application logic.
 */

// Deployment Config
const LLM_API_URL = process.env.LLM_API_URL || "http://localhost:11434/api/generate";
const LLM_API_KEY = process.env.LLM_API_KEY || ""; // Only if using hosted (e.g. OpenAI/Groq)
const LLM_MODEL = process.env.LLM_MODEL || "mistral";

export async function callLLM({ systemPrompt, userPrompt, expectJson = true }) {
    try {
        const headers = { "Content-Type": "application/json" };
        if (LLM_API_KEY) {
            headers["Authorization"] = `Bearer ${LLM_API_KEY}`;
        }

        const res = await fetch(LLM_API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                model: LLM_MODEL,
                prompt: `${systemPrompt}\n\nUser Request:\n${userPrompt}`,
                stream: false,
                options: {
                    temperature: 0, // Determinism: 0 temp
                    num_ctx: 4096   // Context window size
                }
            })
        });

        if (!res.ok) {
            throw new Error(`LLM API Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // Safety check if response is missing
        if (!data || !data.response) {
            throw new Error("No response received from LLM");
        }

        // 🧩 Fix: Support non-JSON responses for Explainer
        if (!expectJson) {
            return data.response.trim();
        }

        return extractJSON(data.response);

    } catch (error) {
        console.error("LLM Call Failed:", error);
        throw error;
    }
}

// Ensures we ONLY accept JSON from model and handle basic markdown fencing
function extractJSON(text) {
    // Find the first '{'
    const start = text.indexOf("{");
    // Find the last '}'
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
        throw new Error("LLM output was not valid JSON: " + text.slice(0, 100) + "...");
    }

    // Extract the JSON substring
    const jsonStr = text.slice(start, end + 1);

    // Attempt to parse to verify validity before returning string (optional strictness)
    try {
        JSON.parse(jsonStr);
        return jsonStr; // Return the string so the caller can parse it
    } catch (e) {
        throw new Error("Extracted text was not valid JSON: " + e.message);
    }
}
