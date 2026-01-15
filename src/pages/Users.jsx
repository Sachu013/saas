import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, Link as LinkIcon, X } from 'lucide-react';
import api from '../api';
import Button from '../components/UI/Button';
import Input, { Select } from '../components/UI/Input';
import Modal from '../components/UI/Modal';
import Table, { TableRow, TableCell } from '../components/UI/Table';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [tools, setTools] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');

    // User Modal State
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [userFormData, setUserFormData] = useState({ id: null, name: '', role: 'employee' });
    const [isEditingUser, setIsEditingUser] = useState(false);

    // Assign Modal State
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [assignData, setAssignData] = useState({ user_id: '', tool_id: '' });

    const fetchData = async () => {
        const usersRes = await api.get('/users');
        const toolsRes = await api.get('/tools');
        const licensesRes = await api.get('/licenses');
        setUsers(usersRes.data);
        setFilteredUsers(usersRes.data);
        setTools(toolsRes.data);
        setLicenses(licensesRes.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setFilteredUsers(users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())));
    }, [search, users]);

    // User CRUD
    const handleOpenUserModal = (user = null) => {
        if (user) {
            setUserFormData(user);
            setIsEditingUser(true);
        } else {
            setUserFormData({ id: null, name: '', role: 'employee' });
            setIsEditingUser(false);
        }
        setIsUserModalOpen(true);
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditingUser) {
                await api.put(`/users/${userFormData.id}`, userFormData);
            } else {
                await api.post('/users', userFormData);
            }
            setIsUserModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error saving user', error);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure? This will remove all licenses assigned to this user.')) {
            try {
                await api.delete(`/users/${id}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting user', error);
            }
        }
    };

    // License Assignment
    const handleOpenAssignModal = (user = null) => {
        setAssignData({ user_id: user ? user.id : '', tool_id: '' });
        setIsAssignModalOpen(true);
    };

    const handleAssignSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/licenses/assign', assignData);
            setIsAssignModalOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error assigning license', error);
        }
    };

    const handleRevoke = async (licenseId) => {
        if (window.confirm('Revoke this license?')) {
            try {
                await api.delete(`/licenses/${licenseId}`);
                fetchData();
            } catch (error) {
                console.error('Error revoking license', error);
            }
        }
    };

    const getUserLicenses = (userId) => {
        return licenses.filter(l => l.user_id === userId);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ width: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', padding: '0 12px', background: '#fff' }}>
                        <Search size={18} className="text-muted" />
                        <input
                            style={{ border: 'none', outline: 'none', padding: '10px', width: '100%' }}
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button onClick={() => handleOpenAssignModal()} variant="outline">
                        <LinkIcon size={18} /> Assign License
                    </Button>
                    <Button onClick={() => handleOpenUserModal()}>
                        <Plus size={18} /> Add User
                    </Button>
                </div>
            </div>

            <Table headers={['Name', 'Role', 'Assigned Tools', 'Actions']}>
                {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell><strong>{user.name}</strong></TableCell>
                        <TableCell><span style={badgeStyle}>{user.role}</span></TableCell>
                        <TableCell>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {getUserLicenses(user.id).map(l => (
                                    <span key={l.id} style={toolBadgeStyle}>
                                        {l.tool_name}
                                        <button onClick={() => handleRevoke(l.id)} style={xBtnStyle}><X size={12} /></button>
                                    </span>
                                ))}
                                {getUserLicenses(user.id).length === 0 && <span className="text-muted">-</span>}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Button variant="outline" style={{ padding: '6px' }} onClick={() => handleOpenUserModal(user)}>
                                    <Edit2 size={16} />
                                </Button>
                                <Button variant="danger" style={{ padding: '6px' }} onClick={() => handleDeleteUser(user.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            {/* User Modal */}
            <Modal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} title={isEditingUser ? 'Edit User' : 'Add New User'}>
                <form onSubmit={handleUserSubmit}>
                    <Input label="Name" value={userFormData.name} onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })} required />
                    <Select label="Role" value={userFormData.role} onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}>
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </Select>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                        <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>Cancel</Button>
                        <Button type="submit">{isEditingUser ? 'Save Changes' : 'Create User'}</Button>
                    </div>
                </form>
            </Modal>

            {/* Assign Modal */}
            <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title="Assign License">
                <form onSubmit={handleAssignSubmit}>
                    <Select label="User" value={assignData.user_id} onChange={(e) => setAssignData({ ...assignData, user_id: e.target.value })} required>
                        <option value="">Select User</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                    </Select>
                    <Select label="Tool" value={assignData.tool_id} onChange={(e) => setAssignData({ ...assignData, tool_id: e.target.value })} required>
                        <option value="">Select Tool</option>
                        {tools.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </Select>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                        <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Assign Tool</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

const badgeStyle = {
    padding: '4px 8px',
    borderRadius: '12px',
    background: '#e2e8f0',
    fontSize: '12px',
    textTransform: 'capitalize',
    fontWeight: '500'
};

const toolBadgeStyle = {
    padding: '2px 8px',
    borderRadius: '4px',
    background: '#dbeafe',
    color: '#1e40af',
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    border: '1px solid #bfdbfe'
};

const xBtnStyle = {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: '#1e40af',
    display: 'flex',
    alignItems: 'center'
};

export default Users;
