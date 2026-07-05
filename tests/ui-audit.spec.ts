import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = path.join(process.cwd(), "tests/ui-audit-screenshots");

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

test.describe("UI Audit - Navigation & Branding", () => {
  let email: string;
  let password: string;

  test.beforeAll(() => {
    email = process.env.TEST_EMAIL || "test@example.com";
    password = process.env.TEST_PASSWORD || "TestPassword123!";
  });

  test("1. Home Page - Public Landing", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01-home.png"), fullPage: true });
    console.log("✅ Home page screenshotted");
  });

  test("2. Sign In Page - Auth Flow", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "02-signin.png"), fullPage: true });
    console.log("✅ Sign in page screenshotted");
  });

  test("3. Sign Up Page - New Account", async ({ page }) => {
    await page.goto("/auth/sign-up");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "03-signup.png"), fullPage: true });
    console.log("✅ Sign up page screenshotted");
  });

  test("4. Login & Dashboard", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.fill('input[placeholder="your@email.com"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL("/dashboard", { timeout: 10000 });
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "04-dashboard.png"), fullPage: true });
    console.log("✅ Dashboard screenshotted after login");

    // Check for navigation
    const hasHomeLink = await page.locator("a:has-text('Home'), a:has-text('Logo')").count() > 0;
    const hasLogout = await page.locator("button:has-text('Sign Out'), a:has-text('Sign Out')").count() > 0;
    console.log(`Navigation check: Home link=${hasHomeLink}, Logout=${hasLogout}`);
  });

  test("5. Course Map Page", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.fill('input[placeholder="your@email.com"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL("/dashboard", { timeout: 10000 });

    await page.goto("/course");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "05-course-map.png"), fullPage: true });
    console.log("✅ Course map screenshotted");

    // Check navigation
    const hasBackLink = await page.locator("a:has-text('Dashboard'), a:has-text('Back')").count() > 0;
    console.log(`Course map nav: Back to dashboard=${hasBackLink}`);
  });

  test("6. Lesson Page - Module 0", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.fill('input[placeholder="your@email.com"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL("/dashboard", { timeout: 10000 });

    await page.goto("/course/0");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "06-lesson.png"), fullPage: true });
    console.log("✅ Lesson page screenshotted");

    // Check for breadcrumb/nav
    const hasNav = await page.locator("button, a").filter({ hasText: /Module|Course|Dashboard/ }).count() > 0;
    console.log(`Lesson nav: Has navigation=${hasNav}`);
  });

  test("7. Quiz Page", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.fill('input[placeholder="your@email.com"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL("/dashboard", { timeout: 10000 });

    await page.goto("/course/0/quiz");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "07-quiz.png"), fullPage: true });
    console.log("✅ Quiz page screenshotted");
  });

  test("8. Capstone Page", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.fill('input[placeholder="your@email.com"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign In")');
    await page.waitForURL("/dashboard", { timeout: 10000 });

    await page.goto("/capstone");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "08-capstone.png"), fullPage: true });
    console.log("✅ Capstone page screenshotted");
  });

  test("9. About Page", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "09-about.png"), fullPage: true });
    console.log("✅ About page screenshotted");

    // Check for home link
    const hasHomeLink = await page.locator("a, button").filter({ hasText: /Home|Logo/ }).count() > 0;
    console.log(`About page nav: Back to home=${hasHomeLink}`);
  });

  test("10. Support/Donate Page", async ({ page }) => {
    await page.goto("/support");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "10-support.png"), fullPage: true });
    console.log("✅ Support page screenshotted");

    // Check for navigation
    const hasNav = await page.locator("a, button").filter({ hasText: /Home|Dashboard|Sign/ }).count() > 0;
    console.log(`Support page nav: Has navigation=${hasNav}`);
  });

  test("11. Legal Pages", async ({ page }) => {
    await page.goto("/legal/terms");
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "11-terms.png"), fullPage: true });
    console.log("✅ Terms page screenshotted");

    // Check footer links
    const hasFooterLinks = await page.locator("a").filter({ hasText: /Privacy|Refund|Home/ }).count() > 0;
    console.log(`Legal page nav: Has footer links=${hasFooterLinks}`);
  });

  test.afterAll(() => {
    console.log(`\n✅ All screenshots saved to: ${SCREENSHOTS_DIR}`);
    console.log("Ready for UI audit evaluation");
  });
});
