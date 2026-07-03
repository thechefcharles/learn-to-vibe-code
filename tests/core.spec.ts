import { test, expect } from "@playwright/test";

test.describe("Learn to Vibe Code - Core Platform", () => {
  test("should load home page and redirect unauthenticated to sign in", async ({
    page,
  }) => {
    await page.goto("/");
    // Should be redirected or show sign in option
    await expect(page).toHaveURL(/\/(auth|course)/);
  });

  test("should sign up new user", async ({ page }) => {
    await page.goto("/auth/sign-up");

    // Fill form
    await page.fill('input[placeholder="John Doe"]', "Test User");
    await page.fill('input[placeholder="your@email.com"]', `test${Date.now()}@example.com`);
    await page.fill('input[placeholder="••••••••"]', "TestPassword123!");

    // Submit
    await page.click("button:has-text('Sign Up')");

    // Should see success message and redirect
    await expect(page).toHaveURL(/\/auth\/sign-in/);
  });

  test("should view course map when authenticated", async ({ page, context }) => {
    // Set up authenticated session
    await context.addCookies([
      {
        name: "sb-auth-token",
        value: "test-token",
        domain: "localhost",
        path: "/",
      },
    ]);

    await page.goto("/course");

    // Should see course modules
    await expect(page.locator("text=Setup & Accounts")).toBeVisible();
    await expect(page.locator("text=AI Fundamentals")).toBeVisible();

    // Module 0 should be accessible
    const module0 = page.locator('a[href="/course/0"]');
    await expect(module0).toBeVisible();
  });

  test("should view lesson content", async ({ page }) => {
    await page.goto("/course/0");

    // Should see lesson content
    await expect(page.locator("h1")).toContainText("Setup & Accounts");
    await expect(page.locator("text=Learning objectives")).toBeVisible();

    // Should have navigation back to course
    await expect(page.locator("text=Back to Course")).toBeVisible();
  });

  test("should have quiz page accessible", async ({ page }) => {
    await page.goto("/course/0/quiz");

    // Should see quiz questions
    await expect(page.locator("text=Question 1")).toBeVisible();
    await expect(page.locator("text=In the stack, what is Vercel's job?")).toBeVisible();

    // Should have answer options
    const radioButtons = page.locator('input[type="radio"]');
    await expect(radioButtons).toHaveCount(12); // 3 questions × 4 options
  });

  test("should have deliverable submission page", async ({ page }) => {
    await page.goto("/course/0/submit");

    // Should see form
    await expect(page.locator("text=GitHub Repository URL")).toBeVisible();
    await expect(page.locator("text=Live URL")).toBeVisible();

    // Should have submit button
    await expect(page.locator("button:has-text('Submit Deliverable')")).toBeVisible();
  });

  test("should display checklist on lesson page", async ({ page }) => {
    await page.goto("/course/0");

    // Should see checklist
    await expect(page.locator("text=Module Checklist")).toBeVisible();
    await expect(page.locator("text=Watched the lesson")).toBeVisible();
    await expect(page.locator("text=Completed the hands-on exercise")).toBeVisible();
  });

  test("should validate URLs in deliverable submission", async ({ page }) => {
    await page.goto("/course/0/submit");

    // Try submitting invalid URLs
    await page.fill(
      'input[placeholder*="github.com"]',
      "not-a-valid-url"
    );
    await page.fill(
      'input[placeholder*="vercel.app"]',
      "also-not-valid"
    );

    await page.click("button:has-text('Submit Deliverable')");

    // Should show error
    await expect(page.locator("text=Invalid")).toBeVisible();
  });

  test("should enforce unlock gates - Module 1 should be locked", async ({
    page,
  }) => {
    await page.goto("/course");

    // Module 1 should show as locked
    const module1 = page.locator('a[href="/course/1"]');

    // Try to navigate to locked module
    await page.goto("/course/1");

    // Should be redirected to course map
    await expect(page).toHaveURL("/course");
  });

  test("page layout should be responsive", async ({ page }) => {
    await page.goto("/course/0");

    // Check that main content is visible
    await expect(page.locator("h1")).toBeVisible();

    // Check that navigation is present
    await expect(page.locator("text=Back to Course")).toBeVisible();

    // Content should not overflow horizontally
    const body = page.locator("body");
    const bodyBox = await body.boundingBox();
    const viewportSize = page.viewportSize();

    if (bodyBox && viewportSize) {
      expect(bodyBox.width).toBeLessThanOrEqual(viewportSize.width + 100); // Allow small margin
    }
  });
});
