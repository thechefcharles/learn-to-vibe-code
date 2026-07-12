import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('Starting at Lesson 1');
  
  // Click Next to go to Lesson 2 naturally
  console.log('Clicking Next to go to Lesson 2...');
  let nextBtn = await page.$('button:has-text("Next →")');
  if (nextBtn) {
    await nextBtn.click();
    await page.waitForTimeout(500);
  }
  
  // Now jump ahead to Lesson 5
  console.log('\nJumping to Lesson 5 via sidebar...');
  const lessonButtons = await page.$$('button:has-text("Install Cursor")');
  if (lessonButtons.length > 0) {
    await lessonButtons[0].click();
    await page.waitForTimeout(500);
    
    // Should be in preview mode
    const previewBadge = await page.$('text=Preview Mode');
    console.log(previewBadge ? '✅ In preview mode (as expected)' : '❌ NOT in preview mode (unexpected)');
  }
  
  // Now naturally progress to Lesson 5 by clicking Next multiple times
  console.log('\nNaturally progressing via Next button...');
  for (let i = 2; i < 5; i++) {
    console.log(`  Lesson ${i} → ${i+1}`);
    nextBtn = await page.$('button:has-text("Next →")');
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
  }
  
  // Now we should be at Lesson 5 without preview mode
  console.log('\nNow at Lesson 5 via natural progression');
  const previewBadge = await page.$('text=Preview Mode');
  if (!previewBadge) {
    console.log('✅ Preview Mode badge gone (no longer in preview)');
  } else {
    console.log('❌ Still showing preview mode (unexpected)');
  }
  
  // Check Next button is enabled
  nextBtn = await page.$('button:has-text("Next →")');
  if (nextBtn) {
    const isDisabled = await nextBtn.evaluate(btn => btn.disabled);
    console.log(isDisabled ? '❌ Next button still disabled' : '✅ Next button enabled');
  }
  
  await page.screenshot({ path: '/tmp/natural-progression.png' });
  console.log('\n✅ Screenshot saved');
  
  await browser.close();
})();
