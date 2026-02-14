/**
 * UI Service - API Layer
 * 
 * Connects the React Frontend to the Backend Agents.
 */

const API_BASE = "http://localhost:3000";

export async function generatePlan(intent) {
    const res = await fetch(`${API_BASE}/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent })
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Plan generation failed");
    }
    return res.json();
}

// 🧩 F3 - Fetch Generated Code
export async function generateCode(plan) {
    const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan)
    });

    if (!res.ok) {
        throw new Error("Code generation failed");
    }
    return res.text(); // Returns raw string, not JSON
}

export async function explainPlan(intent, plan) {
    const res = await fetch(`${API_BASE}/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent, plan })
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Explanation generation failed");
    }
    return res.json();
}
