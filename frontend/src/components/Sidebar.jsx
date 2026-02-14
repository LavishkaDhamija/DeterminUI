// 🔒 FROZEN API: This component is part of the deterministic registry.
// NO changes allowed. NO new props. NO style overrides.
// Schema: Sidebar { items: string[] }

import React from 'react';

export const Sidebar = ({ items = [] }) => {
    return (
        <aside className="sys-sidebar">
            <ul className="sys-sidebar-list">
                {items.map((item, index) => (
                    <li key={index} className="sys-sidebar-item">
                        {item}
                    </li>
                ))}
            </ul>
        </aside>
    );
};
