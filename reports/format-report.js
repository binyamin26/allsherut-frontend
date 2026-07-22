// Turns rapport_prestataires.csv (produced by backend/scripts/provider-completeness-report.js)
// into a styled, organized rapport_prestataires.xlsx: colored header, autofilter, frozen header row,
// row banding by "missing score", and a Résumé summary tab.
//
// Usage: node format-report.js [path-to-csv] [path-to-xlsx-output]
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const csvPath = process.argv[2] || path.join(require('os').homedir(), 'Desktop', 'rapport_prestataires.csv');
const xlsxPath = process.argv[3] || path.join(require('os').homedir(), 'Desktop', 'rapport_prestataires.xlsx');

const parseCsv = (text) => {
  // Strip BOM
  text = text.replace(/^﻿/, '');
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); field = '';
      rows.push(row); row = [];
    } else if (c === '\r') {
      // ignore, \n handles the line break
    } else {
      field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || r[0] !== '');
};

async function run() {
  const raw = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCsv(raw);
  const header = rows[0];
  const data = rows.slice(1);

  const col = (name) => header.indexOf(name);
  const idxScore = col('Score manquant (/6)') !== -1 ? col('Score manquant (/6)') : col('Score manquant (/5)');

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'HomeSherut';
  workbook.created = new Date();

  // ---------- Sheet 1: Prestataires ----------
  const sheet = workbook.addWorksheet('Prestataires', {
    views: [{ state: 'frozen', ySplit: 1, xSplit: 1 }],
  });

  sheet.columns = header.map((h) => ({
    header: h,
    key: h,
    width: Math.min(Math.max(h.length + 2, 12), 40),
  }));

  // Wider columns for text-heavy fields
  const widthOverrides = {
    'Nom': 22, 'Email': 26, 'Ce qui manque': 40, 'Autres services': 24,
    'Service principal': 18, 'Verification': 12, 'Date inscription': 14,
  };
  header.forEach((h, i) => {
    if (widthOverrides[h]) sheet.getColumn(i + 1).width = widthOverrides[h];
  });

  data.forEach((r) => {
    sheet.addRow(header.map((_, i) => {
      const v = r[i] ?? '';
      const n = Number(v);
      return v !== '' && !Number.isNaN(n) && /^-?\d+(\.\d+)?$/.test(v) ? n : v;
    }));
  });

  // Header style: dark navy fill, white bold text, autofilter
  const headerRow = sheet.getRow(1);
  headerRow.height = 30;
  headerRow.eachCell((cell) => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
    cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  });
  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: header.length } };

  // Row banding by "Score manquant": 0-1 blanc, 2-3 orange clair, 4+ rose/rouge
  if (idxScore !== -1) {
    const scoreCol = idxScore + 1;
    for (let r = 2; r <= data.length + 1; r++) {
      const score = Number(sheet.getRow(r).getCell(scoreCol).value) || 0;
      let argb = null;
      if (score >= 4) argb = 'FFF8CBAD';
      else if (score >= 2) argb = 'FFFCE4D6';
      if (argb) {
        sheet.getRow(r).eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb } };
        });
      }
    }
  }

  // Thin borders + vertical alignment for readability
  sheet.eachRow((row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
        bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
      };
      if (!cell.alignment) cell.alignment = { vertical: 'middle' };
    });
  });

  // ---------- Sheet 2: Résumé ----------
  const summary = workbook.addWorksheet('Résumé');
  summary.columns = [{ width: 32 }, { width: 16 }];

  const total = data.length;
  const idxMissing = col('Ce qui manque');
  const idxService = col('Service principal');
  const idxActif = col('Actif');

  const missingCounts = {};
  data.forEach((r) => {
    const m = (r[idxMissing] || '').split('|').map((s) => s.trim()).filter(Boolean);
    m.forEach((k) => { missingCounts[k] = (missingCounts[k] || 0) + 1; });
  });

  const serviceCounts = {};
  data.forEach((r) => {
    const s = r[idxService] || 'N/A';
    serviceCounts[s] = (serviceCounts[s] || 0) + 1;
  });

  const activeCount = data.filter((r) => r[idxActif] === 'oui').length;
  const avgScore = idxScore !== -1 && total
    ? (data.reduce((sum, r) => sum + (Number(r[idxScore]) || 0), 0) / total).toFixed(2)
    : 'N/A';

  const addTitle = (text) => {
    const row = summary.addRow([text]);
    row.getCell(1).font = { bold: true, size: 13, color: { argb: 'FF1F3864' } };
    summary.mergeCells(row.number, 1, row.number, 2);
    return row;
  };
  const addStat = (label, value) => {
    const row = summary.addRow([label, value]);
    row.getCell(1).font = { bold: true };
    return row;
  };

  addTitle('Vue d\'ensemble');
  addStat('Nombre total de prestataires', total);
  addStat('Prestataires actifs', activeCount);
  addStat('Score manquant moyen', avgScore);
  summary.addRow([]);

  addTitle('Ce qui manque le plus (nb de prestataires concernés)');
  Object.entries(missingCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([label, count]) => addStat(label, count));
  summary.addRow([]);

  addTitle('Répartition par service principal');
  Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([label, count]) => addStat(label, count));

  summary.eachRow((row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = { vertical: 'middle' };
    });
  });

  await workbook.xlsx.writeFile(xlsxPath);
  console.log(`OK: ${xlsxPath} (${total} prestataires)`);
}

run().catch((e) => {
  console.error('ERR:', e.message);
  process.exit(1);
});
