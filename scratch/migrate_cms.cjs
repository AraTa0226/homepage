
const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../src/data/cms.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// 1. Ensure audioLPs exists
if (!data.audioLPs) data.audioLPs = [];

// 2. Sync standardLineLanding into audioLPs if needed
const stdIndex = data.audioLPs.findIndex(p => p.slug === 'sp-standard');
if (stdIndex !== -1) {
    // Merge top-level standardLineLanding into the array entry to ensure sections are preserved
    const topLevel = data.standardLineLanding;
    const arrayEntry = data.audioLPs[stdIndex];
    
    // Prioritize whichever has sections
    if (topLevel.sections && topLevel.sections.length > 0) {
        data.audioLPs[stdIndex] = { ...arrayEntry, ...topLevel };
    } else if (arrayEntry.sections && arrayEntry.sections.length > 0) {
        data.standardLineLanding = { ...topLevel, ...arrayEntry };
    }
} else if (data.standardLineLanding) {
    data.audioLPs.push({ ...data.standardLineLanding, id: 'standard', slug: 'sp-standard' });
}

// 3. Remove duplicates from audioLPs based on slug
const seen = new Set();
data.audioLPs = data.audioLPs.filter(p => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
});

// 4. Ensure all LPs have sections array
data.audioLPs.forEach(lp => {
    if (!lp.sections) lp.sections = [];
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Migration complete: Standardized audioLPs and synced standardLineLanding');
