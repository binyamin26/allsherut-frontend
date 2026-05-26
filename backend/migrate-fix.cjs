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

  // 1. Find any user/provider with "noam" or "ביטון" or "bitton" in name
  console.log('\n--- Search for Noam Bitton ---');
  const [found] = await conn.query(`
    SELECT u.id as user_id, u.first_name, u.last_name, u.email,
           sp.id as sp_id, sp.average_rating, sp.service_type
    FROM users u
    LEFT JOIN service_providers sp ON sp.user_id = u.id
    WHERE LOWER(u.first_name) LIKE '%noam%'
       OR LOWER(u.last_name)  LIKE '%noam%'
       OR LOWER(u.first_name) LIKE '%bitton%'
       OR LOWER(u.last_name)  LIKE '%bitton%'
       OR u.first_name        LIKE '%נועם%'
       OR u.last_name         LIKE '%ביטון%'
  `);
  if (found.length === 0) {
    console.log('No user found matching Noam / Bitton / נועם / ביטון');
  } else {
    found.forEach(u => console.log(' user_id=' + u.user_id + ' name="' + u.first_name + ' ' + u.last_name + '" email=' + u.email + ' sp_id=' + u.sp_id + ' avg=' + u.average_rating + ' type=' + u.service_type));
  }

  // 2. Providers with stored avg > 0 but ZERO verified+published reviews
  // These are providers whose reviews were likely deleted/orphaned
  console.log('\n--- Providers with stored avg > 0 but 0 actual reviews ---');
  const [broken] = await conn.query(`
    SELECT sp.id as sp_id, CONCAT(u.first_name, ' ', u.last_name) AS name,
           sp.average_rating, sp.service_type,
           (SELECT COUNT(*) FROM reviews r WHERE r.provider_id = sp.id AND r.is_verified = TRUE AND r.is_published = TRUE) AS actual_count
    FROM service_providers sp
    JOIN users u ON sp.user_id = u.id
    WHERE sp.average_rating > 0
    HAVING actual_count = 0
    ORDER BY sp.id
  `);
  if (broken.length === 0) {
    console.log('None — all providers with avg > 0 still have their reviews.');
  } else {
    console.log('Found', broken.length, 'provider(s) whose reviews were deleted:');
    broken.forEach(p => console.log(' sp_id=' + p.sp_id + ' "' + p.name + '" stored_avg=' + p.average_rating + ' type=' + p.service_type));
  }

  await conn.end();
  console.log('\nDone.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
