import express from "express";
import { explainPlan } from "../agents/explainer.js";

const router = express.Router();

export async function handleExplain(req, res) {
    try {
        const { intent, plan } = req.body;

        if (!intent || !plan) {
            return res.status(400).json({ error: "Intent and plan are required." });
        }

        const explanation = await explainPlan(intent, plan);

        res.json({ explanation });
    } catch (error) {
        console.error("Explain route error:", error);
        res.status(500).json({ error: "Failed to generate explanation." });
    }
}

// Optional: If you prefer exporting the router directly like plan.js
router.post("/", handleExplain);
export default router;
