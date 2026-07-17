import { test, expect } from '@playwright/test';

test('Debug Step 10 - Full Component Lifecycle Trace', async ({ page }) => {
  console.log('\n🔧 STEP 3 & 4: Component Rendering + SectionLessonViewer Wiring\n');

  // Capture console messages
  const consoleLogs: string[] = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    if (text.includes('🎬') || text.includes('📖') || text.includes('🔄') || text.includes('🎯') || text.includes('🎉')) {
      console.log(`   Console: ${text}`);
    }
  });

  // Load Module 0
  await page.goto('http://localhost:3008/course/0');
  await page.waitForLoadState('networkidle');

  // Navigate to step 9
  console.log('\n📍 Navigating to Step 9 (the step before the issue)...');
  for (let i = 0; i < 8; i++) {
    const nextBtn = page.locator('button:has-text("Next")').first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
    }
  }

  let currentStepText = await page.locator('text=/of 12/').first().textContent();
  console.log(`✓ Current step: ${currentStepText}`);

  // Clear old logs before transition
  consoleLogs.length = 0;

  // Click to go from step 9 to step 10
  console.log('\n🎯 CRITICAL TEST: Clicking Next to transition from Step 9 → Step 10');
  console.log('Expected logs:');
  console.log('  1. 🖱️ Next button clicked!');
  console.log('  2. 🔵 handleNext() called');
  console.log('  3. 📍 Setting currentStepIndex from 8 to 9');
  console.log('  4. 🔄 [RENDER] StepLessonViewer re-rendered');
  console.log('  5. 📊 [STEP 10 RENDER] (because currentStepIndex === 9)');
  console.log('  6. 🎯 [CONDITIONAL RENDER] Rendering SectionLessonViewer');
  console.log('  7. 🎬 [SECTIONLESSONVIEWER MOUNT]');
  console.log('  8. 📖 [SECTIONLESSONVIEWER EFFECT 1] Loading progress');
  console.log('  9. 📖 [SECTIONLESSONVIEWER EFFECT 2] Marking section viewed');
  console.log(' 10. 📖 [SECTIONLESSONVIEWER EFFECT 3] Checking completion\n');

  const nextBtn = page.locator('button:has-text("Next")').first();
  await nextBtn.click();

  // Wait for component to potentially mount
  await page.waitForTimeout(2000);

  // Analyze logs
  console.log('\n📜 ACTUAL LOGS RECEIVED:');
  console.log('='.repeat(80));
  const importantLogs = consoleLogs.filter(l =>
    l.includes('🖱️') || l.includes('🔵') || l.includes('📍') || l.includes('🔄') ||
    l.includes('📊') || l.includes('🎯') || l.includes('🎬') || l.includes('📖') ||
    l.includes('⏭️')
  );
  importantLogs.forEach((log, i) => {
    console.log(`${i + 1}. ${log}`);
  });
  console.log('='.repeat(80));

  // Check if we reached step 10
  const stepAfterClick = await page.locator('text=/of 12/').first().textContent();
  console.log(`\n📊 Step counter after click: ${stepAfterClick}`);

  if (stepAfterClick === currentStepText) {
    console.log(`❌ FAILED: Step did not change! Still at ${currentStepText}`);
  } else {
    console.log(`✓ SUCCESS: Step changed from ${currentStepText} to ${stepAfterClick}`);
  }

  // Verify specific log sequences
  console.log('\n🔍 ANALYSIS:');
  const logs = consoleLogs;
  const buttonClicked = logs.some(l => l.includes('🖱️ Next button clicked'));
  const handleNextCalled = logs.some(l => l.includes('🔵 handleNext()'));
  const stateSet = logs.some(l => l.includes('📍 Setting currentStepIndex'));
  const renderLogged = logs.some(l => l.includes('🔄 [RENDER]'));
  const conditionalRender = logs.some(l => l.includes('🎯 [CONDITIONAL RENDER]'));
  const sectionMounted = logs.some(l => l.includes('🎬 [SECTIONLESSONVIEWER MOUNT]'));
  const effect1 = logs.some(l => l.includes('📖 [SECTIONLESSONVIEWER EFFECT 1]'));
  const effect2 = logs.some(l => l.includes('📖 [SECTIONLESSONVIEWER EFFECT 2]'));
  const effect3 = logs.some(l => l.includes('📖 [SECTIONLESSONVIEWER EFFECT 3]'));

  console.log(`✓ Button clicked: ${buttonClicked ? '✓' : '❌'}`);
  console.log(`✓ handleNext() called: ${handleNextCalled ? '✓' : '❌'}`);
  console.log(`✓ State set: ${stateSet ? '✓' : '❌'}`);
  console.log(`✓ Component re-rendered: ${renderLogged ? '✓' : '❌'}`);
  console.log(`✓ Conditional render triggered: ${conditionalRender ? '✓' : '❌'}`);
  console.log(`✓ SectionLessonViewer mounted: ${sectionMounted ? '✓' : '❌'}`);
  console.log(`✓ Effect 1 (localStorage load): ${effect1 ? '✓' : '❌'}`);
  console.log(`✓ Effect 2 (mark section): ${effect2 ? '✓' : '❌'}`);
  console.log(`✓ Effect 3 (completion check): ${effect3 ? '✓' : '❌'}`);

  console.log('\n🎯 KEY FINDING:');
  if (!sectionMounted) {
    console.log('❌ SectionLessonViewer DID NOT MOUNT');
    console.log('   Root cause: Either conditional render not firing OR component failing to initialize');
  } else if (!effect1) {
    console.log('❌ SectionLessonViewer mounted but useEffect 1 not running');
    console.log('   Root cause: useEffect possibly blocked or dependency array issue');
  } else {
    console.log('✓ SectionLessonViewer and all effects firing correctly');
    console.log('   Issue must be elsewhere (parent state update, re-render loop, etc)');
  }

  // Take screenshot
  await page.screenshot({ path: 'tests/screenshots/debug-step10-detailed.png' });
});
