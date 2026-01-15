const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function initDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('Connected to MySQL server.');

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created (or already exists).`);

    await connection.changeUser({ database: process.env.DB_NAME });

    // Create Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role ENUM('admin', 'manager', 'employee') NOT NULL
      )
    `);
    console.log('Users table created.');

    // Create Tools Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS tools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        vendor VARCHAR(255) NOT NULL,
        cost DECIMAL(10, 2) NOT NULL,
        renewal_date DATE NOT NULL
      )
    `);
    console.log('Tools table created.');

    // Create Licenses Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS licenses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        tool_id INT NOT NULL,
        assigned_date DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE
      )
    `);
    console.log('Licenses table created.');

    // Create Activity Logs Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        action_type VARCHAR(50) NOT NULL,
        entity_name VARCHAR(255) NOT NULL,
        description TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Activity Logs table created.');

    // Seed Data (Optional, but good for MVP)
    const [users] = await connection.query('SELECT * FROM users');
    if (users.length === 0) {
      console.log('Seeding initial data...');
      await connection.query(`
        INSERT INTO users (name, role) VALUES 
        ('Admin User', 'admin'),
        ('Manager User', 'manager'),
        ('John Doe', 'employee'),
        ('Jane Smith', 'employee')
      `);
      await connection.query(`
        INSERT INTO tools (name, vendor, cost, renewal_date) VALUES 
        ('Jira', 'Atlassian', 1200.00, '2025-12-31'),
        ('Slack', 'Salesforce', 800.00, '2025-06-30'),
        ('Zoom', 'Zoom Video', 300.00, '2025-09-15')
      `);
      console.log('Data seeded.');
    }

  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    await connection.end();
  }
}

initDB();
