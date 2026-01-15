const db = require('../config/db');
const logActivity = require('../utils/activityLogger');

exports.getAllLicenses = async (req, res) => {
    try {
        const [licenses] = await db.query(`
            SELECT l.id, u.name as user_name, t.name as tool_name, l.assigned_date, l.user_id, l.tool_id
            FROM licenses l
            JOIN users u ON l.user_id = u.id
            JOIN tools t ON l.tool_id = t.id
        `);
        res.json(licenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.assignLicense = async (req, res) => {
    const { user_id, tool_id } = req.body;
    const assigned_date = new Date();
    try {
        const [result] = await db.query('INSERT INTO licenses (user_id, tool_id, assigned_date) VALUES (?, ?, ?)', [user_id, tool_id, assigned_date]);
        await logActivity('ASSIGN', 'License', `Assigned tool ID ${tool_id} to user ID ${user_id}`);
        res.status(201).json({ id: result.insertId, user_id, tool_id, assigned_date });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.revokeLicense = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM licenses WHERE id = ?', [id]);
        await logActivity('REVOKE', 'License', `Revoked license ID: ${id}`);
        res.json({ message: 'License revoked' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
