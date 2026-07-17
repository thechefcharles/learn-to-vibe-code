import { test, expect } from '@playwright/test';

test('Verify full module completion flow: Step 10 → Step 12 → Next Module button', async ({ page }) => {
  console.log('\n✅ VERIFICATION TEST: Module completion flow\n');

  // Load Module 0
  await page.goto('http://localhost:3008/course/0');
  await page.waitForLoadState('networkidle');

  // Navigate to step 10 directly (which has sections)
  console.log('📍 Navigating to step 10...');
  for (let i = 0; i < 9; i++) {
    const nextBtn = page.locator('button:has-text("Next")').first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(200);
    }
  }

  let stepText = await page.locator('text=/of 12/').first().textContent();
  console.log(`✓ At step: ${stepText}`);
  expect(stepText).toBe('10 of 12');

  // At step 10 (with sections), view all sections
  console.log('\n📍 At Step 10 (SectionLessonViewer). Viewing all sections...');

  // Click "Next →" to go to next section until we see "Lesson Complete! 🎉"
  let lessonCompleteBtn = page.locator('button:has-text("Lesson Complete")').first();
  while (!(await lessonCompleteBtn.isVisible())) {
    const nextSectionBtn = page.locator('button:has-text("Next →")').first();
    if (await nextSectionBtn.isVisible()) {
      await nextSectionBtn.click();
      await page.waitForTimeout(500);
    } else {
      break;
    }
  }

  // Once all sections viewed, click "Lesson Complete!"
  if (await lessonCompleteBtn.isVisible()) {
    console.log('✓ All sections viewed, lesson complete button visible');
    await lessonCompleteBtn.click();
    await page.waitForTimeout(500);
  }

  // Now navigate to steps 11 and 12
  console.log('\n📍 Navigating to Steps 11 and 12...');
  for (let i = 0; i < 2; i++) {
    const nextBtn = page.locator('button:has-text("Next")').first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
    }
  }

  stepText = await page.locator('text=/of 12/').first().textContent();
  console.log(`✓ Now at step: ${stepText}`);
  expect(stepText).toBe('12 of 12');

  // Verify "Next Module" button appears at step 12
  console.log('\n✅ CRITICAL: Looking for "Next Module →" button at step 12...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const nextModuleBtn = page.locator('a:has-text("Next Module"), button:has-text("Next Module")').first();
  const isVisible = await nextModuleBtn.isVisible({ timeout: 5000 }).catch(() => false);

  if (isVisible) {
    console.log('✅ SUCCESS: "Next Module →" button is visible!');
    const href = await nextModuleBtn.getAttribute('href');
    console.log(`   Button href: ${href}`);
    expect(href).toBe('/course/01');
  } else {
    console.log('❌ FAILED: "Next Module →" button not found');
    await page.screenshot({ path: 'tests/screenshots/verify-step12-no-button.png' });
    throw new Error('Next Module button not visible at step 12');
  }

  console.log('\n🎉 Module completion flow verified successfully!\n');
});
