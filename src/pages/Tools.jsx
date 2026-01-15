import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import api from '../api';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Modal from '../components/UI/Modal';
import Table, { TableRow, TableCell } from '../components/UI/Table';

const Tools = () => {
    const [tools, setTools] = useState([]);
    const [filteredTools, setFilteredTools] = useState([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', vendor: '', cost: '', renewal_date: '' });
    const [isEditing, setIsEditing] = useState(false);

    const fetchTools = async () => {
        const res = await api.get('/tools');
        setTools(res.data);
        setFilteredTools(res.data);
    };

    useEffect(() => {
        fetchTools();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredTools(tools);
        } else {
            setFilteredTools(tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.vendor.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, tools]);

    const handleOpenModal = (tool = null) => {
        if (tool) {
            setFormData({ ...tool, renewal_date: tool.renewal_date.split('T')[0] });
            setIsEditing(true);
        } else {
            setFormData({ id: null, name: '', vendor: '', cost: '', renewal_date: '' });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tool?')) {
            try {
                await api.delete(`/tools/${id}`);
                fetchTools();
            } catch (error) {
                console.error('Error deleting tool', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/tools/${formData.id}`, formData);
            } else {
                await api.post('/tools', formData);
            }
            setIsModalOpen(false);
            fetchTools();
        } catch (error) {
            console.error('Error saving tool', error);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ width: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', padding: '0 12px', background: '#fff' }}>
                        <Search size={18} className="text-muted" />
                        <input
                            style={{ border: 'none', outline: 'none', padding: '10px', width: '100%' }}
                            placeholder="Search tools..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add Tool
                </Button>
            </div>

            <Table headers={['Name', 'Vendor', 'Cost', 'Renewal Date', 'Actions']}>
                {filteredTools.map((tool) => (
                    <TableRow key={tool.id}>
                        <TableCell><strong>{tool.name}</strong></TableCell>
                        <TableCell>{tool.vendor}</TableCell>
                        <TableCell>${Number(tool.cost).toFixed(2)}</TableCell>
                        <TableCell>{new Date(tool.renewal_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Button variant="outline" style={{ padding: '6px' }} onClick={() => handleOpenModal(tool)}>
                                    <Edit2 size={16} />
                                </Button>
                                <Button variant="danger" style={{ padding: '6px' }} onClick={() => handleDelete(tool.id)}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditing ? 'Edit Tool' : 'Add New Tool'}>
                <form onSubmit={handleSubmit}>
                    <Input label="Tool Name" name="name" value={formData.name} onChange={handleChange} required />
                    <Input label="Vendor" name="vendor" value={formData.vendor} onChange={handleChange} required />
                    <Input label="Cost ($)" name="cost" type="number" step="0.01" value={formData.cost} onChange={handleChange} required />
                    <Input label="Renewal Date" name="renewal_date" type="date" value={formData.renewal_date} onChange={handleChange} required />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">{isEditing ? 'Save Changes' : 'Create Tool'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Tools;
