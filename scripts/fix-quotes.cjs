// Fix unescaped " in JSX text content
// ESLint rule: react/no-unescaped-entities
// Strategy: replace " at specific line:col positions reported by ESLint

const fs = require('fs');

// Files and their problem line numbers (from ESLint output)
const fixes = {
  'src/pages/BillingPage.jsx': [361, 365, 369],
  'src/pages/PrivacyPolicy.jsx': [41, 51, 153, 157, 165, 206, 252, 432, 605, 645],
  'src/pages/TermsOfService.jsx': [78, 221, 236, 448, 464, 781, 787, 804],
};

for (const [file, problemLines] of Object.entries(fixes)) {
  let content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  let changed = 0;

  for (const lineNum of problemLines) {
    const idx = lineNum - 1;
    const line = lines[idx];
    if (!line) continue;

    // Replace " only in JSX text content (not in attribute values, not in JS strings)
    // Simple heuristic: replace all " that are NOT inside an HTML attribute (preceded by =)
    // and not inside a JS string within {}
    const newLine = line.replace(/"/g, (match, offset) => {
      // Check if this " is inside a JSX attribute (look back for =)
      const before = line.slice(0, offset);
      // If the last non-space char before " is =, it's an attribute
      const lastNonSpace = before.trimEnd();
      if (lastNonSpace.endsWith('=')) return match;
      // If inside a {} expression, skip
      let depth = 0;
      for (let i = 0; i < offset; i++) {
        if (line[i] === '{') depth++;
        else if (line[i] === '}') depth--;
      }
      if (depth > 0) return match;
      // Otherwise it's JSX text content — escape it
      changed++;
      return '&quot;';
    });
    lines[idx] = newLine;
  }

  fs.writeFileSync(file, lines.join('\n'));
  console.log(`${file}: fixed ${changed} quotes`);
}
