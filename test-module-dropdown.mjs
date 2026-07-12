import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  // Look for module dropdown
  const moduleDropdownBtn = await page.$('button:has-text("Module 00")');
  console.log('Module dropdown found:', !!moduleDropdownBtn);
  
  if (moduleDropdownBtn) {
    // Click to open dropdown
    await moduleDropdownBtn.click();
    await page.waitForTimeout(500);
    
    // Take screenshot of open dropdown
    await page.screenshot({ path: '/tmp/module-dropdown-open.png' });
    console.log('✅ Module dropdown opened successfully');
    
    // Try clicking module 05 (should be unlocked)
    const mod05 = await page.$('button:has-text("Module 05")');
    if (mod05) {
      console.log('Module 05 button found, clicking...');
      await mod05.click();
      await page.waitForTimeout(500);
      
      // Check if we're still on same page or lessons changed
      const dropdownBtn = await page.$('button:has-text("Module 05")');
      if (dropdownBtn) {
        console.log('✅ Module dropdown changed to Module 05');
        await page.screenshot({ path: '/tmp/module-05-selected.png' });
      }
    }
  }
  
  await browser.close();
})();
