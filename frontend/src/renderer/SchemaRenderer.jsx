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
 * Strict recursive renderer
 */
const renderNode = (node, index) => {
    if (!node || typeof node !== "object") {
        return null; // Ignore invalid nodes instead of crashing entirely? Or strict throw? Strict is better for this assignment.
        // throw new Error("Invalid schema node."); 
    }

    const { type, props = {}, children = [] } = node;

    const Component = COMPONENT_MAP[type];

    if (!Component) {
        console.warn(`Component "${type}" is not allowed.`);
        return null;
    }

    // Recursively render children
    const childElements = Array.isArray(children)
        ? children.map((child, childIndex) => renderNode(child, childIndex))
        : null;

    return (
        <Component key={index} {...props}>
            {childElements}
        </Component>
    );
};

/**
 * Main Interpreter
 */
export const SchemaRenderer = ({ schema }) => {
    if (!schema || !Array.isArray(schema.components)) {
        return <div className="error-text">Invalid schema format</div>;
    }

    return (
        <div className="sys-canvas">
            {schema.components.map((node, index) =>
                renderNode(node, index)
            )}
        </div>
    );
};
