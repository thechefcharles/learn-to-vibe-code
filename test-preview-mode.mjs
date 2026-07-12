import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('✅ Loaded Lesson 1 (Walkthrough Overview)');
  
  // Jump to lesson 5 via sidebar
  console.log('\nJumping to Lesson 5 via sidebar click...');
  const lessonButtons = await page.$$('button:has-text("Install Cursor")');
  if (lessonButtons.length > 0) {
    await lessonButtons[0].click();
    await page.waitForTimeout(500);
    
    // Check for preview badge
    const previewBadge = await page.$('text=Preview Mode');
    if (previewBadge) {
      console.log('✅ Preview Mode badge appears');
    } else {
      console.log('❌ Preview Mode badge NOT found');
    }
    
    // Check if content is grayed out
    const mainContent = await page.$('.flex-1.max-w-3xl');
    if (mainContent) {
      const hasOpacity = await mainContent.evaluate(el => {
        const classes = el.className;
        return classes.includes('opacity-60');
      });
      console.log(hasOpacity ? '✅ Content is grayed out (opacity-60)' : '❌ Content NOT grayed out');
    }
    
    // Check if Next button is disabled
    const nextBtn = await page.$('button:has-text("Preview Mode")');
    if (nextBtn) {
      const isDisabled = await nextBtn.evaluate(btn => btn.disabled);
      console.log(isDisabled ? '✅ Next button is disabled' : '❌ Next button is NOT disabled');
    } else {
      console.log('❌ "Preview Mode" button NOT found');
    }
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/preview-mode.png' });
    console.log('\n✅ Screenshot saved');
  }
  
  await browser.close();
})();
