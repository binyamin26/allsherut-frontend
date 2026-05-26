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

  // Search ALL reviews for this text fragment
  console.log('\n--- Search by comment text ---');
  const [found] = await conn.query(
    `SELECT id, provider_id, reviewer_name, reviewer_email, rating,
            is_verified, is_published, comment, created_at
     FROM reviews
     WHERE comment LIKE '%ביום שישי%'
        OR comment LIKE '%המקרר%'
        OR comment LIKE '%בבוקר%'
     ORDER BY created_at DESC`
  );
  if (found.length === 0) {
    console.log('Nothing found. Trying broader search on ALL reviews from last 30 days...');
    const [recent] = await conn.query(
      `SELECT id, provider_id, reviewer_name, reviewer_email, rating,
              is_verified, is_published, LEFT(comment,80) as comment_preview, created_at
       FROM reviews
       WHERE created_at >= NOW() - INTERVAL 30 DAY
       ORDER BY created_at DESC`
    );
    if (recent.length === 0) {
      console.log('No reviews in last 30 days at all.');
    } else {
      console.log('Recent reviews (last 30 days):');
      recent.forEach(r => console.log(
        ' id=' + r.id + ' provider_id=' + r.provider_id +
        ' reviewer=' + r.reviewer_name + ' rating=' + r.rating +
        ' verified=' + r.is_verified + ' published=' + r.is_published +
        '\n   comment: ' + r.comment_preview +
        '\n   date: ' + r.created_at
      ));
    }
  } else {
    found.forEach(r => console.log(
      ' id=' + r.id + ' provider_id=' + r.provider_id +
      ' reviewer=' + r.reviewer_name + ' email=' + r.reviewer_email +
      ' rating=' + r.rating + ' verified=' + r.is_verified +
      '\n   comment: ' + r.comment +
      '\n   date: ' + r.created_at
    ));
  }

  await conn.end();
  console.log('\nDone.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
