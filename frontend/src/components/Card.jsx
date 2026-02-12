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
