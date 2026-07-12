import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('Starting on lesson 1. Clicking on lesson 5 "Install Cursor"...');
  
  // Find lesson buttons in sidebar - look for one that says "Install Cursor"
  const lessonButtons = await page.$$('button:has-text("Install Cursor")');
  console.log(`Found ${lessonButtons.length} "Install Cursor" buttons`);
  
  if (lessonButtons.length > 0) {
    // Click the first one (should be in sidebar)
    await lessonButtons[0].click();
    await page.waitForTimeout(500);
    
    // Check the content changed
    const heading = await page.$('text=Install Cursor');
    if (heading) {
      console.log('✅ Successfully jumped to lesson "Install Cursor"');
      
      // Check if it's in preview mode (grayed out)
      const mainContent = await page.$('.flex-1.max-w-3xl');
      if (mainContent) {
        const opacity = await mainContent.evaluate(el => window.getComputedStyle(el).opacity);
        console.log('Content opacity:', opacity);
      }
    }
  }
  
  await browser.close();
})();
