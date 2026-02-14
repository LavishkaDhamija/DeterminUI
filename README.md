DeterminUI — Deterministic AI-Driven UI Generation
Overview

DeterminUI is an experimental system that explores how large language models can assist in user interface creation without being allowed to directly generate code.
Instead of letting AI build UI components freely, DeterminUI separates planning from execution. The model produces a structured description of an interface, and the application deterministically converts that description into React components using strict validation rules.

This approach ensures that AI contributes ideas while the system retains full control over what is rendered.

Problem Statement

Many AI-based UI generators suffer from several issues:

Outputs are non-deterministic and difficult to reproduce

Generated code often contains invalid properties or unsupported structures

Validation and auditing are difficult

Regeneration may produce different results for the same input

Direct AI code generation is unsafe for production environments

DeterminUI addresses these issues by treating AI output as untrusted input that must pass through a controlled pipeline before it can affect the UI.

Core Concept

DeterminUI follows a strict rule:

The AI is allowed to propose structure, but it is never allowed to implement it.

The system divides responsibilities into two layers:

The LLM generates a structured UI plan (intent).

The application validates and renders that plan using predefined components.

System Architecture

DeterminUI uses a Planner → Validator → Generator pipeline.

User Intent
   ↓
Planner Agent (LLM produces JSON only)
   ↓
Validation Layer (enforces schema and constraints)
   ↓
Deterministic Generator (pure transformation)
   ↓
React Component Output
   ↓
Rendered Interface


The same input always produces the same output because no randomness exists after the planning step.

Planner Agent

The Planner Agent translates natural language intent into a JSON schema describing the interface.
It operates under strict constraints:

It may only reference an approved list of components:

Button

Card

Input

Table

Modal

Sidebar

Navbar

Chart

It must return JSON only.

It cannot generate JSX or styling instructions.

It must follow a predefined schema.

This ensures the model provides structured intent rather than executable code.

Validation Layer

The validation stage treats the AI output as untrusted data and enforces deterministic rules:

Unknown components are rejected.

Invalid or extra props are rejected.

Required props must be present.

Component nesting must follow allowed patterns.

This transforms AI output into a constrained domain-specific language for UI definition.

Deterministic Generator

The generator is a pure function that converts validated JSON into React code.

Characteristics:

No AI involvement

No randomness

No external API calls

Identical input always produces identical JSX output

This guarantees reproducibility and allows regeneration without drift.

Component System

The frontend is built on a fixed component registry.
Each component exposes a clearly defined contract, for example:

Card → accepts title

Button → accepts label, variant

Input → accepts label, value, placeholder

No additional props are permitted.
This prevents uncontrolled UI generation.

Frontend Workspace

The interface provides an environment similar to modern AI-assisted development tools:

A panel for entering natural language intent

A generated code view

A live preview rendered from deterministic output

An explanation view describing planning decisions

Why This Approach Matters

DeterminUI demonstrates an alternative model for integrating AI into production systems.

Traditional Generative Approach	DeterminUI Approach
AI writes executable code	AI produces plans
Hard to validate	Fully enforceable
Outputs vary between runs	Reproducible
Risky in production	Controlled pipeline

This model treats the LLM more like a compiler front-end that suggests structure rather than an autonomous developer.

Current Limitations

The system is intentionally constrained:

Only whitelisted components may be used

Styling is static and not AI-driven

Layout capabilities are basic

Schema expansion requires manual updates

Version tracking and diffing are not yet implemented

These limitations are deliberate to maintain determinism.

Potential Future Work

With further development, the system could support:

Versioned UI plans with rollback capability

Incremental plan editing instead of full regeneration

Richer layout primitives such as Grid or Stack

Design token selection from approved sets

Visual debugging of the component tree

Technology Stack
Layer	Technology
Frontend	React.js
Backend	Node.js (Express)
AI	Local LLM via Ollama API
Validation	Custom rule engine
Rendering	Deterministic JSX builder
Database	MongoDB (planned)
Summary

DeterminUI is not a general-purpose UI generator.
It is a controlled framework for studying how AI can participate in interface design while keeping execution fully deterministic, auditable, and reproducible.