// backend/migrate-fix.cjs — run from repo root: node backend/migrate-fix.cjs
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  console.log('Connected to DB:', process.env.DB_HOST);

  // 1. Find who has user_id = 358 and what their sp.id is
  console.log('\n--- Looking up user_id=358 ---');
  const [users358] = await conn.query(
    `SELECT u.id as user_id, u.first_name, u.last_name, u.email, sp.id as sp_id, sp.average_rating
     FROM users u
     LEFT JOIN service_providers sp ON sp.user_id = u.id
     WHERE u.id = 358`
  );
  if (users358.length === 0) {
    console.log('No user with id=358 found.');
    await conn.end();
    return;
  }
  const user = users358[0];
  console.log('User:', user.first_name, user.last_name, '| email:', user.email, '| sp_id:', user.sp_id, '| stored avg:', user.average_rating);

  if (!user.sp_id) {
    console.log('This user has no service_provider record — cannot restore review.');
    await conn.end();
    return;
  }

  // 2. Check current reviews for this provider
  const [existing] = await conn.query(
    `SELECT id, reviewer_name, rating, is_verified, is_published FROM reviews WHERE provider_id = ?`, [user.sp_id]
  );
  console.log('Current reviews for sp_id=' + user.sp_id + ':', existing.length);
  existing.forEach(r => console.log(' id=' + r.id + ' reviewer=' + r.reviewer_name + ' rating=' + r.rating));

  // 3. Show actual columns of reviews table
  const [cols] = await conn.query(
    `SELECT COLUMN_NAME, IS_NULLABLE, COLUMN_DEFAULT
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'reviews'
     ORDER BY ORDINAL_POSITION`
  );
  console.log('\nActual reviews columns:');
  cols.forEach(c => console.log(' ' + c.COLUMN_NAME + ' nullable=' + c.IS_NULLABLE + ' default=' + c.COLUMN_DEFAULT));

  await conn.end();
  console.log('\nDone.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
