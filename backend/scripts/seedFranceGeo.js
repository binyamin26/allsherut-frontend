// backend/scripts/seedFranceGeo.js
//
// Peuple fr_departments / fr_communes depuis l'API officielle geo.api.gouv.fr
// (gouvernement français, gratuite, sans clé). Ne s'exécute JAMAIS côté navigateur —
// script one-shot à lancer manuellement depuis un environnement ayant accès à internet :
//
//   node backend/scripts/seedFranceGeo.js
//
// Idempotent (INSERT ... ON DUPLICATE KEY UPDATE) : peut être relancé sans risque
// pour rafraîchir les données (ex: nouvelle fusion de communes).
//
// Nécessite que la migration add_france_geo_zones.sql ait déjà été appliquée
// (tables fr_departments / fr_communes existantes).

const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const GEO_API = 'https://geo.api.gouv.fr';
const EXPECTED_MIN_DEPARTMENTS = 95; // 96 métropole + 5 DROM, tolère quelques absences ponctuelles de l'API
const EXPECTED_MIN_COMMUNES = 34000;

async function fetchJson(url) {
  const response = await fetch(url);
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok || !contentType.includes('application/json')) {
    const bodyPreview = (await response.text()).slice(0, 500);
    console.error(`⚠️  Réponse inattendue pour ${url}`);
    console.error(`   HTTP ${response.status}, content-type: ${contentType}`);
    console.error(`   Corps (500 premiers caractères):\n${bodyPreview}`);
    throw new Error(`Échec requête ${url} : réponse non-JSON (HTTP ${response.status})`);
  }

  return response.json();
}

async function seedDepartments(conn) {
  console.log('📡 Récupération des départements...');
  const departments = await fetchJson(`${GEO_API}/departements?fields=nom,code,codeRegion`);

  console.log(`📥 ${departments.length} départements reçus, insertion...`);
  for (const dep of departments) {
    await conn.execute(
      `INSERT INTO fr_departments (code, name, region_code)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name), region_code = VALUES(region_code)`,
      [dep.code, dep.nom, dep.codeRegion || null]
    );
  }

  if (departments.length < EXPECTED_MIN_DEPARTMENTS) {
    console.warn(`⚠️  Seulement ${departments.length} départements reçus (attendu >= ${EXPECTED_MIN_DEPARTMENTS}) — vérifier le format de réponse de l'API.`);
  }

  return new Set(departments.map(d => d.code));
}

async function seedCommunes(conn, validDepartmentCodes) {
  console.log('📡 Récupération des communes (peut prendre quelques secondes)...');
  const communes = await fetchJson(
    `${GEO_API}/communes?fields=nom,code,codeDepartement,codesPostaux,population&format=json&geometry=none`
  );

  console.log(`📥 ${communes.length} communes reçues, filtrage + insertion par lots...`);

  const rows = communes
    .filter(c => c.codeDepartement && validDepartmentCodes.has(c.codeDepartement))
    .map(c => [
      c.code,
      c.nom,
      c.codeDepartement,
      Array.isArray(c.codesPostaux) ? c.codesPostaux.join(',') : null,
      c.population || 0,
    ]);

  const skipped = communes.length - rows.length;
  if (skipped > 0) {
    console.log(`ℹ️  ${skipped} communes ignorées (pas de département rattaché reconnu, ex: certains territoires d'outre-mer).`);
  }

  const CHUNK_SIZE = 500;
  for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
    const chunk = rows.slice(i, i + CHUNK_SIZE);
    const placeholders = chunk.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const values = chunk.flat();

    await conn.query(
      `INSERT INTO fr_communes (insee_code, name, department_code, postal_codes, population)
       VALUES ${placeholders}
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         department_code = VALUES(department_code),
         postal_codes = VALUES(postal_codes),
         population = VALUES(population)`,
      values
    );
    process.stdout.write(`\r   ${Math.min(i + CHUNK_SIZE, rows.length)}/${rows.length} communes insérées`);
  }
  console.log('');

  if (rows.length < EXPECTED_MIN_COMMUNES) {
    console.warn(`⚠️  Seulement ${rows.length} communes insérées (attendu >= ${EXPECTED_MIN_COMMUNES}) — vérifier le format de réponse de l'API.`);
  }

  return rows.length;
}

async function updateCommunesCount(conn) {
  console.log('🔢 Mise à jour des compteurs de communes par département...');
  await conn.query(`
    UPDATE fr_departments d
    SET communes_count = (
      SELECT COUNT(*) FROM fr_communes c WHERE c.department_code = d.code
    )
  `);
}

async function run() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  console.log('✅ Connecté à la base de données');

  try {
    const validDepartmentCodes = await seedDepartments(conn);
    const communesCount = await seedCommunes(conn, validDepartmentCodes);
    await updateCommunesCount(conn);

    console.log(`\n🎉 Seed terminé : ${validDepartmentCodes.size} départements, ${communesCount} communes.`);
  } finally {
    await conn.end();
  }
}

run().catch(err => {
  console.error('❌ Erreur seed géo France:', err);
  process.exit(1);
});
