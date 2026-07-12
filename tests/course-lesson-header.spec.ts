import { test, expect } from "@playwright/test";

test.describe("CourseLessonHeader Component", () => {
  test("should render header with logo, breadcrumb, and title on course lesson page", async ({ page }) => {
    // Navigate to Module 0 (which is always unlocked)
    await page.goto("/course/0");

    // Verify the page title is correct
    await expect(page).toHaveTitle(/Learn to Vibe Code/);

    // Check for sticky header with cosmic glass-morphism design
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    // Verify header has the correct styling (from cosmic design system)
    const headerClasses = await header.getAttribute("class");
    expect(headerClasses).toContain("sticky");
    expect(headerClasses).toContain("backdrop-blur-lg");

    // Check for Logo (LV mark)
    const logo = page.locator("img").filter({ alt: /Vibe Code cosmic mark/ });
    await expect(logo).toBeVisible();

    // Check for breadcrumb (desktop view) - first one is in the header
    const breadcrumb = page.locator("header").first().locator("text=Course");
    await expect(breadcrumb).toBeVisible();

    // Check that breadcrumb contains module reference (in header) - "Module 00" specifically
    const moduleBreadcrumb = page.locator("header").first().locator("text=Module 00");
    await expect(moduleBreadcrumb).toBeVisible();

    // Check for hamburger menu (should not be visible on desktop)
    const mobileMenuButton = page.locator("button[aria-label='Toggle menu']");

    // Get the viewport width to determine if we're on mobile
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 768) {
      // Mobile view - menu button should be visible
      await expect(mobileMenuButton).toBeVisible();
    } else {
      // Desktop view - menu button should be hidden
      await expect(mobileMenuButton).not.toBeVisible();
    }

    // Verify lesson title is rendered in the page (in mobile breadcrumb)
    const pageTitle = page.locator("h1");
    if (pageTitle) {
      await expect(pageTitle.first()).toBeVisible();
    }
  });

  test("should show mobile breadcrumb on small screens", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to Module 0
    await page.goto("/course/0");

    // Mobile breadcrumb should be visible
    const mobileBreadcrumb = page.locator(".md\\:hidden").locator("text=Course");
    await expect(mobileBreadcrumb).toBeVisible();

    // Mobile menu button should be visible
    const mobileMenuButton = page.locator("button[aria-label='Toggle menu']");
    await expect(mobileMenuButton).toBeVisible();
  });

  test("should toggle mobile menu when button is clicked", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to Module 0
    await page.goto("/course/0");

    // Mobile menu button should be visible
    const mobileMenuButton = page.locator("button[aria-label='Toggle menu']");
    await expect(mobileMenuButton).toBeVisible();

    // Click the menu button
    await mobileMenuButton.click();

    // Mobile menu should appear (look for Theme or Profile text in dropdown)
    // The menu dropdown contains Theme switcher and profile info
    const mobileMenu = page.locator("text=Theme").or(page.locator("text=Profile"));
    await expect(mobileMenu.first()).toBeVisible({ timeout: 2000 });
  });

  test("should render correct module number in breadcrumb", async ({ page }) => {
    // Navigate to Module 0
    await page.goto("/course/0");

    // Check for "Module 00" format
    const moduleRef = page.locator("text=Module 00").or(page.locator("text=Module 0"));
    await expect(moduleRef.first()).toBeVisible();
  });
});
