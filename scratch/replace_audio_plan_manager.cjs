const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, '..', 'src', 'pages', 'Admin', 'Dashboard.tsx');
const newComponentPath = path.join(__dirname, 'audio_plan_manager_new.tsx');

let dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
const newComponentContent = fs.readFileSync(newComponentPath, 'utf8');

// Find start and end markers
const startMarker = 'const AudioPlanManager = () => {';
const endMarker = 'const AnnouncementManager = () => {';

const startIndex = dashboardContent.indexOf(startMarker);
if (startIndex === -1) {
    console.error('Could not find start marker in Dashboard.tsx');
    process.exit(1);
}

const endIndex = dashboardContent.indexOf(endMarker);
if (endIndex === -1) {
    console.error('Could not find end marker in Dashboard.tsx');
    process.exit(1);
}

// Slice and replace
const before = dashboardContent.substring(0, startIndex);
const after = dashboardContent.substring(endIndex);

const updatedContent = before + newComponentContent + '\n\n' + after;

fs.writeFileSync(dashboardPath, updatedContent, 'utf8');
console.log('Successfully replaced AudioPlanManager in Dashboard.tsx');
