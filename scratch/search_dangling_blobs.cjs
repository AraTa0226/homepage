const { execSync } = require('child_process');

try {
  console.log('Running git fsck...');
  const fsckOutput = execSync('git fsck --lost-found', { encoding: 'utf8' });
  const lines = fsckOutput.split('\n');
  console.log(`FSCK output lines: ${lines.length}`);
  
  let blobs = [];
  lines.forEach(line => {
    if (line.startsWith('dangling blob')) {
      const parts = line.split(' ');
      if (parts[2]) {
        blobs.push(parts[2].trim());
      }
    }
  });
  
  console.log(`Found dangling blobs in stdout: ${blobs.length}`);
  
  let matches = [];
  blobs.forEach(sha => {
    try {
      const content = execSync(`git cat-file -p ${sha}`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
      if (content.includes('AudioPlanManager') && content.includes('sections') && content.includes('audioLPs')) {
        const lineCount = content.split('\n').length;
        console.log(`Match: ${sha} | Lines: ${lineCount}`);
        if (lineCount > 3500 && lineCount < 4500) {
          matches.push({ sha, lines: lineCount, content });
        }
      }
    } catch (e) {
      // Ignore
    }
  });
  
  console.log(`Found matching blobs: ${matches.length}`);
  matches.forEach((m, idx) => {
    console.log(`[${idx}] SHA: ${m.sha} | Lines: ${m.lines}`);
    fs.writeFileSync(`scratch/recovered_blob_${m.sha}.txt`, m.content, 'utf8');
    console.log(`  Saved to scratch/recovered_blob_${m.sha}.txt`);
  });
} catch (e) {
  console.error('Error running search:', e.message);
}
