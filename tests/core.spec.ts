import { test, expect } from "@playwright/test";

test.describe("Learn to Vibe Code - Core Platform", () => {
  test("should load app and serve HTML", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBeLessThan(500); // Not a server error
  });

  test("should have sign-in page", async ({ page }) => {
    const response = await page.goto("/auth/sign-in");
    expect(response?.status()).toBeLessThan(400);

    // Check page has content
    const content = await page.textContent("body");
    expect(content).toContain("Email");
  });

  test("should have sign-up page", async ({ page }) => {
    const response = await page.goto("/auth/sign-up");
    expect(response?.status()).toBeLessThan(400);

    // Check page has expected form fields
    const content = await page.textContent("body");
    expect(content).toContain("Full Name");
  });

  test("should route to course pages", async ({ page }) => {
    // These pages may redirect if not authenticated, but shouldn't 500
    const courseResponse = await page.goto("/course", { waitUntil: "domcontentloaded" });
    expect(courseResponse?.status()).toBeLessThan(500);
  });

  test("should route to lesson pages", async ({ page }) => {
    const lessonResponse = await page.goto("/course/0", { waitUntil: "domcontentloaded" });
    expect(lessonResponse?.status()).toBeLessThan(500);
  });

  test("should route to quiz pages", async ({ page }) => {
    const quizResponse = await page.goto("/course/0/quiz", { waitUntil: "domcontentloaded" });
    expect(quizResponse?.status()).toBeLessThan(500);
  });

  test("should route to deliverable pages", async ({ page }) => {
    const submitResponse = await page.goto("/course/0/submit", { waitUntil: "domcontentloaded" });
    expect(submitResponse?.status()).toBeLessThan(500);
  });

  test("should have styled pages (Tailwind loaded)", async ({ page }) => {
    await page.goto("/auth/sign-in");

    // Check for brand color classes
    const body = await page.locator("body").getAttribute("class");
    expect(body).toBeTruthy(); // Body should have classes

    // Check for brand-colored elements (violet, indigo, etc.)
    const brandElements = await page.locator("[class*='bg-violet'], [class*='bg-indigo'], [class*='text-ink']").count();
    expect(brandElements).toBeGreaterThan(0);
  });

  test("should render without JavaScript errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/auth/sign-in");
    await page.waitForLoadState("networkidle");

    // Should not have critical JS errors (warnings ok)
    const criticalErrors = errors.filter(e => !e.includes("warn"));
    expect(criticalErrors.length).toBe(0);
  });

  test("should be mobile responsive", async ({ browser }) => {
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 }, // iPhone size
    });
    const page = await mobileContext.newPage();

    const response = await page.goto("/auth/sign-in");
    expect(response?.status()).toBeLessThan(400);

    // Should have content visible
    const content = await page.textContent("body");
    expect(content?.length).toBeGreaterThan(50);

    await mobileContext.close();
  });

  test("should have about page", async ({ page }) => {
    const response = await page.goto("/about");
    expect(response?.status()).toBeLessThan(400);

    // Check for author content
    const content = await page.textContent("body");
    expect(content).toContain("About the Author");
    expect(content).toContain("Charles Foreman");
    expect(content).toContain("vibe coding");
  });

  test("should have support/donate page", async ({ page }) => {
    const response = await page.goto("/support");
    expect(response?.status()).toBeLessThan(400);

    // Check for donation content
    const content = await page.textContent("body");
    expect(content).toContain("Donate");
  });

  test("should have legal pages", async ({ page }) => {
    const legalPages = ["/legal/terms", "/legal/privacy", "/legal/refund"];

    for (const page_path of legalPages) {
      const response = await page.goto(page_path);
      expect(response?.status()).toBeLessThan(400);
    }
  });
});
