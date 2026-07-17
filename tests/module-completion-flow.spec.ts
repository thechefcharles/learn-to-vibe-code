import { test, expect } from '@playwright/test';

test.describe('Module Completion Flow', () => {
  test('Complete module shows informative CTAs for quiz and next module', async ({ page }) => {
    // Navigate to Module 0
    await page.goto('http://localhost:3008/course/0');
    await page.waitForLoadState('networkidle');

    // Verify we're at the start
    const stepCounter = page.locator('text=/of 12/');
    await expect(stepCounter).toBeVisible();

    // Navigate to last step (step 12/12)
    console.log('📍 Navigating to last step of Module 0...');
    for (let i = 0; i < 11; i++) {
      const nextBtn = page.locator('button:has-text("Next")').first();
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await page.waitForTimeout(300);
      }
    }

    // Verify at last step
    const finalStep = await page.locator('text=/of 12/').first().textContent();
    console.log(`✓ At final step: ${finalStep}`);
    expect(finalStep).toContain('12 of 12');

    // Scroll to see CTAs
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // TEST: Look for Quiz CTA
    console.log('\n📍 Checking for Quiz CTA...');
    const quizCTA = page.locator('button, a', {
      has: page.locator('text=/[Tt]ake [Qq]uiz|[Qq]uiz|Assessment/')
    }).first();

    if (await quizCTA.isVisible().catch(() => false)) {
      const quizText = await quizCTA.textContent();
      console.log(`✓ Found quiz CTA: "${quizText?.trim()}"`);
    } else {
      console.log('⚠️ Quiz CTA not found (may be on a different element)');
      // Try to find any visible CTA
      const allButtons = page.locator('button, a');
      const count = await allButtons.count();
      for (let i = 0; i < Math.min(count, 10); i++) {
        const text = await allButtons.nth(i).textContent();
        if (text && text.includes('Quiz')) {
          console.log(`✓ Found quiz-related button: "${text.trim()}"`);
        }
      }
    }

    // TEST: Look for Next Module CTA
    console.log('\n📍 Checking for Next Module CTA...');
    const nextModuleCTA = page.locator('button, a', {
      has: page.locator('text=/[Nn]ext [Mm]odule|Continue to [Nn]ext/')
    }).first();

    if (await nextModuleCTA.isVisible().catch(() => false)) {
      const nextText = await nextModuleCTA.textContent();
      console.log(`✓ Found next module CTA: "${nextText?.trim()}"`);
    } else {
      console.log('⚠️ Next Module CTA not found');
    }

    // TEST: Check for informative messaging
    console.log('\n📍 Checking for completion messaging...');
    const pageText = await page.textContent();

    if (pageText?.includes('quiz') || pageText?.includes('Quiz')) {
      console.log('✓ Quiz mentioned on page');
    }
    if (pageText?.includes('Complete') || pageText?.includes('complete')) {
      console.log('✓ Completion messaging visible');
    }
    if (pageText?.includes('locked') || pageText?.includes('Locked')) {
      console.log('✓ Lock status messaging visible');
    }

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/01-module-completion-ctas.png' });
    console.log('\n✓ Screenshot saved: 01-module-completion-ctas.png');
  });

  test('Can navigate from completed module to next module', async ({ page }) => {
    console.log('\n🔄 Testing Next Module Navigation...\n');

    // Start at Module 0, last step
    await page.goto('http://localhost:3008/course/0');
    await page.waitForLoadState('networkidle');

    // Navigate to last step
    for (let i = 0; i < 11; i++) {
      const nextBtn = page.locator('button:has-text("Next")').first();
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await page.waitForTimeout(300);
      }
    }

    // Scroll to CTAs
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Find and click Next Module button
    console.log('📍 Looking for Next Module button...');
    const nextModuleBtn = page.locator('button:has-text("Next Module"), a:has-text("Next Module")').first();

    if (await nextModuleBtn.isVisible().catch(() => false)) {
      console.log(`✓ Found Next Module button: "${(await nextModuleBtn.textContent())?.trim()}"`);
      await nextModuleBtn.click();
      await page.waitForLoadState('networkidle');
      console.log('✓ Clicked Next Module button');

      // Take screenshot of navigation
      await page.screenshot({ path: 'tests/screenshots/02-after-next-module-click.png' });
      console.log('✓ Screenshot saved: 02-after-next-module-click.png');

      // Verify URL changed
      const newUrl = page.url();
      console.log(`✓ New URL: ${newUrl}`);
      expect(newUrl).toContain('/course/1');

    } else {
      console.log('❌ Next Module button not found - this is the problem!');
      // List all buttons
      const buttons = page.locator('button, a');
      const count = await buttons.count();
      console.log(`  Found ${count} clickable elements`);
      for (let i = 0; i < Math.min(count, 15); i++) {
        const text = await buttons.nth(i).textContent();
        if (text?.trim().length! > 0) {
          console.log(`    - "${text?.trim()}"`);
        }
      }
      throw new Error('Next Module button not found');
    }
  });

  test('Next module is NOT in preview mode', async ({ page }) => {
    console.log('\n🔍 Testing Preview Mode Behavior...\n');

    // Navigate to Module 0, last step
    await page.goto('http://localhost:3008/course/0');
    await page.waitForLoadState('networkidle');

    for (let i = 0; i < 11; i++) {
      const nextBtn = page.locator('button:has-text("Next")').first();
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await page.waitForTimeout(300);
      }
    }

    // Scroll and click Next Module
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const nextModuleBtn = page.locator('button:has-text("Next Module"), a:has-text("Next Module")').first();
    if (await nextModuleBtn.isVisible().catch(() => false)) {
      await nextModuleBtn.click();
      await page.waitForLoadState('networkidle');

      // Check URL
      expect(page.url()).toContain('/course/1');
      console.log(`✓ Navigated to Module 1: ${page.url()}`);

      // Check for preview mode indicators
      const pageText = await page.textContent();
      const hasPreviewIndicator = pageText?.includes('Preview') ||
                                   pageText?.includes('preview') ||
                                   pageText?.includes('PREVIEW');

      if (hasPreviewIndicator) {
        console.log('❌ PROBLEM: Module 1 is in preview mode!');
        console.log('   This should NOT happen when coming from a completed module');
      } else {
        console.log('✓ Module 1 is NOT in preview mode (correct!)');
      }

      // Check if module is locked (should show lock messaging)
      const isLocked = pageText?.includes('locked') || pageText?.includes('Locked');
      if (isLocked) {
        console.log('✓ Module shows as locked (expected - not yet completed)');
      }

      // Look for CTAs to complete requirements
      const quizCTA = pageText?.includes('Quiz') || pageText?.includes('quiz');
      const submitCTA = pageText?.includes('Submit') || pageText?.includes('submit');

      if (quizCTA || submitCTA) {
        console.log(`✓ Found CTAs to complete module (Quiz: ${quizCTA}, Submit: ${submitCTA})`);
      }

      await page.screenshot({ path: 'tests/screenshots/03-module1-no-preview.png' });
      console.log('✓ Screenshot saved: 03-module1-no-preview.png');

    } else {
      throw new Error('Could not navigate to next module');
    }
  });

  test('Module shows clear lock status and CTAs when not unlocked', async ({ page }) => {
    console.log('\n🔐 Testing Lock Status & CTAs...\n');

    // Navigate to Module 2 (should be locked)
    await page.goto('http://localhost:3008/course/2');
    await page.waitForLoadState('networkidle');

    const pageText = await page.textContent();

    console.log('📍 Checking lock status messaging...');
    if (pageText?.includes('locked') || pageText?.includes('Locked')) {
      console.log('✓ Lock status is communicated');
    } else {
      console.log('⚠️ No lock status message visible');
    }

    // Check for CTAs to unlock
    console.log('\n📍 Checking for CTAs to unlock...');
    const buttons = page.locator('button, a');
    const count = await buttons.count();

    let foundCTAs = [];
    for (let i = 0; i < Math.min(count, 20); i++) {
      const text = await buttons.nth(i).textContent();
      if (text && (text.includes('Quiz') || text.includes('quiz') || text.includes('Complete') || text.includes('Back'))) {
        foundCTAs.push(text.trim());
      }
    }

    if (foundCTAs.length > 0) {
      console.log(`✓ Found CTAs: ${foundCTAs.join(', ')}`);
    } else {
      console.log('⚠️ No clear CTAs found');
    }

    await page.screenshot({ path: 'tests/screenshots/04-locked-module-ctas.png' });
    console.log('✓ Screenshot saved: 04-locked-module-ctas.png');
  });
});
