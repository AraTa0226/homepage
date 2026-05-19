const { execSync } = require('child_process');

try {
  const commits = execSync('git log --format="%H"', { encoding: 'utf8' }).trim().split('\n');
  console.log(`Searching across ${commits.length} commits...`);
  
  commits.forEach(commit => {
    try {
      const output = execSync(`git show ${commit}:src/pages/Admin/Dashboard.tsx`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
      if (output.includes('package_summary') || output.includes('link_cards')) {
        console.log(`FOUND IN COMMIT: ${commit} | Lines: ${output.split('\n').length}`);
      }
    } catch (e) {
      // Not in this commit
    }
  });
} catch (e) {
  console.error(e.message);
}
