import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('Current URL:', page.url());
  
  // Find and click module dropdown
  const dropdownBtn = await page.$('button:has-text("Module 00")');
  if (dropdownBtn) {
    await dropdownBtn.click();
    await page.waitForTimeout(500);
    
    // Look for Module 01 option in the dropdown
    const options = await page.$$('button');
    let mod01Btn = null;
    
    for (const opt of options) {
      const text = await opt.textContent();
      if (text && text.includes('Module 01')) {
        mod01Btn = opt;
        break;
      }
    }
    
    if (mod01Btn) {
      console.log('Found Module 01, clicking...');
      await mod01Btn.click();
      await page.waitForTimeout(1500); // Wait for navigation
      
      console.log('After click URL:', page.url());
      if (page.url().includes('/course/01')) {
        console.log('✅ Successfully navigated to Module 01');
        await page.screenshot({ path: '/tmp/module-01-after-nav.png' });
      } else {
        console.log('❌ Navigation failed, still on:', page.url());
      }
    } else {
      console.log('Module 01 button not found');
    }
  }
  
  await browser.close();
})();
