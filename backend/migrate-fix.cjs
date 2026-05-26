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

  // 1. Move review id=46 from provider_id=310 to provider_id=175
  console.log('\n--- Moving review id=46 from provider_id=310 to provider_id=175 ---');
  const [move] = await conn.query(
    `UPDATE reviews SET provider_id = 175 WHERE id = 46 AND provider_id = 310`
  );
  console.log('Rows affected:', move.affectedRows);

  // 2. Recalculate average_rating for sp 310 and sp 175
  console.log('\n--- Recalculating average_rating ---');
  for (const spId of [310, 175]) {
    await conn.query(`
      UPDATE service_providers SET average_rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE provider_id = ? AND is_verified = TRUE AND is_published = TRUE
      ) WHERE id = ?
    `, [spId, spId]);
    const [check] = await conn.query(
      `SELECT average_rating,
              (SELECT COUNT(*) FROM reviews WHERE provider_id = ? AND is_verified=1 AND is_published=1) as cnt
       FROM service_providers WHERE id = ?`, [spId, spId]
    );
    console.log(' sp.id=' + spId + ' average_rating=' + check[0].average_rating + ' reviews=' + check[0].cnt);
  }

  // 3. Final state of Noam Bitton's reviews
  console.log('\n--- Final reviews for נועם ביטון (sp.id=175) ---');
  const [noam] = await conn.query(
    `SELECT id, reviewer_name, rating, LEFT(comment,80) as preview
     FROM reviews WHERE provider_id = 175 AND is_verified=1 ORDER BY created_at DESC`
  );
  noam.forEach(r => console.log(' id=' + r.id + ' reviewer=' + r.reviewer_name + ' rating=' + r.rating + '\n   ' + r.preview));

  await conn.end();
  console.log('\nDone.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
