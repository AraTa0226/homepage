const fs = require('fs');
const { execSync } = require('child_process');

try {
  console.log('Running git fsck...');
  let fsckOutput = '';
  try {
    fsckOutput = execSync('git fsck --lost-found', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (err) {
    fsckOutput = err.stdout + '\n' + err.stderr;
  }
  
  const lines = fsckOutput.split('\n');
  console.log(`FSCK output lines: ${lines.length}`);
  
  let blobs = [];
  lines.forEach(line => {
    if (line.includes('dangling blob')) {
      const parts = line.trim().split(/\s+/);
      const sha = parts[parts.length - 1];
      if (sha && sha.length === 40) {
        blobs.push(sha);
      }
    }
  });
  
  // Also scan .git/lost-found/blob/ if it exists
  const lostFoundBlobDir = '.git/lost-found/blob';
  if (fs.existsSync(lostFoundBlobDir)) {
    const files = fs.readdirSync(lostFoundBlobDir);
    files.forEach(f => {
      if (f.length === 40) {
        blobs.push(f);
      }
    });
  }
  
  // Deduplicate
  blobs = [...new Set(blobs)];
  console.log(`Found candidate dangling SHAs: ${blobs.length}`);
  
  let matches = [];
  blobs.forEach(sha => {
    try {
      const content = execSync(`git cat-file -p ${sha}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
      if (content.includes('AudioPlanManager') && content.includes('activeTab') && content.includes('VehicleConfig')) {
        const lineCount = content.split('\n').length;
        console.log(`SHA match candidate: ${sha} | Lines: ${lineCount}`);
        matches.push({ sha, lines: lineCount, content });
      }
    } catch (e) {
      // Ignore
    }
  });
  
  console.log(`Found matching blobs: ${matches.length}`);
  matches.forEach((m, idx) => {
    const outPath = `scratch/recovered_blob_${m.sha}.tsx`;
    fs.writeFileSync(outPath, m.content, 'utf8');
    console.log(`[${idx}] SHA: ${m.sha} | Lines: ${m.lines} saved to ${outPath}`);
  });
} catch (e) {
  console.error('Error running search:', e);
}
