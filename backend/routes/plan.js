import express from "express";
import { createPlan } from "../agents/planner.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { intent } = req.body;

        if (!intent) {
            return res.status(400).json({ error: "Intent required" });
        }

        const plan = await createPlan(intent);

        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
