import React from 'react';

const Button = ({ children, variant = 'primary', onClick, style, type = 'button' }) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'danger':
                return { background: 'var(--danger)', color: '#fff' };
            case 'outline':
                return { background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)' };
            case 'primary':
            default:
                return { background: 'var(--primary)', color: '#fff', border: 'none' };
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={{ ...baseStyle, ...getVariantStyle(), ...style }}
        >
            {children}
        </button>
    );
};

const baseStyle = {
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'var(--transition)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid transparent',
};

export default Button;
