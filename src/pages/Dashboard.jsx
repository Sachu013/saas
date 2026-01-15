import React, { useEffect, useState } from 'react';
import { Users, Wrench, DollarSign } from 'lucide-react';
import api from '../api';
import { StatsCard } from '../components/UI/Card';
import Table, { TableRow, TableCell } from '../components/UI/Table';

const Dashboard = () => {
    const [summary, setSummary] = useState({ users: 0, tools: 0, cost: 0 });
    const [licenses, setLicenses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersRes = await api.get('/users');
                const toolsRes = await api.get('/tools');
                const licensesRes = await api.get('/licenses');

                const totalCost = toolsRes.data.reduce((acc, tool) => acc + Number(tool.cost), 0);

                setSummary({
                    users: usersRes.data.length,
                    tools: toolsRes.data.length,
                    cost: totalCost
                });
                setLicenses(licensesRes.data.slice(0, 5)); // Show only recent 5
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <StatsCard title="Total Users" value={summary.users} icon={Users} color="blue" />
                <StatsCard title="Total Tools" value={summary.tools} icon={Wrench} color="indigo" />
                <StatsCard title="Annual Cost" value={`$${summary.cost.toFixed(2)}`} icon={DollarSign} color="emerald" />
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Recent Assignments</h2>
            <Table headers={['User', 'Tool', 'Assigned Date']}>
                {licenses.map((license) => (
                    <TableRow key={license.id}>
                        <TableCell>{license.user_name}</TableCell>
                        <TableCell>{license.tool_name}</TableCell>
                        <TableCell>{new Date(license.assigned_date).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </Table>
        </div>
    );
};

export default Dashboard;
