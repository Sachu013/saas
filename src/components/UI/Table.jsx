import React from 'react';

const Table = ({ headers, children }) => {
    return (
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
                <thead style={{ background: 'var(--bg-main)' }}>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} style={thStyle}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export const TableRow = ({ children }) => (
    <tr style={{ borderBottom: '1px solid var(--border)' }}>
        {children}
    </tr>
);

export const TableCell = ({ children }) => (
    <td style={{ padding: '16px', fontSize: '14px', color: 'var(--text-main)' }}>
        {children}
    </td>
);

const thStyle = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
};

export default Table;
