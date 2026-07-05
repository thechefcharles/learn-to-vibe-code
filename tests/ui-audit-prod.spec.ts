import { test } from "@playwright/test";
import fs from "fs";
import path from "path";

const SCREENSHOTS_DIR = path.join(process.cwd(), "tests/ui-audit-screenshots");
const BASE_URL = "https://learn-to-vibe-code.vercel.app";

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

test.describe("UI Audit - Production", () => {
  test("1. Home Page", async ({ page }) => {
    console.log("📸 Screenshotting home page...");
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01-home.png"), fullPage: true });
    console.log("✅ Home page");
  });

  test("2. Sign In Page", async ({ page }) => {
    console.log("📸 Screenshotting sign in page...");
    await page.goto(`${BASE_URL}/auth/sign-in`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "02-signin.png"), fullPage: true });
    console.log("✅ Sign in page");
  });

  test("3. Sign Up Page", async ({ page }) => {
    console.log("📸 Screenshotting sign up page...");
    await page.goto(`${BASE_URL}/auth/sign-up`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "03-signup.png"), fullPage: true });

    const hasForm = await page.locator('input[placeholder="John Doe"]').isVisible();
    const hasLogo = await page.locator("img, [class*='logo']").count() > 0;
    console.log(`✅ Sign up page - Form visible: ${hasForm}, Logo present: ${hasLogo}`);
  });

  test("4. About Page", async ({ page }) => {
    console.log("📸 Screenshotting about page...");
    await page.goto(`${BASE_URL}/about`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "04-about.png"), fullPage: true });

    const hasHomeLink = await page.locator("a, button").filter({ hasText: /Home|Course/ }).count() > 0;
    console.log(`✅ About page - Navigation present: ${hasHomeLink}`);
  });

  test("5. Support/Donate Page", async ({ page }) => {
    console.log("📸 Screenshotting support page...");
    await page.goto(`${BASE_URL}/support`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "05-support.png"), fullPage: true });

    const hasDonationUI = await page.locator("button, [class*='stripe'], [class*='paypal']").count() > 0;
    console.log(`✅ Support page - Donation UI: ${hasDonationUI}`);
  });

  test("6. Terms of Service", async ({ page }) => {
    console.log("📸 Screenshotting terms page...");
    await page.goto(`${BASE_URL}/legal/terms`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "06-terms.png"), fullPage: true });
    console.log("✅ Terms page");
  });

  test("7. Privacy Policy", async ({ page }) => {
    console.log("📸 Screenshotting privacy page...");
    await page.goto(`${BASE_URL}/legal/privacy`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "07-privacy.png"), fullPage: true });
    console.log("✅ Privacy page");
  });

  test("8. Refund Policy", async ({ page }) => {
    console.log("📸 Screenshotting refund page...");
    await page.goto(`${BASE_URL}/legal/refund`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "08-refund.png"), fullPage: true });
    console.log("✅ Refund page");
  });

  test.afterAll(() => {
    console.log(`\n✅ All screenshots saved to: ${SCREENSHOTS_DIR}`);
    const files = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png'));
    console.log(`Total: ${files.length} screenshots\n`);
  });
});
