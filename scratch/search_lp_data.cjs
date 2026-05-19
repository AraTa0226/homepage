const fs = require('fs');

const cms = JSON.parse(fs.readFileSync('src/data/cms.json', 'utf8'));
const lp = cms.audioLPs.find(p => p.slug === 'sp-standard');
console.log('LP JSON structure:');
console.log(JSON.stringify(lp, null, 2));
