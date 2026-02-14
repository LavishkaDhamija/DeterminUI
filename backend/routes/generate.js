import express from "express";
import { generateCode } from "../agents/generator.js";

const router = express.Router();

router.post("/", (req, res) => {
    try {
        const plan = req.body;

        if (!plan || !plan.components) {
            return res.status(400).json({ error: "Invalid plan provided." });
        }

        // Deterministic generation - pure function
        const jsx = generateCode(plan);

        // Return pure text/code, not JSON wrapper, for easy viewing
        res.set('Content-Type', 'text/plain');
        res.send(jsx);

    } catch (error) {
        res.status(500).json({ error: "Failed to generate code." });
    }
});

export default router;
