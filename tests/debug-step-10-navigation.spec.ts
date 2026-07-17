import { test, expect } from '@playwright/test';

test('Debug Step 10 Navigation - Trace Console Logs', async ({ page }) => {
  console.log('\n🔧 DEBUGGING: Step 10 Navigation Issue\n');

  // Capture console messages
  const consoleLogs: string[] = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    console.log(`   Console: ${text}`);
  });

  // Load Module 0
  await page.goto('http://localhost:3008/course/0');
  await page.waitForLoadState('networkidle');

  // Navigate to step 9 (one before the problem step)
  console.log('\n📍 Navigating to Step 9...');
  for (let i = 0; i < 8; i++) {
    const nextBtn = page.locator('button:has-text("Next")').first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
  }

  let currentStepText = await page.locator('text=/of 12/').first().textContent();
  console.log(`Current step: ${currentStepText}`);

  // Click once more to get to step 10
  console.log('\n📍 Clicking Next to go from step 9 to step 10...');
  const nextBtn9 = page.locator('button:has-text("Next")').first();
  if (await nextBtn9.isVisible()) {
    console.log('✓ Next button visible, clicking...');
    await nextBtn9.click();
    await page.waitForTimeout(1000);
  }

  currentStepText = await page.locator('text=/of 12/').first().textContent();
  console.log(`✓ After click, step is: ${currentStepText}`);

  // Now we're at step 10 - try to click Next again
  console.log('\n📍 At Step 10. Scrolling to see button...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const nextBtn10 = page.locator('button:has-text("Next"), button:has-text("Back to Course"), button:has-text("Complete all sections")').first();
  const btnText = await nextBtn10.textContent();
  const isDisabled = await nextBtn10.evaluate(el => (el as HTMLButtonElement).disabled);

  console.log(`\n📋 Button state at Step 10:`);
  console.log(`   Text: "${btnText?.trim()}"`);
  console.log(`   Disabled: ${isDisabled}`);

  // Take screenshot before click
  await page.screenshot({ path: 'tests/screenshots/debug-step10-before-click.png' });

  // Click the Next button at step 10
  console.log(`\n🖱️ Clicking Next button at Step 10...`);
  await nextBtn10.click();
  await page.waitForTimeout(1500);

  // Wait a bit for state to update
  await page.waitForTimeout(1000);

  // Check the step after clicking
  const stepAfterClick = await page.locator('text=/of 12/').first().textContent();
  console.log(`\n📍 After clicking Next at step 10:`);
  console.log(`   Step is now: ${stepAfterClick}`);

  if (stepAfterClick === currentStepText) {
    console.log(`   ❌ STEP DID NOT CHANGE!`);
  } else {
    console.log(`   ✓ Step changed successfully`);
  }

  // Take screenshot after click
  await page.screenshot({ path: 'tests/screenshots/debug-step10-after-click.png' });

  // Print all captured console logs
  console.log('\n📜 CONSOLE LOGS CAPTURED:');
  console.log('='.repeat(60));
  consoleLogs.forEach((log, i) => {
    if (log.includes('🔵') || log.includes('✓') || log.includes('📍') || log.includes('🖱️') || log.includes('⏭️')) {
      console.log(`${i}: ${log}`);
    }
  });
  console.log('='.repeat(60));

  // Analyze the logs
  console.log('\n🔍 ANALYSIS:');
  const handleNextCalled = consoleLogs.some(l => l.includes('handleNext() called'));
  const buttonClicked = consoleLogs.some(l => l.includes('Next button clicked'));
  const stepSet = consoleLogs.some(l => l.includes('Setting currentStepIndex'));

  console.log(`   handleNext() was called: ${handleNextCalled ? '✓' : '❌'}`);
  console.log(`   Button click was logged: ${buttonClicked ? '✓' : '❌'}`);
  console.log(`   setCurrentStepIndex() was called: ${stepSet ? '✓' : '❌'}`);

  if (!buttonClicked) {
    console.log(`\n⚠️ FINDING: Button click handler NOT firing at all!`);
  }
  if (buttonClicked && !handleNextCalled) {
    console.log(`\n⚠️ FINDING: Button clicked but handleNext() not called!`);
  }
  if (handleNextCalled && !stepSet) {
    console.log(`\n⚠️ FINDING: handleNext() called but state not being set!`);
  }
});
