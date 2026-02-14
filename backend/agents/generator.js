/**
 * Deterministic React Code Generator
 * 
 * Transforms a validated JSON plan into React source code string.
 * This is a PURE transformation - no AI involved.
 */

// 🧩 Task 4.4 - Normalize Props
function normalizeProps(props = {}) {
    const newProps = {};
    for (const key in props) {
        if (key === 'class') {
            newProps.className = props[key];
        } else {
            newProps[key] = props[key];
        }
    }
    return newProps;
}

// 🧩 Task 4.5 - Safety Helper: Escape strings for JSX
function escapeJSX(str) {
    if (typeof str !== 'string') return str;
    // Basic escaping for text content
    return str.replace(/{/g, '{"{"}').replace(/}/g, '{"}"}');
}

// Helper: Recursively render a single node
function renderNode(node) {
    // 🧩 Task 4.5 - Safety Guard: Invalid node
    if (!node || typeof node !== 'object') {
        return '';
    }

    // 🧩 Task 4.5 - Safety Guard: Missing type, return empty string (ignore node)
    if (!node.type) {
        return '';
    }

    const { type, props = {}, children = [] } = node;

    // Normalize key-value pairs
    const normalizedProps = normalizeProps(props);

    // Convert props object to string: title="Hello" isOpen={true}
    const propsString = Object.entries(normalizedProps).map(([key, value]) => {
        // 🧩 Task 4.5 - Safety Guard: Safe string prop values
        if (typeof value === 'string') {
            // Simple double quote encapsulation, value inside
            // For complex strings containing quotes, JSON.stringify is safer for value content
            return `${key}=${JSON.stringify(value)}`;
        }
        // Number, Boolean, Object/Array props: key={value}
        // JSON.stringify handles escaping correctly here
        return `${key}={${JSON.stringify(value)}}`;
    }).join(' ');

    // 🧩 Task 4.5 - Safety Guard: Default empty children
    const safeChildren = Array.isArray(children) ? children : [];

    const childrenString = safeChildren
        .map(child => renderNode(child))
        .filter(Boolean) // Remove empty strings from skipped invalid nodes
        .join('\n');

    // Self-closing tag if no children
    if (!childrenString) {
        return `<${type}${propsString ? ' ' + propsString : ''} />`;
    }

    // Nested tag
    return `
<${type}${propsString ? ' ' + propsString : ''}>
${childrenString}
</${type}>
`;
}

// Main Export
export function generateCode(plan) {
    // 🧩 Task 4.5 - Safety Guard: Invalid plan structure
    if (!plan || !Array.isArray(plan.components)) {
        throw new Error('Invalid plan: components must be an array.');
    }

    // 1. Collect type imports
    const usedComponents = new Set();
    function collectTypes(nodes) {
        if (!nodes) return;
        nodes.forEach(node => {
            if (node && node.type) usedComponents.add(node.type);
            if (node && node.children && Array.isArray(node.children)) {
                collectTypes(node.children);
            }
        });
    }

    collectTypes(plan.components);

    const imports = Array.from(usedComponents)
        .sort()
        .map(type => `import { ${type} } from './components/${type}';`)
        .join('\n');

    // 2. Body
    const body = plan.components
        .map(renderNode)
        .filter(Boolean)
        .join('\n');

    // 3. Wrapper
    return `
import React from 'react';
${imports}

export default function GeneratedPage() {
  return (
    <>
      ${body}
    </>
  );
}
`;
}
