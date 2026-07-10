import { test, expect } from '@playwright/test';

test.describe('Multi-section lessons', () => {
  test('view all sections, get reward', async ({ page }) => {
    // Navigate to Module 0
    await page.goto('/course/0');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Scroll to Lesson 9 (Free Tiers & Costs) and click
    const lessonButton = page.locator('button:has-text("Free Tiers & Costs")').first();
    await lessonButton.scrollIntoViewIfNeeded();
    await lessonButton.click();

    // Verify Section 1 of 3 is shown
    await expect(page.locator('text=Section 1 of 3')).toBeVisible();
    await expect(page.locator("text=What's Free")).toBeVisible();

    // Click Next → Section 2
    await page.click('button:has-text("Next →")');
    await expect(page.locator('text=Section 2 of 3')).toBeVisible();
    await expect(page.locator('text=You Can Complete This Course Free')).toBeVisible();

    // Click Next → Section 3
    await page.click('button:has-text("Next →")');
    await expect(page.locator('text=Section 3 of 3')).toBeVisible();
    await expect(page.locator('text=Avoid Surprise Bills')).toBeVisible();

    // Verify "Lesson Complete!" button is enabled
    await expect(page.locator('button:has-text("Lesson Complete! 🎉")')).toBeEnabled();

    // Verify completion reward toast appears
    await expect(page.locator('text=🎉 Lesson Complete!')).toBeVisible();
    await expect(page.locator('text=+50 XP')).toBeVisible();

    // Verify localStorage has all sections marked as viewed
    const progress = await page.evaluate(
      () => JSON.parse(localStorage.getItem('lesson-0-9-sections') || '{}')
    );
    expect(progress.viewedSections).toEqual([0, 1, 2]);
    expect(progress.completed).toBe(true);
  });

  test('skip ahead allowed, must view all for completion', async ({ page }) => {
    // Navigate to Module 0, Lesson 9
    await page.goto('/course/0');
    await page.waitForLoadState('networkidle');

    const lessonButton = page.locator('button:has-text("Free Tiers & Costs")').first();
    await lessonButton.scrollIntoViewIfNeeded();
    await lessonButton.click();

    // On Section 1, click Next twice to jump to Section 3
    await page.click('button:has-text("Next →")');
    await page.click('button:has-text("Next →")');
    await expect(page.locator('text=Section 3 of 3')).toBeVisible();

    // Verify "Lesson Complete!" button is disabled (Section 1 not viewed)
    const completeBtn = page.locator('button:has-text("Lesson Complete! 🎉")');
    await expect(completeBtn).toBeDisabled();

    // Go back to Section 1
    await page.click('button:has-text("← Back")');
    await page.click('button:has-text("← Back")');
    await expect(page.locator('text=Section 1 of 3')).toBeVisible();

    // Go forward through all sections
    await page.click('button:has-text("Next →")');
    await page.click('button:has-text("Next →")');

    // Now button should be enabled
    await expect(completeBtn).toBeEnabled();
    await expect(page.locator('text=🎉 Lesson Complete!')).toBeVisible();
  });
});
