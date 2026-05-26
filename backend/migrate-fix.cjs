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

  // 1. Check for orphaned reviews (provider_id not in service_providers)
  console.log('\n--- Orphaned reviews (provider_id missing from service_providers) ---');
  const [orphaned] = await conn.query(`
    SELECT r.id, r.provider_id, r.reviewer_name, r.rating, r.created_at
    FROM reviews r
    LEFT JOIN service_providers sp ON r.provider_id = sp.id
    WHERE sp.id IS NULL
    ORDER BY r.created_at DESC
  `);
  if (orphaned.length === 0) {
    console.log('None found — all reviews have valid provider_id.');
  } else {
    console.log('Found', orphaned.length, 'orphaned review(s) — deleting them now...');
    orphaned.forEach(r => console.log(' review id=' + r.id + ' provider_id=' + r.provider_id + ' reviewer=' + r.reviewer_name + ' rating=' + r.rating));
    const ids = orphaned.map(r => r.id);
    const [del] = await conn.query('DELETE FROM reviews WHERE id IN (?)', [ids]);
    console.log('Deleted', del.affectedRows, 'orphaned review(s).');
  }

  // 2. List providers with reviews: stored avg vs actual avg
  console.log('\n--- Providers with reviews (stored avg vs actual avg) ---');
  const [providers] = await conn.query(`
    SELECT sp.id,
           CONCAT(u.first_name, ' ', u.last_name) AS name,
           sp.average_rating AS stored_avg,
           COUNT(r.id) AS review_count,
           ROUND(AVG(r.rating), 2) AS actual_avg
    FROM service_providers sp
    JOIN users u ON sp.user_id = u.id
    LEFT JOIN reviews r ON r.provider_id = sp.id AND r.is_verified = TRUE AND r.is_published = TRUE
    GROUP BY sp.id, u.first_name, u.last_name, sp.average_rating
    HAVING review_count > 0
    ORDER BY sp.id
  `);
  let mismatches = 0;
  providers.forEach(p => {
    const drift = Math.abs((parseFloat(p.stored_avg) || 0) - (parseFloat(p.actual_avg) || 0)) > 0.01;
    if (drift) mismatches++;
    console.log(' sp.id=' + p.id + ' "' + p.name + '" stored=' + p.stored_avg + ' actual=' + p.actual_avg + ' count=' + p.review_count + (drift ? ' *** MISMATCH ***' : ''));
  });

  // 3. Fix any average_rating mismatches
  if (mismatches > 0) {
    console.log('\nFixing ' + mismatches + ' average_rating mismatch(es)...');
    for (const p of providers) {
      const drift = Math.abs((parseFloat(p.stored_avg) || 0) - (parseFloat(p.actual_avg) || 0)) > 0.01;
      if (drift) {
        await conn.query(`
          UPDATE service_providers SET average_rating = (
            SELECT COALESCE(AVG(rating), 0) FROM reviews
            WHERE provider_id = ? AND is_verified = TRUE AND is_published = TRUE
          ) WHERE id = ?
        `, [p.id, p.id]);
        console.log(' Fixed sp.id=' + p.id + ' "' + p.name + '"');
      }
    }
  } else {
    console.log('\nAll average_ratings are correct — nothing to fix.');
  }

  await conn.end();
  console.log('\nDone.');
}

run().catch(e => { console.error(e.message); process.exit(1); });
