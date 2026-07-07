import { test, expect } from "@playwright/test";

test("debug: simple signup flow", async ({ page }) => {
  const testEmail = `debug-${Date.now()}@example.com`;
  const testPassword = "TestPassword2024!";

  console.log("📝 Starting signup...");
  await page.goto("/auth/sign-up");

  // Wait for form
  await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
  console.log("✅ Form loaded");

  // Fill form
  await page.fill('input[placeholder="John Doe"]', "Debug User");
  await page.fill('input[placeholder="your@email.com"]', testEmail);

  const passwordInputs = await page.locator('input[type="password"]').all();
  await passwordInputs[0].fill(testPassword);
  await passwordInputs[1].fill(testPassword);

  console.log("✅ Form filled");

  // Set kids version
  await page.evaluate(() => localStorage.setItem("version", "kids"));
  const kidsRadio = page.locator('input[value="kids"]');
  if (!(await kidsRadio.isChecked())) {
    await kidsRadio.check();
  }
  console.log("✅ Kids version selected");

  // Check console for errors
  page.on("console", (msg) => console.log("🌐 Browser:", msg.text()));

  // Submit
  await page.click('button:has-text("Sign Up")');
  console.log("✅ Sign up button clicked");

  // Wait and check result
  await page.waitForTimeout(3000);

  const url = page.url();
  const content = await page.textContent("body");

  console.log("📍 Final URL:", url);
  console.log("📄 Page contains 'Welcome':", content?.includes("Welcome"));
  console.log("📄 Page contains 'dashboard':", content?.toLowerCase().includes("dashboard"));
  console.log("📄 Page contains 'error':", content?.toLowerCase().includes("error"));

  // Try to navigate manually
  console.log("🔄 Attempting manual navigation to /dashboard");
  await page.goto("/dashboard", { waitUntil: "load", timeout: 10000 }).catch((e) => {
    console.log("❌ Navigation failed:", e.message);
  });

  const finalUrl = page.url();
  console.log("📍 After navigation URL:", finalUrl);

  if (finalUrl.includes("/dashboard")) {
    console.log("✅ Successfully on dashboard");
  } else if (finalUrl.includes("/auth")) {
    console.log("⚠️ Redirected back to auth - not authenticated");
  }
});
