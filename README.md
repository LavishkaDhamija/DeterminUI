# DeterminUI — Deterministic AI-Driven UI Generation

DeterminUI explores a different way of combining AI with software systems.
Instead of allowing a language model to directly generate UI code, the system restricts the model to planning structure while all execution is handled by deterministic, verifiable code.

The goal is to make AI-assisted UI generation reproducible, auditable, and safe to integrate into real applications.

---

## Overview

Many AI-driven UI generators produce outputs that are:

* Non-deterministic
* Difficult to validate
* Hard to regenerate reliably
* Prone to hallucinated styles, props, or layouts

DeterminUI addresses this by separating responsibilities:

```
AI is allowed to plan.
AI is not allowed to build.
```

The system divides work into:

* Planning (handled by the LLM)
* Execution (handled by deterministic runtime code)

This ensures:

* Reproducibility
* Validation before rendering
* Explainability of AI decisions
* Safe regeneration and versioning

---

## Architecture

DeterminUI follows a structured pipeline:

```
User Intent
   ↓
Planner Agent (LLM)
   ↓  Structured JSON Plan (no JSX)
Validation Layer
   ↓  Approved Component Graph
Deterministic Generator
   ↓  React Code (Pure Function)
Renderer
   ↓
Live Preview
```

**Key Principle:**
The LLM never generates UI code. It only produces structured intent.

---

## Planner Agent

The planner interprets natural language requests and converts them into a constrained UI schema.

### Allowed Components

```
Button, Card, Input, Table, Modal, Sidebar, Navbar, Chart
```

### Rules Enforced in the Prompt

* No JSX generation
* No styling decisions
* JSON-only output
* Must follow a strict schema

Example schema:

```
{
 "layout": string,
 "components": [
   { "type": string, "props": object, "children": [] }
 ]
}
```

This ensures the AI produces structure, not implementation.

---

## Explainability Layer

After planning, a secondary AI call can explain the reasoning behind the chosen layout.
This supports transparency, debugging, and auditability of AI-driven decisions.

---

## Fixed Component System

The frontend uses a closed component library.
AI cannot introduce new components or alter styling.

Each component exposes a strict contract:

```
Card   → { title }
Button → { label, variant }
Input  → { label, value, placeholder }
```

Unknown props are rejected.

---

## Validation Layer

Before anything is rendered, the plan is validated:

* Unknown components are rejected
* Invalid props are rejected
* Missing required props are rejected
* Invalid nesting is rejected

This converts AI output into a strict UI DSL (Domain Specific Language).

---

## Deterministic Generator

The generator is a pure transformation layer:

```
Same Input Plan
        =
Same Output Code
        =
Guaranteed Reproducibility
```

There is:

* No randomness
* No second AI call
* No regeneration drift

The generator simply converts validated JSON into JSX using fixed rules.

---

## Frontend Experience

The interface presents a structured workspace:

```
┌──────────────┬──────────────────────┬────────────────────┐
│ Intent Panel │ Generated Code       │ Live Preview       │
└──────────────┴──────────────────────┴────────────────────┘
```

Features include:

* Natural language UI requests ✏️
* Deterministic code output
* Live preview of generated UI
* Visibility into AI reasoning
* Regenerable, stable results

---

## Why This Approach Matters

DeterminUI models AI more like a compiler front-end than an autonomous developer.

| Traditional GenAI | DeterminUI Model  |
| ----------------- | ----------------- |
| LLM writes code   | LLM writes plans  |
| Hard to validate  | Fully enforceable |
| Unstable outputs  | Reproducible      |
| Unsafe for prod   | Safe-by-design    |

This approach is closer to how AI must behave in enterprise environments.

---

## Current Limitations

These constraints are intentional:

* Only whitelisted components are allowed
* Styling is static
* Layout intelligence is limited
* No semantic understanding of backend data
* Schema must be manually extended
* Version diffing is not yet implemented

These trade flexibility for determinism.

---

## Possible Future Extensions

If expanded further, the system could include:

1. Versioning Engine

   ```
   Intent → Plan → Snapshot → Diff → Rollback
   ```

2. Iterative Editing Agent
   Modify existing plans without full regeneration.

3. Structural Layout Primitives

   ```
   Grid, Stack, Container
   ```

4. Design Token Selection
   AI chooses from approved spacing, typography, and color sets.

5. Visual Plan Debugger
   Graph-based view of the component tree.

---

## Tech Stack

| Layer      | Technology                  |
| ---------- | --------------------------- |
| Frontend   | React.js                    |
| Backend    | Node.js (Express)           |
| Database   | MongoDB (planned)           |
| AI         | Local / API-based LLM       |
| Validation | Custom rule engine          |
| Rendering  | Deterministic JSX generator |

---

## Summary

DeterminUI is not a UI generator in the conventional sense.
It is a controlled orchestration model showing how LLMs can be integrated into production systems without sacrificing determinism.

AI suggests structure.
The system enforces correctness.

---

**Author:** Lavis
**Project:** DeterminUI
**Focus:** Deterministic Human–AI Collaboration
