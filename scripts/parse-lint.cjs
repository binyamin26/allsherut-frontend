process.stdin.setEncoding('utf-8');
let data = '';
process.stdin.on('data', d => data += d);
process.stdin.on('end', () => {
  const lines = data.split('\n');
  let cur = null;
  const errs = {};
  for (const line of lines) {
    // File path lines start with C: on Windows
    if (/^C:/.test(line) && !line.trim().startsWith(' ')) {
      cur = line.trim();
    }
    if (/ error /.test(line) && !/problems/.test(line) && cur) {
      if (!errs[cur]) errs[cur] = [];
      errs[cur].push(line.trim());
    }
  }
  for (const [f, e] of Object.entries(errs)) {
    const short = f.replace(/.*AllSherut./, '').replace(/\\/g, '/');
    console.log(short + ' (' + e.length + ' errors)');
    e.slice(0, 3).forEach(x => console.log('  ' + x));
  }
});
