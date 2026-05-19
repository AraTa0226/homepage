const fs = require('fs');

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace in StandardLinePage.tsx
    if (filePath.includes('StandardLinePage.tsx')) {
        content = content.replace(
            /\{spk\.remarks && <p className="text-gray-500 text-\[15px\] font-bold mb-8 flex-grow leading-relaxed">● \{spk\.remarks\}<\/p>\}/g,
            `{spk.remarks && <p className="text-gray-500 text-[15px] font-bold mb-8 flex-grow leading-relaxed" dangerouslySetInnerHTML={{ __html: '● ' + spk.remarks.replace(/\\n/g, '<br />') }} />}`
        );

        content = content.replace(
            /<p className="text-gray-500 text-sm font-bold mb-6 flex-grow">\{spk\.remarks\}<\/p>/g,
            `<p className="text-gray-500 text-sm font-bold mb-6 flex-grow" dangerouslySetInnerHTML={{ __html: (spk.remarks || '').replace(/\\n/g, '<br />') }} />`
        );
    }
    
    // Replace in StandardLinePrintPage.tsx
    if (filePath.includes('StandardLinePrintPage.tsx')) {
        content = content.replace(
            /\{spk\.remarks && \(\s*<p className="text-\[9\.5px\] print:text-\[8px\] text-gray-500 line-clamp-2 print:line-clamp-2 leading-tight mb-2">\s*● \{spk\.remarks\}\s*<\/p>\s*\)\}/g,
            `{spk.remarks && (
                        <p className="text-[9.5px] print:text-[8px] text-gray-500 line-clamp-2 print:line-clamp-2 leading-tight mb-2" dangerouslySetInnerHTML={{ __html: '● ' + spk.remarks.replace(/\\n/g, '<br />') }} />
                      )}`
        );
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

updateFile('c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Audio\\StandardLinePage.tsx');
updateFile('c:\\Users\\Taiji\\Desktop\\Ai-projects\\ang-homepage\\src\\pages\\Admin\\StandardLinePrintPage.tsx');
console.log('Pages updated');
