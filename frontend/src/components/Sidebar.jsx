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
