import React from 'react';
import { SchemaRenderer } from '../renderer/SchemaRenderer.jsx';

/**
 * 🔹 F4 - Preview Panel
 * 
 * Renders the deterministic UI based on the validated JSON plan.
 * This ensures strict adherence to the schema, ignoring arbitrary code edits.
 */
export const PreviewPanel = ({ plan, loading }) => {
    if (loading) {
        return (
            <div className="preview-loading">
                <div className="skeleton-loader"></div>
                <p>Rendering deterministic components...</p>
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="preview-empty">
                <div className="empty-icon">🎨</div>
                <h3>Ready to Design</h3>
                <p>Describe your UI in the left panel to begin.</p>
            </div>
        );
    }

    return (
        <div className="preview-container">
            <div className="device-frame">
                <SchemaRenderer schema={plan} />
            </div>
        </div>
    );
};
