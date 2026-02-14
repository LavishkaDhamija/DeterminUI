// 🔒 FROZEN API: This component is part of the deterministic registry.
// NO changes allowed. NO new props. NO style overrides.
// Schema: Chart { title: string, type: 'bar' | 'line' | 'pie' | 'doughnut', data: number[] }

import React from 'react';

export const Chart = ({ title, type = 'bar', data = [] }) => {
    return (
        <div className="sys-chart">
            {title && <div className="sys-chart-title">{title}</div>}
            <div className={`sys-chart-content sys-chart-${type}`}>
                {data.map((value, index) => (
                    <div key={index} className="sys-chart-item">
                        {value}
                    </div>
                ))}
            </div>
        </div>
    );
};
