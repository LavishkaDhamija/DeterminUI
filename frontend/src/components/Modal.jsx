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
