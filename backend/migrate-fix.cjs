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

  // 1. All reviews for sp.id=175 (Noam Bitton's real sp), any verification status
  console.log('\n--- All reviews WHERE provider_id=175 (Noam sp_id, any status) ---');
  const [r175] = await conn.query(
    `SELECT id, reviewer_name, rating, is_verified, is_published, created_at
     FROM reviews WHERE provider_id = 175 ORDER BY created_at DESC`
  );
  if (r175.length === 0) console.log('None.');
  else r175.forEach(r => console.log(' id=' + r.id + ' reviewer=' + r.reviewer_name + ' rating=' + r.rating + ' verified=' + r.is_verified + ' published=' + r.is_published + ' date=' + r.created_at));

  // 2. All reviews for provider_id=94 (Noam's user_id — wrong ID)
  console.log('\n--- All reviews WHERE provider_id=94 (Noam user_id, any status) ---');
  const [r94] = await conn.query(
    `SELECT id, reviewer_name, rating, is_verified, is_published, created_at
     FROM reviews WHERE provider_id = 94 ORDER BY created_at DESC`
  );
  if (r94.length === 0) console.log('None.');
  else r94.forEach(r => console.log(' id=' + r.id + ' reviewer=' + r.reviewer_name + ' rating=' + r.rating + ' verified=' + r.is_verified + ' published=' + r.is_published + ' date=' + r.created_at));

  // 3. Does sp.id=94 exist?
  console.log('\n--- Does service_provider sp.id=94 exist? ---');
  const [sp94] = await conn.query(
    `SELECT sp.id, u.first_name, u.last_name, sp.service_type, sp.average_rating
     FROM service_providers sp JOIN users u ON sp.user_id = u.id WHERE sp.id = 94`
  );
  if (sp94.length === 0) console.log('No — sp.id=94 does not exist.');
  else sp94.forEach(s => console.log(' sp.id=94 belongs to: ' + s.first_name + ' ' + s.last_name + ' type=' + s.service_type + ' avg=' + s.average_rating));

  // 4. If sp.id=94 exists, show its reviews
  if (sp94.length > 0) {
    console.log('\n--- All reviews WHERE provider_id=94 attached to sp.id=94 ---');
    const [r94sp] = await conn.query(
      `SELECT id, reviewer_name, rating, is_verified, is_published FROM reviews WHERE provider_id = 94`
    );
    if (r94sp.length === 0) console.log('None.');
    else r94sp.forEach(r => console.log(' id=' + r.id + ' reviewer=' + r.reviewer_name + ' rating=' + r.rating + ' verified=' + r.is_verified));
  }

  // 5. Search ALL reviews for any reviewer mentioning Noam or bitton (comment text)
  console.log('\n--- Any review with reviewer_email containing bitnoam or noam ---');
  const [rEmail] = await conn.query(
    `SELECT id, provider_id, reviewer_name, reviewer_email, rating, is_verified, is_published
     FROM reviews
     WHERE reviewer_email LIKE '%bitnoam%' OR reviewer_email LIKE '%noam%'
     ORDER BY created_at DESC`
  );
  if (rEmail.length === 0) console.log('None.');
  else rEmail.forEach(r => console.log(' id=' + r.id + ' provider_id=' + r.provider_id + ' reviewer=' + r.reviewer_name + ' email=' + r.reviewer_email + ' rating=' + r.rating + ' verified=' + r.is_verified));

  await conn.end();
  console.log('\nDone.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
