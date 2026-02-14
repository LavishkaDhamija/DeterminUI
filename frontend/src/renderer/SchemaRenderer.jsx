import React from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Table } from "../components/Table";
import { Modal } from "../components/Modal";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { Chart } from "../components/Chart";

/**
 * Whitelisted Components Only
 */
const COMPONENT_MAP = Object.freeze({
  Button,
  Card,
  Input,
  Table,
  Modal,
  Sidebar,
  Navbar,
  Chart
});

/**
 * Strict single-node renderer
 * No recursion
 * No layout freedom
 */
const renderNode = (node, index) => {
  if (!node || typeof node !== "object") {
    throw new Error("Invalid schema node.");
  }

  const { type, props = {} } = node;

  if (typeof type !== "string") {
    throw new Error("Component type must be a string.");
  }

  const Component = COMPONENT_MAP[type];

  if (!Component) {
    throw new Error(`Component "${type}" is not allowed.`);
  }

  if (typeof props !== "object" || Array.isArray(props)) {
    throw new Error(`Invalid props supplied to "${type}".`);
  }

  // No children allowed in Step 1
  if ("children" in node) {
    throw new Error(
      `"children" is not supported in Step 1. Layout must be explicit.`
    );
  }

  return <Component key={index} {...props} />;
};

/**
 * Main Interpreter
 */
export const SchemaRenderer = ({ schema }) => {
  if (!schema || !Array.isArray(schema.components)) {
    throw new Error(
      'Invalid schema. Expected: { components: [] }'
    );
  }

  return (
    <>
      {schema.components.map((node, index) =>
        renderNode(node, index)
      )}
    </>
  );
};
