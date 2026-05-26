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

  // 1. Move review id=49 from provider_id=310 to provider_id=175
  console.log('\n--- Moving review id=49 from provider_id=310 to provider_id=175 ---');
  const [move] = await conn.query(
    `UPDATE reviews SET provider_id = 175 WHERE id = 49 AND provider_id = 310`
  );
  console.log('Rows affected:', move.affectedRows);

  // 2. Recalculate average_rating for sp 310 and sp 175
  console.log('\n--- Recalculating average_rating for sp 310 and sp 175 ---');
  for (const spId of [310, 175]) {
    const [upd] = await conn.query(`
      UPDATE service_providers SET average_rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM reviews
        WHERE provider_id = ? AND is_verified = TRUE AND is_published = TRUE
      ) WHERE id = ?
    `, [spId, spId]);
    const [check] = await conn.query(`SELECT average_rating FROM service_providers WHERE id = ?`, [spId]);
    console.log(' sp.id=' + spId + ' new average_rating=' + check[0].average_rating);
  }

  // 3. Show all reviews now for sp 175 (Noam Bitton)
  console.log('\n--- All reviews for sp.id=175 (נועם ביטון) after fix ---');
  const [noamReviews] = await conn.query(
    `SELECT id, reviewer_name, rating, is_verified, is_published, LEFT(comment,60) as preview
     FROM reviews WHERE provider_id = 175 ORDER BY created_at DESC`
  );
  noamReviews.forEach(r => console.log(
    ' id=' + r.id + ' reviewer=' + r.reviewer_name + ' rating=' + r.rating +
    ' verified=' + r.is_verified + ' | ' + r.preview
  ));

  // 4. Search for a possible 2nd misrouted review for Noam
  // Look at ALL reviews from last 7 days that mention electrician context
  console.log('\n--- All reviews created in last 7 days (searching for Noam 2nd review) ---');
  const [recent] = await conn.query(`
    SELECT id, provider_id, reviewer_name, reviewer_email, rating,
           is_verified, is_published, LEFT(comment,80) as preview, created_at
    FROM reviews
    WHERE created_at >= NOW() - INTERVAL 7 DAY
    ORDER BY created_at DESC
  `);
  if (recent.length === 0) {
    console.log('No reviews in last 7 days.');
  } else {
    recent.forEach(r => console.log(
      ' id=' + r.id + ' provider_id=' + r.provider_id +
      ' reviewer=' + r.reviewer_name + ' rating=' + r.rating +
      ' verified=' + r.is_verified +
      '\n   ' + r.preview
    ));
  }

  await conn.end();
  console.log('\nDone.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
