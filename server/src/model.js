const { Pool } = require('pg');

// Connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

/**
 * Initialize Database Table
 * Run this once on server startup to ensure the table exists
 */
const initDatabase = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS visitors (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      full_name VARCHAR(150) NOT NULL,
      business VARCHAR(200),
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(200),
      area_of_operation VARCHAR(150),
      use_case VARCHAR(20) CHECK (use_case IN ('home', 'business')),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log('PostgreSQL: visitors table verified/created');
  } catch (err) {
    console.error('PostgreSQL: Error creating table', err);
  }
};

/**
 * Save visitor registration to database
 * @param {Object} data - Visitor form data
 * @returns {Object} Saved visitor record
 */
const createVisitor = async ({ fullName, business, phone, email, areaOfOperation, useCase }) => {
  const query = `
    INSERT INTO visitors (full_name, business, phone, email, area_of_operation, use_case)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, full_name, business, use_case, created_at;
  `;
  const values = [fullName, business, phone, email, areaOfOperation, useCase];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Fetch all visitors (For future admin dashboard)
 * @returns {Array} List of visitors
 */
const getVisitors = async () => {
  const result = await pool.query('SELECT * FROM visitors ORDER BY created_at DESC LIMIT 100;');
  return result.rows;
};

module.exports = {
  initDatabase,
  createVisitor,
  getVisitors
};