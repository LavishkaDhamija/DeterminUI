import express from "express";
import { createPlan } from "../agents/planner.js";
import { validatePlan } from "../agents/validator.js"; // Import validator

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { intent } = req.body;

        if (!intent) {
            return res.status(400).json({ error: "Intent required" });
        }

        const plan = await createPlan(intent);

        // Note: createPlan ALREADY calls validatePlan internally in agents/planner.js
        // line 20: validatePlan(plan);
        // So the plan returned here is guaranteed to be valid or it throws.
        // However, explicitly showing validation in the route or adding a debug route
        // as requested by the user is good practice for verification.

        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➕ Add /test-validate Route for Manual Testing
router.post("/test-validate", (req, res) => {
    try {
        // Manually run the validator on the request body
        validatePlan(req.body);

        // If no error thrown, it's valid
        res.json({ message: "Schema valid" });
    } catch (error) {
        // If validation fails, return 400 with the error message
        res.status(400).json({ error: error.message });
    }
});

export default router;
