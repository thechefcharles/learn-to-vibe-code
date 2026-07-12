import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('Opened Module 0');
  
  // Open dropdown
  const dropdownBtn = await page.$('button:has-text("Module 00")');
  if (dropdownBtn) {
    await dropdownBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/module-dropdown-full.png' });
    console.log('✅ Dropdown screenshot taken');
  }
  
  // Click Module 00 again to close and re-open it
  if (dropdownBtn) {
    await dropdownBtn.click();
    await page.waitForTimeout(300);
    await dropdownBtn.click();
    await page.waitForTimeout(500);
  }
  
  // Now check what the sidebar shows
  const previewBadge = await page.$('text=Preview Mode');
  console.log('Preview badge found:', !!previewBadge);
  
  await browser.close();
})();
