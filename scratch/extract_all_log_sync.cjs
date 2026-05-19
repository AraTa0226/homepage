const fs = require('fs');
const path = require('path');

const dir = 'scratch/extracted';
if (fs.existsSync(dir)) {
  fs.readdirSync(dir).forEach(f => {
    if (f.endsWith('.json')) {
      try {
        const d = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
        const rep = d.replacement || '';
        if (rep.includes('handleSaveLP') || rep.includes('nextPlans')) {
          console.log(`\n=================== ${f} ===================`);
          console.log(rep.substring(0, 3000));
        }
      } catch (e) {
        // try reading as raw text if it failed
        const txt = fs.readFileSync(path.join(dir, f), 'utf8');
        if (txt.includes('handleSaveLP') || txt.includes('nextPlans')) {
          console.log(`\n=================== ${f} (raw) ===================`);
          console.log(txt.substring(0, 2000));
        }
      }
    }
  });
}
