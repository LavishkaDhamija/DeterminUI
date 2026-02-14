// 🔒 FROZEN API: This component is part of the deterministic registry.
// NO changes allowed. NO new props. NO style overrides.
// Schema: Button { label: string, variant: 'primary' | 'secondary' }

import React from 'react';

export const Button = ({ label, variant = 'primary' }) => {
    return (
        <button className={`sys-button sys-button-${variant}`}>
            {label}
        </button>
    );
};
