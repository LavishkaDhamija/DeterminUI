import React from 'react';

export const Navbar = ({ title }) => {
    return (
        <nav className="sys-navbar">
            <div className="sys-navbar-title">{title}</div>
        </nav>
    );
};
