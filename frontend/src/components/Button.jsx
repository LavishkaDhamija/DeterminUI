import React from 'react';

export const Button = ({ label, variant = 'primary' }) => {
    return (
        <button className={`sys-button sys-button-${variant}`}>
            {label}
        </button>
    );
};
