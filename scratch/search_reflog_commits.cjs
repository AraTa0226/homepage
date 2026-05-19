const { execSync } = require('child_process');

try {
  const reflog = execSync('git reflog', { encoding: 'utf8' });
  const shas = Array.from(new Set(reflog.match(/[0-9a-f]{7,40}/g) || []));
  console.log(`Found ${shas.length} unique SHAs in reflog.`);
  
  shas.forEach(sha => {
    try {
      const output = execSync(`git show ${sha}:src/pages/Admin/Dashboard.tsx`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
      const lineCount = output.split('\n').length;
      if (lineCount > 3500) {
        console.log(`FOUND BACKUP IN REFLOG: ${sha} | Lines: ${lineCount}`);
        fs.writeFileSync(`scratch/recovered_reflog_${sha}.tsx`, output, 'utf8');
      }
    } catch (e) {
      // Ignore
    }
  });
} catch (e) {
  console.error(e.message);
}
