import { test, expect } from '@playwright/test';

test('Diagnose module navigation issues', async ({ page }) => {
  console.log('\n🔧 DIAGNOSTIC: Module Navigation Issues\n');

  // Load Module 0
  await page.goto('http://localhost:3008/course/0');
  await page.waitForLoadState('networkidle');

  // Try to navigate steps one by one and record what we find
  let currentStep = 1;
  let navigationBlocked = false;
  let blockReason = '';

  while (currentStep <= 12 && !navigationBlocked) {
    // Get current step info
    const stepText = await page.locator('text=/of 12/').first().textContent();
    console.log(`\n📍 Step ${stepText}`);

    // Scroll to bottom to see buttons
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Check for Next button
    const nextBtn = page.locator('button:has-text("Next"), button:has-text("Back to Course")').first();
    const nextBtnVisible = await nextBtn.isVisible().catch(() => false);

    if (!nextBtnVisible) {
      console.log('   ❌ Next button NOT visible');
      navigationBlocked = true;
      blockReason = 'Next button not found';
      break;
    }

    // Check if button is disabled
    const isDisabled = await nextBtn.evaluate(el => (el as HTMLButtonElement).disabled);
    const buttonText = await nextBtn.textContent();

    console.log(`   Button: "${buttonText?.trim()}"`);
    console.log(`   Disabled: ${isDisabled}`);

    if (isDisabled) {
      console.log('   ⚠️ Button is DISABLED');

      // Check why it's disabled
      const pageText = await page.textContent();
      if (pageText?.includes('Complete all sections')) {
        console.log('   Reason: "Complete all sections to continue"');
        blockReason = 'Section completion blocking';
      } else if (pageText?.includes('Preview')) {
        console.log('   Reason: Preview mode');
        blockReason = 'Preview mode active';
      }

      // Look for sections on the page
      const sections = page.locator('[class*="section"], [class*="Section"], [class*="step-content"]');
      const sectionCount = await sections.count().catch(() => 0);
      if (sectionCount > 0) {
        console.log(`   Found ${sectionCount} section elements`);
      }

      // Don't continue if button is disabled
      navigationBlocked = true;
      break;
    }

    // Button is enabled - click it
    console.log('   ✓ Clicking Next button...');
    await nextBtn.click();
    await page.waitForTimeout(500);

    // Check if we actually moved to the next step
    const newStepText = await page.locator('text=/of 12/').first().textContent();
    if (newStepText === stepText) {
      console.log('   ❌ Step did not change after clicking!');
      navigationBlocked = true;
      blockReason = 'Navigation not working';
      break;
    }

    currentStep++;
  }

  console.log('\n' + '='.repeat(60));
  console.log('DIAGNOSIS SUMMARY:');
  console.log('='.repeat(60));
  console.log(`Final step reached: Step ${currentStep} of 12`);
  console.log(`Navigation blocked: ${navigationBlocked}`);
  if (blockReason) console.log(`Block reason: ${blockReason}`);

  // Check for "Next Module" button at current position
  const nextModuleBtn = page.locator('button:has-text("Next Module"), a:has-text("Next Module")');
  const nextModuleVisible = await nextModuleBtn.isVisible().catch(() => false);

  if (nextModuleVisible) {
    console.log('✓ "Next Module" button IS visible');
  } else {
    console.log('❌ "Next Module" button NOT visible');
    if (currentStep < 12) {
      console.log(`   Reason: Only reached step ${currentStep}, not at last step (12)`);
    }
  }

  console.log('='.repeat(60) + '\n');

  // Take screenshot of current state
  await page.screenshot({ path: `tests/screenshots/diagnose-step-${currentStep}.png` });
  console.log(`Screenshot saved: diagnose-step-${currentStep}.png`);
});
