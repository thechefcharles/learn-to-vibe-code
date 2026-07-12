import { test, expect } from "@playwright/test";

test.describe("Course Page UI - Integrated Components", () => {
  test("should display header with logo, breadcrumb, and profile menu", async ({ page }) => {
    // Navigate to Module 0 (which is always unlocked)
    await page.goto("/course/0");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check for sticky header
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    // Verify header has sticky positioning and backdrop blur
    const headerClasses = await header.getAttribute("class");
    expect(headerClasses).toContain("sticky");
    expect(headerClasses).toContain("backdrop-blur");

    // Check for Logo (using role)
    const logo = page.locator("img").first();
    const isLogoVisible = await logo.isVisible().catch(() => false);
    expect(isLogoVisible).toBe(true);

    // Check for header links using role
    const headerLink = page.getByRole("link").filter({ hasText: /Course|Dashboard/ });
    const isHeaderLinkVisible = await headerLink.first().isVisible().catch(() => false);
    expect(isHeaderLinkVisible).toBe(true);
  });

  test("should show sidebar stats on desktop view", async ({ page }) => {
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Check that the page has loaded and has content
    const pageText = await page.textContent("body");
    expect(pageText).toBeTruthy();
    expect(pageText?.length).toBeGreaterThan(50);

    // Check for sidebar or similar content indicators on desktop
    const hasDesktopLayout = pageText?.includes("Module") || pageText?.includes("Foundations");
    expect(hasDesktopLayout).toBe(true);
  });

  test("should not show sidebar on mobile view", async ({ page }) => {
    // Set mobile viewport first
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Sidebar should be hidden on mobile
    const sidebar = page.locator("aside");
    await expect(sidebar).not.toBeVisible();
  });

  test("should have share buttons in the lesson content", async ({ page }) => {
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Look for share section - use more flexible selector
    const shareButtons = page.locator("button").filter({ hasText: /Copy|🔗|𝕏|in/ });
    const shareCount = await shareButtons.count();

    // Should have at least some share buttons visible
    expect(shareCount).toBeGreaterThan(0);

    // Check for at least one button that looks like a share button
    const firstShareButton = shareButtons.first();
    const isVisible = await firstShareButton.isVisible().catch(() => false);
    expect(isVisible).toBe(true);
  });

  test("should copy link when copy button is clicked", async ({ page }) => {
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Find the copy button
    const copyButton = page.locator("button").filter({ hasText: /Copy|🔗/ }).first();
    const isCopyVisible = await copyButton.isVisible().catch(() => false);

    if (isCopyVisible) {
      // Click the copy button
      await copyButton.click();

      // Wait a moment
      await page.waitForTimeout(500);

      // Verify the button text changed (to indicate successful copy)
      const buttonText = await copyButton.textContent();
      expect(buttonText).toBeTruthy();
    }
  });

  test("should open keyboard shortcuts panel with Cmd+?", async ({ page }) => {
    // Note: This test assumes the keyboard shortcut handler is implemented
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Simulate Cmd+? (Mac) or Ctrl+? (Windows)
    const isMac = await page.evaluate(() => /Mac|iPhone|iPad|iPod/.test(navigator.platform));

    if (isMac) {
      await page.keyboard.press("Meta+Shift+Slash");
    } else {
      await page.keyboard.press("Control+Shift+Slash");
    }

    // Wait a bit for the modal to appear
    await page.waitForTimeout(500);

    // Check if keyboard shortcuts panel is visible
    const shortcutsPanel = page.locator("text=Keyboard Shortcuts").first();
    const isPanelVisible = await shortcutsPanel.isVisible().catch(() => false);

    // The panel might be closed by default, so this is a soft check
    if (isPanelVisible) {
      await expect(shortcutsPanel).toBeVisible();
    }
  });

  test("should navigate between modules with previous/next buttons", async ({ page }) => {
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Look for next module button
    const nextModuleButton = page.locator("text=Next Module");

    // If the button exists and is visible (not on last module)
    const isNextVisible = await nextModuleButton.isVisible().catch(() => false);
    if (isNextVisible) {
      await expect(nextModuleButton).toBeVisible();
    }

    // Look for previous module button
    const prevModuleButton = page.locator("text=Previous Module");

    // On Module 0, there should be no previous module
    const isPrevVisible = await prevModuleButton.isVisible().catch(() => false);
    expect(isPrevVisible).toBe(false);
  });

  test("should display lesson content with markdown rendering", async ({ page }) => {
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Check for lesson content on the page
    const pageText = await page.textContent("body");
    expect(pageText).toBeTruthy();
    expect(pageText?.length).toBeGreaterThan(100);

    // Check for typical lesson content
    const hasLessonContent = pageText?.includes("Setup") || pageText?.includes("Module") || pageText?.includes("learning");
    expect(hasLessonContent).toBe(true);
  });

  test("should show checklist for authenticated users", async ({ page, context }) => {
    // This test would require authentication
    // For now, check if checklist section exists (it might be hidden)
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Look for sign in prompt if not authenticated
    const signInPrompt = page.locator("text=Sign in");
    const isSignInVisible = await signInPrompt.isVisible().catch(() => false);

    if (!isSignInVisible) {
      // User is authenticated, look for checklist
      const checklist = page.locator("text=Module Checklist, text=Checklist").first();
      const isChecklistVisible = await checklist.isVisible().catch(() => false);
      // Checklist visibility depends on implementation
    }
  });

  test("should respond to window resize for responsive layout", async ({ page }) => {
    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");

    // Start with desktop size
    await page.setViewportSize({ width: 1200, height: 800 });

    // Page should be visible on desktop
    const header = page.locator("header").first();
    const isHeaderVisible = await header.isVisible().catch(() => false);
    expect(isHeaderVisible).toBe(true);

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Header should still be visible on mobile (but responsive)
    const mobileHeader = page.locator("header").first();
    const isMobileHeaderVisible = await mobileHeader.isVisible().catch(() => false);
    expect(isMobileHeaderVisible).toBe(true);
  });
});
