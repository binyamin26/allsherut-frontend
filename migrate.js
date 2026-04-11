// migrate.js — run from repo root: node migrate.js
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend/.env') });

const SQL = [
  // 1. add_recruitment
  `
  SET @col = (SELECT COUNT(*) FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'service_providers' AND COLUMN_NAME = 'seeking_type');
  SET @s = IF(@col = 0,
    'ALTER TABLE service_providers ADD COLUMN seeking_type ENUM(\'clients\',\'recruitment\',\'both\') DEFAULT \'clients\'',
    'SELECT 1');
  PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;
  `,
  `
  CREATE TABLE IF NOT EXISTS job_listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    provider_id INT NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    contract_type ENUM('full_time','part_time','one_time') NOT NULL,
    salary VARCHAR(100) NOT NULL,
    payment_type ENUM('hourly','daily','monthly') NOT NULL,
    availability_days JSON,
    availability_hours JSON,
    experience_required VARCHAR(20) NOT NULL DEFAULT 'beginner',
    languages_required JSON,
    driving_license BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    location_city VARCHAR(100) NULL,
    location_area VARCHAR(100) NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (provider_id) REFERENCES service_providers(id) ON DELETE CASCADE,
    INDEX idx_service_type (service_type),
    INDEX idx_provider (provider_id),
    INDEX idx_active (is_active)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,
  `ALTER TABLE job_listings MODIFY COLUMN experience_required VARCHAR(20) NOT NULL DEFAULT 'beginner';`,
  `ALTER TABLE service_providers MODIFY COLUMN service_type VARCHAR(50) NOT NULL;`,
];

const LABELS = [
  'seeking_type column',
  'job_listings table',
  'fix experience_required',
  'fix service_type',
];

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
  console.log('Connected to DB:', process.env.DB_HOST);

  for (let i = 0; i < SQL.length; i++) {
    try {
      await conn.query(SQL[i]);
      console.log('OK:', LABELS[i]);
    } catch (e) {
      console.log('SKIP (already done?):', LABELS[i], '-', e.message);
    }
  }

  await conn.end();
  console.log('Done.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
