const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

function addReactImport(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Vérifier si le fichier est .tsx et n'a pas déjà l'import React
  if (filePath.endsWith('.tsx') && !content.includes('import React')) {
    const lines = content.split('\n');
    
    // Trouver la première ligne non-vide qui n'est pas un commentaire
    let insertIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('//') && !line.startsWith('/*')) {
        insertIndex = i;
        break;
      }
    }
    
    // Insérer l'import React
    lines.splice(insertIndex, 0, "import React from 'react';");
    
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`✓ Fixed: ${filePath}`);
  }
}

function processDirectory(directory) {
  const items = fs.readdirSync(directory);
  
  items.forEach(item => {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      addReactImport(fullPath);
    }
  });
}

processDirectory(srcPath);
console.log('All React imports have been added!');