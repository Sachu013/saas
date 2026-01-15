const db = require('../config/db');

exports.getRecentActivity = async (req, res) => {
    try {
        const [logs] = await db.query('SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT 5');
        res.json(logs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
