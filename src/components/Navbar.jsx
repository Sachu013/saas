import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ background: '#333', padding: '10px 20px', color: '#fff', display: 'flex', gap: '20px' }}>
            <h2 style={{ margin: 0 }}>SaaS Manager</h2>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Link to="/" style={linkStyle}>Dashboard</Link>
                <Link to="/tools" style={linkStyle}>Tools</Link>
                <Link to="/users" style={linkStyle}>Users & Assignments</Link>
            </div>
        </nav>
    );
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px'
};

export default Navbar;
