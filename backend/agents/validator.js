/**
 * Deterministic UI Validator
 * Pure rule engine — NO AI LOGIC.
 */

import { COMPONENTS } from "../system/componentRegistry.js";

function validateNode(node) {
    if (!node || typeof node !== "object") {
        throw new Error("Invalid node.");
    }

    const { type, props = {}, children = [] } = node;

    // ✅ Check component whitelist
    if (!COMPONENTS[type]) {
        throw new Error(`Component "${type}" is not allowed.`);
    }

    const allowedProps = COMPONENTS[type].allowedProps;

    // ✅ Reject unknown props
    Object.keys(props).forEach((prop) => {
        if (!allowedProps.includes(prop)) {
            throw new Error(`Prop "${prop}" not allowed on "${type}".`);
        }
    });

    // ✅ Recursively validate children
    if (Array.isArray(children)) {
        children.forEach(validateNode);
    }
}

export function validatePlan(plan) {
    if (!plan || !Array.isArray(plan.components)) {
        throw new Error("Plan must contain a components array.");
    }

    plan.components.forEach(validateNode);
}
