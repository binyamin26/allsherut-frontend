const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  const r = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) r.push(...findFiles(full));
    else if (f.name.endsWith('.jsx')) r.push(full);
  }
  return r;
}

const hebrewRegex = new RegExp('[\u0590-\u05FF]');
const files = findFiles('src');
const counts = {};

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf-8').split('\n');
  let count = 0;
  for (const line of lines) {
    if (!hebrewRegex.test(line)) continue;
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    // Skip lines that contain t() calls (they have translation keys)
    if (line.includes("t('") || line.includes('t("')) continue;
    count++;
  }
  if (count > 0) counts[file] = count;
}

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
for (const [f, c] of sorted) {
  console.log(c + '\t' + f.split(path.sep).join('/'));
}
