// 🔒 FROZEN API: This component is part of the deterministic registry.
// NO changes allowed. NO new props. NO style overrides.
// Schema: Navbar { title: string }

import React from 'react';

export const Navbar = ({ title }) => {
    return (
        <nav className="sys-navbar">
            <div className="sys-navbar-title">{title}</div>
        </nav>
    );
};
