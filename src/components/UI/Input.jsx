import React from 'react';

const Input = ({ label, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {label && <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>{label}</label>}
            <input {...props} style={inputStyle} />
        </div>
    );
};

const inputStyle = {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '14px',
    outline: 'none',
    transition: 'var(--transition)',
    width: '100%',
};

export const Select = ({ label, children, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {label && <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-main)' }}>{label}</label>}
            <select {...props} style={inputStyle}>
                {children}
            </select>
        </div>
    );
};

export default Input;
