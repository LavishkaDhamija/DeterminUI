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
