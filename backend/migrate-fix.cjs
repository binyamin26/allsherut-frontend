// backend/migrate-fix.cjs — run from backend/: node migrate-fix.cjs
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const SQL = [
  `UPDATE reviews SET provider_id = 93 WHERE id = 52 AND provider_id = 174;`,
  `UPDATE service_providers SET average_rating = (
     SELECT COALESCE(AVG(r.rating), 0) FROM (SELECT rating FROM reviews WHERE provider_id = 93 AND is_verified = TRUE AND is_published = TRUE) r
   ) WHERE id = 93;`,
  `UPDATE service_providers SET average_rating = (
     SELECT COALESCE(AVG(r.rating), 0) FROM (SELECT rating FROM reviews WHERE provider_id = 174 AND is_verified = TRUE AND is_published = TRUE) r
   ) WHERE id = 174;`,
];

const LABELS = [
  'move review #52 from provider_id=174 to provider_id=93',
  'recalculate average_rating for sp 93',
  'recalculate average_rating for sp 174',
];

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  console.log('Connected to DB:', process.env.DB_HOST);

  for (let i = 0; i < SQL.length; i++) {
    try {
      const [result] = await conn.query(SQL[i]);
      console.log('OK:', LABELS[i], '— rows affected:', result.affectedRows ?? result.changedRows ?? '?');
    } catch (e) {
      console.log('ERROR:', LABELS[i], '-', e.message);
    }
  }

  await conn.end();
  console.log('Done.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
