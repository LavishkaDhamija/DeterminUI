// 🔒 FROZEN API: This component is part of the deterministic registry.
// NO changes allowed. NO new props. NO style overrides.
// Schema: Input { label: string, value: string, placeholder: string }

import React from 'react';

export const Input = ({ label, value, placeholder }) => {
    return (
        <div className="sys-input-container">
            {label && <label className="sys-input-label">{label}</label>}
            <input
                className="sys-input"
                value={value}
                placeholder={placeholder}
                readOnly
            />
        </div>
    );
};
