-- Migration: add_france_geo_zones
-- Description: Référentiel géographique France (départements/communes) + zones de travail
--   prestataires basées sur des IDs géographiques (INSEE) plutôt que du texte libre.
-- Date: 2026-08-25
--
-- NOTE MySQL 8 : `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` / `ADD INDEX IF NOT EXISTS`
-- n'existent pas (syntaxe MariaDB). On garde l'idempotence via information_schema +
-- requêtes préparées, pour que ce fichier puisse être rejoué sans erreur.

CREATE TABLE IF NOT EXISTS fr_departments (
  code VARCHAR(3) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  region_code VARCHAR(3),
  communes_count INT DEFAULT 0,

  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS fr_communes (
  insee_code VARCHAR(5) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  department_code VARCHAR(3) NOT NULL,
  postal_codes VARCHAR(255),
  population INT DEFAULT 0,

  FOREIGN KEY (department_code) REFERENCES fr_departments(code),
  INDEX idx_name (name),
  INDEX idx_department (department_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --- provider_working_areas : colonnes de couverture géographique -------------------

SET @col := (SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'provider_working_areas'
               AND COLUMN_NAME = 'coverage_type');
SET @sql := IF(@col = 0,
  "ALTER TABLE provider_working_areas ADD COLUMN coverage_type ENUM('city','department') NULL AFTER neighborhood",
  'SELECT 1');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;

SET @col := (SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'provider_working_areas'
               AND COLUMN_NAME = 'department_code');
SET @sql := IF(@col = 0,
  "ALTER TABLE provider_working_areas ADD COLUMN department_code VARCHAR(3) NULL AFTER coverage_type",
  'SELECT 1');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;

SET @col := (SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'provider_working_areas'
               AND COLUMN_NAME = 'city_insee_code');
SET @sql := IF(@col = 0,
  "ALTER TABLE provider_working_areas ADD COLUMN city_insee_code VARCHAR(5) NULL AFTER department_code",
  'SELECT 1');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;

-- --- provider_working_areas : index ------------------------------------------------

SET @idx := (SELECT COUNT(*) FROM information_schema.STATISTICS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'provider_working_areas'
               AND INDEX_NAME = 'idx_department_code');
SET @sql := IF(@idx = 0,
  'ALTER TABLE provider_working_areas ADD INDEX idx_department_code (department_code)',
  'SELECT 1');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;

SET @idx := (SELECT COUNT(*) FROM information_schema.STATISTICS
             WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'provider_working_areas'
               AND INDEX_NAME = 'idx_city_insee');
SET @sql := IF(@idx = 0,
  'ALTER TABLE provider_working_areas ADD INDEX idx_city_insee (city_insee_code)',
  'SELECT 1');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;
