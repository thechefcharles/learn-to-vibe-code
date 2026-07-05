import { test, expect } from "@playwright/test";

test("Diagnose signup flow", async ({ page }) => {
  // Capture all console messages
  const consoleLogs: Array<{ type: string; message: string }> = [];
  page.on("console", (msg) => {
    consoleLogs.push({
      type: msg.type(),
      message: msg.text(),
    });
  });

  // Capture all network errors
  const networkErrors: Array<{ url: string; status: number; statusText: string }> = [];
  page.on("response", (response) => {
    if (response.status() >= 400) {
      networkErrors.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
      });
    }
  });

  console.log("\n=== DIAGNOSIS START ===");
  console.log("Environment: Production (Vercel)");
  console.log("URL: https://learn-to-vibe-code.vercel.app/auth/sign-up\n");

  // Step 1: Load signup page
  console.log("Step 1: Loading signup page...");
  const response = await page.goto("https://learn-to-vibe-code.vercel.app/auth/sign-up");
  console.log(`Response status: ${response?.status()}`);

  // Step 2: Wait for page to load
  await page.waitForLoadState("networkidle");
  console.log("Page loaded.\n");

  // Step 3: Check for maintenance modal
  console.log("Step 2: Checking for maintenance modal...");
  const maintenanceModal = await page.locator("text=Account Creation Paused").isVisible().catch(() => false);
  if (maintenanceModal) {
    console.log("❌ FOUND: Maintenance modal is showing");
    console.log("This indicates Supabase auth is not responding correctly.\n");
  } else {
    console.log("✅ No maintenance modal found.\n");
  }

  // Step 4: Try to fill form
  console.log("Step 3: Attempting to fill signup form...");
  try {
    await page.fill('input[placeholder="John Doe"]', "Test User");
    await page.fill('input[placeholder="your@email.com"]', `test-${Date.now()}@example.com`);
    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill("TestPassword123!");
    await passwordInputs[1].fill("TestPassword123!");
    console.log("✅ Form filled successfully.\n");
  } catch (err) {
    console.log(`❌ Error filling form: ${err}\n`);
  }

  // Step 5: Try to submit
  console.log("Step 4: Attempting to submit form...");
  try {
    await page.click('button:has-text("Sign Up")');
    console.log("Form submitted, waiting for response...");

    // Wait a bit for request
    await page.waitForTimeout(3000);
    console.log("✅ Form submission attempted.\n");
  } catch (err) {
    console.log(`❌ Error submitting form: ${err}\n`);
  }

  // Step 6: Report console errors
  console.log("=== CONSOLE MESSAGES ===");
  const errorLogs = consoleLogs.filter((log) => log.type === "error");
  if (errorLogs.length > 0) {
    console.log(`Found ${errorLogs.length} error messages:`);
    errorLogs.forEach((log, i) => {
      console.log(`  ${i + 1}. ${log.message}`);
    });
  } else {
    console.log("No console errors detected.");
  }
  console.log();

  // Step 7: Report network errors
  console.log("=== NETWORK ERRORS ===");
  if (networkErrors.length > 0) {
    console.log(`Found ${networkErrors.length} failed requests:`);
    networkErrors.forEach((err, i) => {
      console.log(`  ${i + 1}. ${err.status} ${err.statusText}: ${err.url}`);
    });
  } else {
    console.log("No network errors detected.");
  }
  console.log();

  // Step 8: Check current page state
  console.log("=== FINAL PAGE STATE ===");
  const currentUrl = page.url();
  console.log(`Current URL: ${currentUrl}`);

  const pageContent = await page.textContent("body");
  if (pageContent?.includes("Account Creation Paused")) {
    console.log("❌ Status: STILL SHOWING MAINTENANCE MODAL");
  } else if (currentUrl.includes("/dashboard")) {
    console.log("✅ Status: SIGNUP SUCCESSFUL - Redirected to dashboard");
  } else if (currentUrl.includes("/auth/sign-up")) {
    console.log("⚠️  Status: Still on signup page - check for error messages");
    const errorDiv = await page.locator("[class*='error'], [class*='danger']").first().textContent();
    if (errorDiv) {
      console.log(`Error message: ${errorDiv}`);
    }
  }

  console.log("\n=== DIAGNOSIS END ===\n");

  // Print all logs for manual review
  console.log("Console logs for inspection:");
  consoleLogs.forEach((log) => {
    console.log(`[${log.type.toUpperCase()}] ${log.message}`);
  });
});
