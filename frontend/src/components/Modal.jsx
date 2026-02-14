// 🔒 FROZEN API: This component is part of the deterministic registry.
// NO changes allowed. NO new props. NO style overrides.
// Schema: Modal { isOpen: boolean, title: string, children: ReactNode }

import React from 'react';

export const Modal = ({ isOpen, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="sys-modal">
            <div className="sys-modal-header">
                {title}
            </div>
            <div className="sys-modal-body">
                {children}
            </div>
        </div>
    );
};
