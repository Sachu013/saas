import React from 'react';

export const Card = ({ children, className, style }) => {
    return (
        <div style={{ ...cardStyle, ...style }} className={className}>
            {children}
        </div>
    );
};

export const StatsCard = ({ title, value, icon: Icon, color = 'blue' }) => {
    return (
        <Card style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ ...iconBoxStyle, background: `var(--${color}-100)`, color: `var(--${color}-600)` }}>
                {Icon && <Icon size={24} color={color} />}
            </div>
            <div>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>{title}</p>
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{value}</h3>
            </div>
        </Card>
    );
};

const cardStyle = {
    background: 'var(--bg-card)',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid var(--border)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
};

const iconBoxStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#eff6ff',
};
