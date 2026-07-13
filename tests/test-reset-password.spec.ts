import { test, expect } from "@playwright/test";

test("password reset flow", async ({ page, context }) => {
  // Set a longer timeout for debugging
  test.setTimeout(60000);

  console.log("🔍 Starting password reset flow test...\n");

  // Step 1: Navigate to sign-in page
  console.log("📍 Step 1: Navigating to sign-in page...");
  await page.goto("http://localhost:3008/auth/sign-in");
  await expect(page).toHaveTitle(/Learn To Vibe Code/);
  console.log("✓ Sign-in page loaded\n");

  // Step 2: Click forgot password link
  console.log("📍 Step 2: Clicking 'Forgot password?' link...");
  const forgotLink = page.locator('a:has-text("Forgot password?")');
  await expect(forgotLink).toBeVisible();
  await forgotLink.click();
  await page.waitForURL("**/auth/forgot-password");
  console.log("✓ Navigated to forgot-password page\n");
  console.log("URL:", page.url());

  // Step 3: Enter email
  console.log("📍 Step 3: Entering test email...");
  const emailInput = page.locator('input[type="email"]');
  const testEmail = `test-${Date.now()}@example.com`;
  await emailInput.fill(testEmail);
  console.log(`✓ Entered email: ${testEmail}\n`);

  // Step 4: Test direct reset-password page access
  console.log("📍 Step 4: Testing reset-password page directly...");
  await page.goto("http://localhost:3008/auth/reset-password?code=test-code");
  await page.waitForLoadState("networkidle");

  console.log("URL after navigation:", page.url());
  console.log("\n📋 Page Content Analysis:");

  // Check what's on the page
  const pageContent = await page.content();
  console.log("Page title:", await page.title());

  // Check for common elements
  const hasPasswordForm = await page.locator('input[type="password"]').count() > 0;
  const hasErrorMessage = await page.locator('text=/error|expired|invalid/i').count() > 0;
  const hasSuccessMessage = await page.locator('text=/success|reset successfully/i').count() > 0;

  console.log("Has password form:", hasPasswordForm);
  console.log("Has error message:", hasErrorMessage);
  console.log("Has success message:", hasSuccessMessage);

  // Get all text visible on the page
  const allText = await page.locator("body").innerText();
  console.log("\n📄 Full page text:\n", allText.substring(0, 500));

  // Check current URL
  console.log("\n🔗 Current URL:", page.url());
  console.log("Expected URL pattern: **/auth/reset-password**");

  // Look for redirects
  if (page.url().includes("/dashboard")) {
    console.log("\n⚠️ ISSUE FOUND: Page redirected to dashboard!");
    console.log("This means the page is redirecting authenticated users away from the reset form.");
  }

  // Check localStorage/sessionStorage
  console.log("\n💾 Storage inspection:");
  const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage));
  console.log("LocalStorage keys:", Object.keys(JSON.parse(localStorage)));

  // Get console logs/errors
  page.on("console", (msg) => {
    console.log(`[${msg.type()}]`, msg.text());
  });

  page.on("error", (err) => {
    console.log("[ERROR]", err);
  });

  // Wait a bit to see if there's a redirect
  await page.waitForTimeout(2000);
  console.log("\nFinal URL after waiting:", page.url());
});
