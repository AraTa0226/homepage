const fs = require('fs');
try {
  const cms = JSON.parse(fs.readFileSync('src/data/cms.json', 'utf8'));
  const lps = cms.audioLPs || [];
  console.log('Number of LPs:', lps.length);
  lps.forEach(lp => {
    console.log(`LP ID: ${lp.id} | Slug: ${lp.slug} | Name: ${lp.name}`);
    console.log(`  Sections count: ${lp.sections ? lp.sections.length : 'none'}`);
    if (lp.sections) {
      lp.sections.forEach((sec, idx) => {
        console.log(`    [${idx}] Type: ${sec.type} | ID: ${sec.id}`);
      });
    }
  });
} catch (e) {
  console.error('Error:', e.message);
}
