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
