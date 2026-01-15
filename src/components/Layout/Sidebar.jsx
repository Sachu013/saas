import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Wrench, LogOut } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside style={sidebarStyle}>
            <div style={logoStyle}>
                <h2>SaaS Manager</h2>
            </div>
            <nav style={navStyle}>
                <NavLink to="/" style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/tools" style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
                    <Wrench size={20} />
                    <span>Tools</span>
                </NavLink>
                <NavLink to="/users" style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
                    <Users size={20} />
                    <span>Users</span>
                </NavLink>
            </nav>
            <div style={footerStyle}>
                <div style={linkStyle}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </div>
            </div>
        </aside>
    );
};

const sidebarStyle = {
    width: 'var(--sidebar-width)',
    height: '100vh',
    background: '#1e293b',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
};

const logoStyle = {
    padding: '24px',
    borderBottom: '1px solid #334155',
};

const navStyle = {
    flex: 1,
    padding: '24px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
};

const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: '#94a3b8',
    textDecoration: 'none',
    transition: 'var(--transition)',
    cursor: 'pointer',
};

const activeLinkStyle = {
    ...linkStyle,
    background: 'var(--primary)',
    color: '#fff',
};

const footerStyle = {
    padding: '20px',
    borderTop: '1px solid #334155',
};

export default Sidebar;
