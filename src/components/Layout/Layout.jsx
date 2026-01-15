import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, title }) => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={mainStyle}>
                <header style={headerStyle}>
                    <h1 style={{ fontSize: '24px', fontWeight: '600' }}>{title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={avatarStyle}>AD</div>
                    </div>
                </header>
                <div style={contentStyle}>
                    {children}
                </div>
            </main>
        </div>
    );
};

const mainStyle = {
    flex: 1,
    marginLeft: 'var(--sidebar-width)',
    minHeight: '100vh',
    background: 'var(--bg-main)',
};

const headerStyle = {
    height: '64px',
    background: 'var(--bg-card)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    position: 'sticky',
    top: 0,
    zIndex: 10,
};

const contentStyle = {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
};

const avatarStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'var(--primary)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
};

export default Layout;
