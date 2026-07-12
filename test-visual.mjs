import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  
  // Open the dropdown
  const dropdownBtn = await page.$('button:has-text("Module 00")');
  if (dropdownBtn) {
    await dropdownBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/final-dropdown.png' });
    console.log('✅ Dropdown screenshot taken');
  }
  
  await browser.close();
})();
