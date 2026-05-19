const { execSync } = require('child_process');

const commits = [
  'HEAD',
  '9615265',
  '6d7d8db',
  '40d9bfd',
  '8d30907',
  '3e4d543',
  '30ea505',
  '0bf8562',
  '2ec0c80'
];

commits.forEach(commit => {
  try {
    const output = execSync(`git show ${commit}:src/pages/Admin/Dashboard.tsx`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const lines = output.split('\n').length;
    console.log(`Commit: ${commit} | Lines: ${lines}`);
  } catch (e) {
    console.log(`Commit: ${commit} | Error: ${e.message}`);
  }
});
