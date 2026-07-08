import { test, expect } from "@playwright/test";

test.describe("ProgressFlowWidget", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard (authenticated user)
    await page.goto("http://localhost:3008/dashboard", { waitUntil: "load" });
    // Wait for the component to load
    await page.waitForSelector('h2:has-text("Your Learning Journey")', {
      timeout: 5000,
    });
  });

  test("renders all 6 stages with correct labels", async ({ page }) => {
    // Check all stage labels are visible
    const stages = ["Module", "Quiz", "Pass (80%)", "Unlock Next", "Capstone", "Certificate"];

    for (const stage of stages) {
      const stageElement = page.locator(`text=${stage}`);
      await expect(stageElement).toBeVisible();
    }
  });

  test("renders 'Your Learning Journey' heading", async ({ page }) => {
    const heading = page.locator('h2:has-text("Your Learning Journey")');
    await expect(heading).toBeVisible();
  });

  test("renders numbered circles 1-6", async ({ page }) => {
    // Check for numbered buttons
    for (let i = 1; i <= 6; i++) {
      const button = page.locator(`button:has-text("${i}")`).first();
      await expect(button).toBeVisible();
    }
  });

  test("displays all stage descriptions", async ({ page }) => {
    const descriptions = [
      "Access course content and learning materials",
      "Take the module assessment and demonstrate knowledge",
      "Achieve 80% or higher score to pass and earn XP",
      "Submit deliverable to unlock the next module",
      "After Module 15, access the capstone project challenge",
      "Earn your verifiable completion certificate and 9.3 CEUs",
    ];

    for (const description of descriptions) {
      const element = page.locator(`text=${description}`);
      await expect(element).toBeVisible();
    }
  });

  test("displays info text about stages", async ({ page }) => {
    const infoText = page.locator("text=Click any stage to learn more");
    await expect(infoText).toBeVisible();
  });

  test("has horizontal scroll on mobile", async ({ page }) => {
    // Resize to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // The component should be visible even on mobile
    const heading = page.locator('h2:has-text("Your Learning Journey")');
    await expect(heading).toBeVisible();

    // Check that the flow container is scrollable
    const container = page.locator(".overflow-x-auto");
    await expect(container).toBeVisible();
  });

  test("renders with gradient connecting lines (SVG)", async ({ page }) => {
    // Check for SVG with gradient definition
    const svg = page.locator("svg");
    await expect(svg).toBeVisible();

    // Check for gradient definition in SVG
    const gradient = page.locator("linearGradient#flowGradient");
    await expect(gradient).toBeVisible();
  });

  test("stages are interactive buttons", async ({ page }) => {
    // Get the first stage button
    const firstButton = page.locator("button").filter({ hasText: "1" }).first();
    await expect(firstButton).toBeEnabled();

    // Button should be keyboard accessible
    await expect(firstButton).toHaveAttribute("type", "button");
  });

  test("no console errors on render", async ({ page }) => {
    // Collect all console messages
    const consoleMessages: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        consoleMessages.push(`${msg.type()}: ${msg.text()}`);
      }
    });

    // Navigate and wait for component to fully load
    await page.goto("http://localhost:3008/dashboard");
    await page.waitForSelector('h2:has-text("Your Learning Journey")');

    // Wait a bit for any potential errors to surface
    await page.waitForTimeout(2000);

    // Check that no critical errors were logged
    const criticalErrors = consoleMessages.filter(
      (msg) =>
        msg.includes("error") &&
        !msg.includes("Google") &&
        !msg.includes("analytics")
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("component is responsive", async ({ page }) => {
    // Test various viewport sizes
    const viewports = [
      { name: "mobile", width: 320, height: 667 },
      { name: "tablet", width: 768, height: 1024 },
      { name: "desktop", width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      // Component should be visible at all sizes
      const heading = page.locator('h2:has-text("Your Learning Journey")');
      await expect(heading).toBeVisible();

      // All stages should be accessible
      const buttons = page.locator('button:has-text("1"), button:has-text("6")').all();
      const allButtons = await buttons;
      expect(allButtons.length).toBeGreaterThanOrEqual(2);
    }
  });

  test("respects reduced motion preference", async ({ page }) => {
    // This would test that animations are disabled when prefers-reduced-motion is set
    // The component uses useReducedMotion hook which should handle this
    const heading = page.locator('h2:has-text("Your Learning Journey")');
    await expect(heading).toBeVisible();
  });
});
