#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '../public/screenshots');
const contentDir = path.join(__dirname, '../content/modules');
const manifestPath = path.join(screenshotsDir, 'manifest.md');

// Parse manifest to get screenshot info
const manifest = fs.readFileSync(manifestPath, 'utf-8');
const lines = manifest.split('\n');

// Extract table rows (after header and separator)
const screenshots = {};
let inTable = false;

for (const line of lines) {
  if (line.startsWith('|') && line.includes('filename')) {
    inTable = true;
    continue;
  }
  if (inTable && line.startsWith('|---')) {
    continue;
  }
  if (inTable && line.startsWith('|')) {
    const parts = line.split('|').map(p => p.trim()).filter(Boolean);
    if (parts.length >= 4) {
      const filename = parts[0];
      const moduleNum = parseInt(parts[1]);
      const description = parts[2];

      if (!screenshots[moduleNum]) {
        screenshots[moduleNum] = [];
      }
      screenshots[moduleNum].push({ filename, description });
    }
  }
}

// Update markdown files
for (const [moduleNum, shots] of Object.entries(screenshots)) {
  const moduleFile = path.join(contentDir, `module-${String(moduleNum).padStart(2, '0')}-*.md`);

  // Find the actual file
  const files = fs.readdirSync(contentDir);
  const moduleRegex = new RegExp(`^module-${String(moduleNum).padStart(2, '0')}-`);
  const actualFile = files.find(f => moduleRegex.test(f));

  if (!actualFile) {
    console.log(`⚠️  No module file for module ${moduleNum}`);
    continue;
  }

  const filePath = path.join(contentDir, actualFile);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace screenshots
  for (const shot of shots) {
    // Match *[SCREENSHOT: description]*
    const escapedDesc = shot.description.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\*\\[SCREENSHOT: ${escapedDesc}\\]\\*`, 'g');

    const imagePath = `/screenshots/${shot.filename}`;
    const imageMarkdown = `![${shot.description}](${imagePath})`;

    content = content.replace(regex, imageMarkdown);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Updated module ${moduleNum} (${actualFile})`);
}

console.log('\n✨ Screenshots integrated!');
