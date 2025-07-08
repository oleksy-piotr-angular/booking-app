// add-filename-comments.js
const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const fileName = path.basename(filePath);
  const comment = `// ${fileName}`;
  const content = fs.readFileSync(filePath, 'utf8');
  const firstLine = content.split('\n')[0].trim();

  // Skip if already present
  if (firstLine === comment) return;

  // Prepend comment
  fs.writeFileSync(filePath, `${comment}\n${content}`, 'utf8');
  console.log(`Updated: ${filePath}`);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (
      fullPath.endsWith('.ts') &&
      !fullPath.endsWith('.d.ts') // skip type definition files
    ) {
      processFile(fullPath);
    }
  }
}

// Change this to your monorepo root if needed
walk(path.resolve(__dirname, 'projects'));

/**
 * !COMMAND TO RUN IN ROOT TERMINAL:
 * ?node add-filename-comments.js
 */