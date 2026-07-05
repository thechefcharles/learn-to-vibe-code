import { test } from "@playwright/test";

test("Check Vercel signup - no webserver", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("\n=== Checking Vercel Signup After Push ===\n");

  const response = await page.goto("https://learn-to-vibe-code.vercel.app/auth/sign-up");
  console.log(`Response status: ${response?.status()}`);

  await page.waitForLoadState("networkidle");

  const html = await page.content();
  const hasModal = html.includes("Account Creation Paused");
  const hasForm = html.includes("Get Started");

  if (hasModal) {
    console.log("❌ Maintenance modal STILL present");
  } else {
    console.log("✅ Maintenance modal GONE");
  }

  if (hasForm) {
    console.log("✅ Signup form IS present");
  } else {
    console.log("❌ Signup form NOT found");
  }

  console.log("\n=== End Check ===\n");

  await context.close();
});
