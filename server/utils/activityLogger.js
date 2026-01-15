const db = require('../config/db');

const logActivity = async (action_type, entity_name, description = '') => {
    try {
        await db.query(
            'INSERT INTO activity_logs (action_type, entity_name, description) VALUES (?, ?, ?)',
            [action_type, entity_name, description]
        );
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};

module.exports = logActivity;
