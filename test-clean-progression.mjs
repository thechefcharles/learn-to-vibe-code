import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Clear localStorage
  await page.goto('http://localhost:3008/course/00', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  
  // Reload page to start fresh
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('=== Clean test with no prior state ===\n');
  console.log('Starting at Lesson 1 (naturally)');
  
  // Jump ahead to Lesson 5 via sidebar
  console.log('Jumping to Lesson 5 via sidebar (should be in preview mode)...');
  const lessonButtons = await page.$$('button:has-text("Install Cursor")');
  if (lessonButtons.length > 0) {
    await lessonButtons[0].click();
    await page.waitForTimeout(500);
    
    const previewBadge = await page.$('text=Preview Mode');
    console.log(previewBadge ? '✅ In preview mode' : '❌ NOT in preview mode');
  }
  
  // Go back to lesson 1
  console.log('\nGoing back to Lesson 1...');
  const lesson1Btn = await page.$('button:has-text("Walkthrough Overview")');
  if (lesson1Btn) {
    await lesson1Btn.click();
    await page.waitForTimeout(500);
  }
  
  // Naturally progress to Lesson 5
  console.log('Naturally progressing 1 → 2 → 3 → 4 → 5 via Next button...');
  for (let i = 1; i < 5; i++) {
    const nextBtn = await page.$('button:has-text("Next →")');
    if (nextBtn) {
      console.log(`  Step ${i}`);
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
  }
  
  // Now at Lesson 5 naturally - should NOT have preview badge
  console.log('\nAt Lesson 5 via natural progression');
  const previewBadge = await page.$('text=Preview Mode');
  if (!previewBadge) {
    console.log('✅ NO preview badge (correctly unlocked)');
  } else {
    console.log('❌ Still showing preview badge');
  }
  
  const nextBtn = await page.$('button:has-text("Next →")');
  if (nextBtn) {
    const isDisabled = await nextBtn.evaluate(btn => btn.disabled);
    console.log(isDisabled ? '❌ Next button disabled' : '✅ Next button enabled');
  }
  
  await page.screenshot({ path: '/tmp/clean-progression.png' });
  
  await browser.close();
})();
