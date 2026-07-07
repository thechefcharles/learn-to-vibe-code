import { test, expect } from "@playwright/test";

test.describe("Dashboard - Version Comparison", () => {
  test("Kids version dashboard", async ({ page }) => {
    // Navigate to home and switch to kids version
    await page.goto("/");

    // Set kids version in localStorage
    await page.evaluate(() => {
      localStorage.setItem("version", "kids");
    });

    // Navigate to demo/public course first to see kids content
    await page.goto("/demo");
    await page.waitForTimeout(500); // Wait for version to apply

    // Take screenshot of kids landing
    await page.screenshot({ path: "screenshots/kids-landing.png", fullPage: true });

    // Check if kids styling is applied
    const heading = page.locator("h1").first();
    await expect(heading).toContainText(/Have Fun|Code/);
  });

  test("Adult version dashboard", async ({ page }) => {
    // Navigate to home with default (adult) version
    await page.goto("/");

    // Set adult version explicitly
    await page.evaluate(() => {
      localStorage.setItem("version", "adult");
    });

    // Navigate to demo
    await page.goto("/demo");
    await page.waitForTimeout(500); // Wait for version to apply

    // Take screenshot of adult landing
    await page.screenshot({ path: "screenshots/adult-landing.png", fullPage: true });
  });

  test("Course map - Kids vs Adult", async ({ page }) => {
    // Kids version
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("version", "kids");
    });
    await page.goto("/course");
    await page.screenshot({ path: "screenshots/kids-course-map.png", fullPage: true });

    // Adult version
    await page.evaluate(() => {
      localStorage.setItem("version", "adult");
    });
    await page.goto("/course");
    await page.screenshot({ path: "screenshots/adult-course-map.png", fullPage: true });
  });
});
