const fs = require('fs');
const cms = JSON.parse(fs.readFileSync('src/data/cms.json', 'utf8'));

console.log('CMS keys:', Object.keys(cms));
console.log('Plans type audio:');
const audioPlans = cms.plans.filter(p => p.type === 'audio');
audioPlans.forEach(p => {
  console.log(`- Category ID: ${p.id} | Name: ${p.category} | Items count: ${p.items.length}`);
  p.items.forEach(it => {
    console.log(`    - Item ID: ${it.id} | Name: ${it.name} | Link: ${it.link}`);
  });
});

console.log('\nAudioLPs (Dynamic LPs):');
cms.audioLPs.forEach(lp => {
  console.log(`- Slug: ${lp.slug} | Name: ${lp.name} | Parent Category ID: ${lp.parentCategoryId}`);
});
