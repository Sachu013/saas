import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Tools from './pages/Tools';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout title="Dashboard"><Dashboard /></Layout>} />
        <Route path="/tools" element={<Layout title="Tools Management"><Tools /></Layout>} />
        <Route path="/users" element={<Layout title="Users & Assignments"><Users /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
