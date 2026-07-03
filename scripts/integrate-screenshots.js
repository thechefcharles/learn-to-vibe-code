#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '../public/screenshots');
const contentDir = path.join(__dirname, '../content/modules');

// Map screenshots by module directly from folder structure
const modules = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

for (const moduleNum of modules) {
  const moduleDir = path.join(screenshotsDir, `m${String(moduleNum).padStart(2, '0')}`);

  if (!fs.existsSync(moduleDir)) {
    console.log(`⚠️  No screenshots folder for module ${moduleNum}`);
    continue;
  }

  const files = fs.readdirSync(moduleDir).filter(f => f.endsWith('.png'));

  if (files.length === 0) {
    console.log(`⚠️  No PNG files in module ${moduleNum}`);
    continue;
  }

  // Find the actual module file
  const allFiles = fs.readdirSync(contentDir);
  const moduleRegex = new RegExp(`^module-${String(moduleNum).padStart(2, '0')}-`);
  const moduleFile = allFiles.find(f => moduleRegex.test(f));

  if (!moduleFile) {
    console.log(`⚠️  No module file for module ${moduleNum}`);
    continue;
  }

  const filePath = path.join(contentDir, moduleFile);
  let content = fs.readFileSync(filePath, 'utf-8');
  let replacementCount = 0;

  // Replace all [SCREENSHOT: ...] patterns with images from this module
  // Match *[SCREENSHOT: anything]* pattern
  for (const file of files) {
    const imagePath = `/screenshots/m${String(moduleNum).padStart(2, '0')}/${file}`;
    const altText = file.replace(/^m\d+-\d+-/, '').replace(/\.png$/, '').replace(/-/g, ' ');
    const imageMarkdown = `![${altText}](${imagePath})`;

    // Replace the first occurrence of any [SCREENSHOT: ...] pattern with this image
    content = content.replace(/\*\[SCREENSHOT:[^\]]*\]\*/, imageMarkdown);
    replacementCount++;
  }

  if (replacementCount > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Module ${moduleNum}: Replaced ${replacementCount} screenshot(s)`);
  }
}

console.log('\n✨ Screenshots integrated!');
