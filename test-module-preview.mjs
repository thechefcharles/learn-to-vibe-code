import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('Starting on Module 0\n');
  
  // Open dropdown
  console.log('Opening module dropdown...');
  const dropdownBtn = await page.$('button:has-text("Module 00")');
  if (dropdownBtn) {
    await dropdownBtn.click();
    await page.waitForTimeout(500);
  }
  
  // Select Module 01
  console.log('Selecting Module 01...');
  const options = await page.$$('button');
  for (const opt of options) {
    const text = await opt.textContent();
    if (text && text.includes('Module 01')) {
      await opt.click();
      await page.waitForTimeout(1000);
      break;
    }
  }
  
  // Check if we're still viewing Module 0 content
  const mainContent = await page.$('text=Lesson 1: Walkthrough Overview');
  if (mainContent) {
    console.log('✅ Still viewing Module 0 content (not navigated)');
  } else {
    console.log('❌ Main content changed (unexpected navigation)');
  }
  
  // Check if dropdown shows Module 01
  const dropdownDisplay = await page.$('button:has-text("Module 01")');
  if (dropdownDisplay) {
    console.log('✅ Dropdown now shows Module 01');
  }
  
  // Check for preview badge in sidebar
  const previewBadge = await page.$('text=Preview Mode');
  if (previewBadge) {
    console.log('✅ Sidebar shows "Preview Mode" badge');
  }
  
  // Check if sidebar lessons are grayed out
  const sidebarSteps = await page.$('.opacity-60.pointer-events-none');
  if (sidebarSteps) {
    console.log('✅ Sidebar lessons are grayed out (opacity-60, pointer-events-none)');
  } else {
    console.log('❌ Sidebar not grayed out');
  }
  
  await page.screenshot({ path: '/tmp/module-preview-01.png' });
  console.log('\n✅ Screenshot saved');
  
  await browser.close();
})();
