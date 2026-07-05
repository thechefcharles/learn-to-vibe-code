import { test, expect } from "@playwright/test";

test("Diagnose signup flow - LOCAL", async ({ page }) => {
  console.log("\n=== LOCAL DIAGNOSIS START ===");
  console.log("Environment: Local Dev (http://localhost:3008)");
  console.log("URL: http://localhost:3008/auth/sign-up\n");

  // Step 1: Load signup page
  console.log("Step 1: Loading signup page...");
  const response = await page.goto("http://localhost:3008/auth/sign-up");
  console.log(`Response status: ${response?.status()}`);

  await page.waitForLoadState("networkidle");
  console.log("Page loaded.\n");

  // Step 2: Check for maintenance modal
  console.log("Step 2: Checking for maintenance modal...");
  const maintenanceModal = await page.locator("text=Account Creation Paused").isVisible().catch(() => false);
  if (maintenanceModal) {
    console.log("❌ FOUND: Maintenance modal is showing");
  } else {
    console.log("✅ No maintenance modal found.\n");
  }

  // Step 3: Check if signup form exists
  console.log("Step 3: Checking for signup form...");
  const formExists = await page.locator('input[placeholder="John Doe"]').isVisible().catch(() => false);
  if (formExists) {
    console.log("✅ Signup form found and visible.\n");
  } else {
    console.log("❌ Signup form NOT found.\n");
  }

  // Step 4: Try to fill and submit
  if (formExists && !maintenanceModal) {
    console.log("Step 4: Filling and submitting form...");
    const email = `test-${Date.now()}@example.com`;

    try {
      await page.fill('input[placeholder="John Doe"]', "Test User");
      await page.fill('input[placeholder="your@email.com"]', email);

      const passwordInputs = await page.locator('input[type="password"]').all();
      await passwordInputs[0].fill("TestPassword123!");
      await passwordInputs[1].fill("TestPassword123!");

      console.log("✅ Form filled.");
      console.log("Submitting...");

      await page.click('button:has-text("Sign Up")');
      await page.waitForTimeout(3000);

      const currentUrl = page.url();
      if (currentUrl.includes("/dashboard")) {
        console.log("✅ SUCCESS: Redirected to dashboard!");
      } else if (currentUrl.includes("/auth/sign-up")) {
        console.log("⚠️  Still on signup page");
        const errorMsg = await page.locator("[class*='error'], [class*='danger']").first().textContent().catch(() => null);
        if (errorMsg) {
          console.log(`Error: ${errorMsg}`);
        }
      }
    } catch (err) {
      console.log(`❌ Error: ${err}`);
    }
  }

  console.log("\n=== LOCAL DIAGNOSIS END ===\n");
});
