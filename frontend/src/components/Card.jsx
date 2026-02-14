// 🔒 FROZEN API: This component is part of the deterministic registry.
// NO changes allowed. NO new props. NO style overrides.
// Schema: Card { title: string, children: ReactNode }

import React from 'react';

export const Card = ({ title, children }) => {
    return (
        <div className="sys-card">
            {title && <div className="sys-card-header">{title}</div>}
            <div className="sys-card-body">
                {children}
            </div>
        </div>
    );
};
