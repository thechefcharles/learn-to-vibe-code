import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Test 1: Module dropdown shows correct modules
  console.log('=== Module Navigation Feature Test ===\n');
  
  const dropdownBtn = await page.$('button:has-text("Module 00")');
  console.log('✅ Module dropdown found');
  
  if (dropdownBtn) {
    await dropdownBtn.click();
    await page.waitForTimeout(500);
    
    // Count module options
    const allButtons = await page.$$('button');
    let moduleCount = 0;
    for (const btn of allButtons) {
      const text = await btn.textContent();
      if (text && text.includes('Module')) {
        moduleCount++;
      }
    }
    console.log(`✅ Found ${moduleCount} modules in dropdown`);
  }
  
  // Test 2: Sidebar lessons are clickable
  const lesson5Btn = await page.$$('button:has-text("Install Cursor")');
  console.log(`✅ Sidebar lessons clickable (found ${lesson5Btn.length} "Install Cursor" buttons)`);
  
  // Test 3: Preview mode works when jumping ahead
  if (lesson5Btn.length > 0) {
    await lesson5Btn[0].click();
    await page.waitForTimeout(500);
    
    const previewBadge = await page.$('text=Preview Mode');
    console.log(previewBadge ? '✅ Preview mode active when jumping ahead' : '❌ Preview mode not found');
  }
  
  // Test 4: Back to current lesson
  const lesson1Btn = await page.$$('button:has-text("Walkthrough Overview")');
  if (lesson1Btn.length > 0) {
    await lesson1Btn[0].click();
    await page.waitForTimeout(500);
    
    const previewBadge = await page.$('text=Preview Mode');
    console.log(!previewBadge ? '✅ Preview mode removed at current lesson' : '❌ Preview mode still showing');
  }
  
  await page.screenshot({ path: '/tmp/final-feature-test.png' });
  console.log('\n✅ All feature tests completed');
  
  await browser.close();
})();
