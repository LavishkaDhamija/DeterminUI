/**
 * Deterministic React Code Generator
 * 
 * Transforms a validated JSON plan into React source code string.
 * This is a PURE transformation - no AI involved.
 */

// Helper: Recursively render a single node
function renderNode(node) {
    if (!node || typeof node !== 'object') {
        return '';
    }

    const { type, props = {}, children = [] } = node;

    // Convert props object to string: title="Hello" isOpen={true}
    const propsString = Object.entries(props).map(([key, value]) => {
        // String props: key="value"
        if (typeof value === 'string') {
            return `${key}="${value}"`;
        }
        // Number, Boolean, Object/Array props: key={value}
        return `${key}={${JSON.stringify(value)}}`;
    }).join(' ');

    const childrenString = Array.isArray(children)
        ? children.map(child => renderNode(child)).join('\n')
        : '';

    // Self-closing tag if no children
    if (!childrenString) {
        return `<${type} ${propsString} />`;
    }

    // Nested tag
    return `
<${type} ${propsString}>
${childrenString}
</${type}>
`;
}

// Main Export
export function generateCode(plan) {
    if (!plan || !plan.components) {
        throw new Error('Invalid plan: missing components');
    }

    // 1. Collect all unique component types used in the plan (recursively)
    const usedComponents = new Set();
    function collectTypes(nodes) {
        if (!nodes) return;
        nodes.forEach(node => {
            if (node.type) usedComponents.add(node.type);
            if (node.children) collectTypes(node.children);
        });
    }
    collectTypes(plan.components);

    // 2. Generate Imports
    const imports = Array.from(usedComponents)
        .sort() // Deterministic import order
        .map(type => `import { ${type} } from '../components/${type}';`)
        .join('\n');

    // 3. Generate Component Body
    const jsx = plan.components.map(node => renderNode(node)).join('\n');

    // 4. Wrap in boilerplate
    return `
import React from 'react';
${imports}

export default function GeneratedScreen() {
  return (
    <div className="sys-layout">
      ${jsx}
    </div>
  );
}
`;
}
