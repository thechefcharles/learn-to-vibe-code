import { test, expect } from '@playwright/test';

// Scope assertions to the main lesson card ([data-step-container]) rather than
// the whole page. The sidebar (ModuleSidebar) also lists every section heading
// for the active lesson (display-only, see StepLessonViewer.tsx), and each
// section's markdown `content` repeats its own heading as a leading `## ...`
// line, so unscoped `text=` locators match multiple elements and trip
// Playwright's strict mode.
test.describe('Multi-section lessons', () => {
  test('view all sections, get reward', async ({ page }) => {
    // Navigate to Module 0
    await page.goto('/course/0');
    await page.waitForLoadState('networkidle');

    // Scroll to Lesson 9 (Free Tiers & Costs) and click
    const lessonButton = page.locator('button:has-text("Free Tiers & Costs")').first();
    await lessonButton.scrollIntoViewIfNeeded();
    await lessonButton.click();

    const card = page.locator('[data-step-container]');

    // Verify Section 1 of 3 is shown
    await expect(card.getByText('Section 1 of 3')).toBeVisible();
    await expect(card.getByText("What's Free").first()).toBeVisible();

    // Click Next → Section 2
    await page.click('button:has-text("Next →")');
    await expect(card.getByText('Section 2 of 3')).toBeVisible();
    await expect(card.getByText('You Can Complete This Course Free').first()).toBeVisible();

    // Click Next → Section 3
    await page.click('button:has-text("Next →")');
    await expect(card.getByText('Section 3 of 3')).toBeVisible();
    await expect(card.getByText('Avoid Surprise Bills').first()).toBeVisible();

    // Verify "Lesson Complete!" button is enabled
    await expect(page.locator('button:has-text("Lesson Complete! 🎉")')).toBeEnabled();

    // Verify completion reward toast appears. Scoped to the toast container
    // itself (`.fixed.bottom-8.right-8` from LessonCompletionReward.tsx)
    // because the lesson metadata bar above also renders an XP badge with
    // identical "+50 XP" text.
    const rewardToast = page.locator('.fixed.bottom-8.right-8');
    await expect(rewardToast.getByText('🎉 Lesson Complete!')).toBeVisible();
    await expect(rewardToast.getByText('+50 XP')).toBeVisible();

    // Verify localStorage has all sections marked as viewed
    const progress = await page.evaluate(
      () => JSON.parse(localStorage.getItem('lesson-0-9-sections') || '{}')
    );
    expect(progress.viewedSections).toEqual([0, 1, 2]);
    expect(progress.completed).toBe(true);
  });

  // NOTE: The current SectionLessonViewer only exposes single-step Back/Next
  // navigation (ModuleSidebar's per-section jump buttons render but aren't
  // wired to a handler — see the MVP note in StepLessonViewer.tsx). Clicking
  // "Next →" twice therefore walks through section 2 on the way to section 3
  // rather than skipping it, so every section is already marked viewed by the
  // time you first reach the end. To exercise the completion gate
  // (`allSectionsViewed`) for real we seed localStorage to simulate a learner
  // who returns having viewed sections 1 and 3 but not section 2, then
  // confirm completion unlocks only after visiting the missing section.
  test('completion is gated until every section has been viewed', async ({ page }) => {
    await page.goto('/course/0');
    await page.waitForLoadState('networkidle');

    const lessonButton = page.locator('button:has-text("Free Tiers & Costs")').first();
    await lessonButton.scrollIntoViewIfNeeded();
    await lessonButton.click();

    const card = page.locator('[data-step-container]');
    await expect(card.getByText('Section 1 of 3')).toBeVisible();

    // Simulate sections 0 and 2 viewed, section 1 never viewed, landing on
    // the last section (mirrors a learner resuming a prior session).
    await page.evaluate(() => {
      localStorage.setItem(
        'lesson-0-9-sections',
        JSON.stringify({
          moduleId: 0,
          lessonId: 9,
          totalSections: 3,
          viewedSections: [0, 2],
          lastViewedSection: 2,
          completed: false,
          rewardClaimed: false,
          updatedAt: Date.now(),
        })
      );
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(card.getByText('Section 3 of 3')).toBeVisible();

    // Section 2 (index 1) was never viewed, so completion stays gated
    const completeBtn = page.locator('button:has-text("Lesson Complete! 🎉")');
    await expect(completeBtn).toBeDisabled();

    // Visit the missing section
    await page.click('button:has-text("← Back")');
    await expect(card.getByText('Section 2 of 3')).toBeVisible();

    // All 3 sections are now viewed - reward fires immediately
    const rewardToast = page.locator('.fixed.bottom-8.right-8');
    await expect(rewardToast.getByText('🎉 Lesson Complete!')).toBeVisible();
    await expect(rewardToast.getByText('+50 XP')).toBeVisible();

    // Returning to the last section, the completion button is now enabled
    await page.click('button:has-text("Next →")');
    await expect(completeBtn).toBeEnabled();

    const progress = await page.evaluate(
      () => JSON.parse(localStorage.getItem('lesson-0-9-sections') || '{}')
    );
    expect(progress.completed).toBe(true);
  });
});
