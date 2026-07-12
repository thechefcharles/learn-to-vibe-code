import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to course
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  
  // Wait a bit for hydration
  await page.waitForTimeout(2000);
  
  // Take a screenshot
  await page.screenshot({ path: '/tmp/toggle-test.png' });
  
  // Check for toggle buttons
  const lessonBtn = await page.$('button:has-text("Lesson")');
  const modulesBtn = await page.$('button:has-text("Modules")');
  
  console.log('Lesson button found:', !!lessonBtn);
  console.log('Modules button found:', !!modulesBtn);
  
  // Check for any errors in console
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  // Try clicking toggle if it exists
  if (lessonBtn && modulesBtn) {
    console.log('✅ Toggle buttons found! Clicking modules view...');
    await modulesBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/toggle-test-modules.png' });
  } else {
    // Search for any button with these texts
    const buttons = await page.$$('button');
    console.log(`Total buttons on page: ${buttons.length}`);
    
    for (let btn of buttons.slice(0, 10)) {
      const text = await btn.textContent();
      console.log(`Button: "${text}"`);
    }
  }
  
  await browser.close();
})();
