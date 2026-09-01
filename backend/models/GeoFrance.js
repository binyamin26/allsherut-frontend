// models/GeoFrance.js
// Référentiel géographique France (départements/communes) pour l'autocomplete
// des zones d'intervention. Tables peuplées par scripts/seedFranceGeo.js.
const { query } = require('../config/database');

class GeoFrance {
  /**
   * Recherche mixte départements + communes pour l'autocomplete.
   * Insensible aux accents/casse via la collation utf8mb4_unicode_ci des tables.
   */
  static async searchZones(q, limit = 8) {
    const term = (q || '').trim();
    if (term.length < 2) return [];

    const like = `%${term}%`;

    const departments = await query(
      `SELECT code, name, communes_count
       FROM fr_departments
       WHERE name LIKE ? OR code = ?
       ORDER BY (code = ?) DESC, name ASC
       LIMIT 3`,
      [like, term, term]
    );

    const communes = await query(
      `SELECT c.insee_code, c.name, c.postal_codes, c.department_code, d.name AS department_name
       FROM fr_communes c
       JOIN fr_departments d ON d.code = c.department_code
       WHERE c.name LIKE ?
       ORDER BY c.population DESC
       LIMIT ?`,
      [like, Math.max(1, limit - departments.length)]
    );

    return [
      ...departments.map(row => ({
        type: 'department',
        code: row.code,
        name: row.name,
        communesCount: row.communes_count,
      })),
      ...communes.map(row => ({
        type: 'city',
        inseeCode: row.insee_code,
        name: row.name,
        postalCode: (row.postal_codes || '').split(',')[0] || null,
        departmentCode: row.department_code,
        departmentName: row.department_name,
      })),
    ];
  }

  /** Résout le département d'une commune (utilisé par le matching de recherche). */
  static async resolveCommune(inseeCode) {
    if (!inseeCode) return null;
    const rows = await query(
      `SELECT c.insee_code, c.name, c.department_code, d.name AS department_name
       FROM fr_communes c
       JOIN fr_departments d ON d.code = c.department_code
       WHERE c.insee_code = ?
       LIMIT 1`,
      [inseeCode]
    );
    return rows[0] || null;
  }
}

module.exports = GeoFrance;
