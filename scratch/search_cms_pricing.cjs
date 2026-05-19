const fs = require('fs');
const cms = JSON.parse(fs.readFileSync('src/data/cms.json', 'utf8'));
cms.audioLPs.forEach(lp => {
  console.log(`LP: ${lp.slug} (${lp.name})`);
  console.log('  Pricing:', lp.pricing);
  // check if there is a fixedPrice or similar field in sections or top-level
  const spkSection = lp.sections?.find(s => s.type === 'speakers');
  if (spkSection) {
    console.log('  Speakers Section fields:', Object.keys(spkSection.data));
    console.log('  Speakers Section spkFixedPrice:', spkSection.data.spkFixedPrice);
    console.log('  Speakers Section fixedPrice:', spkSection.data.fixedPrice);
    console.log('  Speakers Section planFixedPrice:', spkSection.data.planFixedPrice);
  }
});
