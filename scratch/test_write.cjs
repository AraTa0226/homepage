
const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../src/data/cms.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Find sp-standard LP
const lp = data.audioLPs.find(p => p.slug === 'sp-standard');
if (lp) {
    lp.sections.push({
        id: 'sec_test_manual',
        type: 'text',
        data: { title: 'MANUAL TEST', content: '<p>Added via script</p>' }
    });
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Successfully added manual test section');
} else {
    console.log('LP sp-standard not found');
}
