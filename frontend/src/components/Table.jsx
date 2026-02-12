import React from 'react';

export const Table = ({ columns = [], rows = [] }) => {
    return (
        <div className="sys-table-container">
            <table className="sys-table">
                <thead className="sys-table-head">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="sys-table-header-cell">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="sys-table-body">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="sys-table-row">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="sys-table-cell">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
