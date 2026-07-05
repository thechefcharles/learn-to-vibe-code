import { test } from "@playwright/test";

test("Capture signup HTML from Vercel", async ({ page }) => {
  console.log("\n=== CAPTURING HTML FROM VERCEL ===\n");

  const response = await page.goto("https://learn-to-vibe-code.vercel.app/auth/sign-up");
  console.log(`Response status: ${response?.status()}`);

  await page.waitForLoadState("networkidle");

  // Get the full HTML
  const html = await page.content();

  // Check for maintenance modal text
  if (html.includes("Account Creation Paused")) {
    console.log("❌ Found: 'Account Creation Paused' in HTML");

    // Try to locate where it is
    const modalIndex = html.indexOf("Account Creation Paused");
    const context = html.substring(Math.max(0, modalIndex - 200), modalIndex + 200);
    console.log("\nContext around modal:");
    console.log(context);
  } else {
    console.log("✅ No 'Account Creation Paused' in HTML");
  }

  // Check for form
  if (html.includes("Get Started")) {
    console.log("✅ Found: 'Get Started' form heading");
  } else {
    console.log("❌ No 'Get Started' heading found");
  }

  // Log body content
  const bodyContent = await page.textContent("body");
  console.log("\n=== BODY TEXT (first 500 chars) ===");
  console.log(bodyContent?.substring(0, 500));

  console.log("\n=== END CAPTURE ===\n");
});
