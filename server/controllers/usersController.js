const db = require('../config/db');
const logActivity = require('../utils/activityLogger');

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createUser = async (req, res) => {
    const { name, role } = req.body;
    try {
        const [result] = await db.query('INSERT INTO users (name, role) VALUES (?, ?)', [name, role]);
        await logActivity('CREATE', 'User', `Added user: ${name}`);
        res.status(201).json({ id: result.insertId, name, role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, role } = req.body;
    try {
        await db.query('UPDATE users SET name = ?, role = ? WHERE id = ?', [name, role, id]);
        await logActivity('UPDATE', 'User', `Updated user: ${name}`);
        res.json({ id, name, role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        await logActivity('DELETE', 'User', `Deleted user ID: ${id}`);
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
