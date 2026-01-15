const db = require('../config/db');
const logActivity = require('../utils/activityLogger');

exports.getAllTools = async (req, res) => {
    try {
        const [tools] = await db.query('SELECT * FROM tools');
        res.json(tools);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createTool = async (req, res) => {
    const { name, vendor, cost, renewal_date } = req.body;
    try {
        const [result] = await db.query('INSERT INTO tools (name, vendor, cost, renewal_date) VALUES (?, ?, ?, ?)', [name, vendor, cost, renewal_date]);
        await logActivity('CREATE', 'Tool', `Created tool: ${name}`);
        res.status(201).json({ id: result.insertId, name, vendor, cost, renewal_date });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateTool = async (req, res) => {
    const { id } = req.params;
    const { name, vendor, cost, renewal_date } = req.body;
    try {
        await db.query('UPDATE tools SET name = ?, vendor = ?, cost = ?, renewal_date = ? WHERE id = ?', [name, vendor, cost, renewal_date, id]);
        await logActivity('UPDATE', 'Tool', `Updated tool: ${name}`);
        res.json({ id, name, vendor, cost, renewal_date });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteTool = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tools WHERE id = ?', [id]);
        await logActivity('DELETE', 'Tool', `Deleted tool ID: ${id}`);
        res.json({ message: 'Tool deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
