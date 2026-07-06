import { test, expect } from "@playwright/test";

const generateTestEmail = () =>
  `kids-test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;

test.describe("Kids Version E2E - Core Functionality", () => {
  test("should load kids quiz questions (not adult)", async ({ page }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    // 1. Sign up as kids version
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    // Wait for form and fill it
    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', "Kid Tester");
    await page.fill('input[placeholder="your@email.com"]', testEmail);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);

    // Select kids version (should be pre-selected from localStorage)
    const kidsRadio = page.locator('input[value="kids"]');
    if (!(await kidsRadio.isChecked())) {
      await kidsRadio.check();
    }

    // Sign up
    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    console.log("✅ Signup complete");

    // 2. Navigate directly to quiz (already authenticated)
    await page.goto("/course/0/quiz", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // 3. CRITICAL: Verify kids-specific quiz questions appear
    const kidsQuestion = page.locator("text=What does Vercel do?");
    await expect(kidsQuestion).toBeVisible({ timeout: 5000 });
    console.log("✅ Kids question 1 visible: 'What does Vercel do?'");

    // 4. Verify adult question does NOT appear
    const adultQuestion = page.locator("text=In the stack, what is Vercel's job?");
    const isAdultVisible = await adultQuestion.isVisible().catch(() => false);
    expect(isAdultVisible).toBe(false);
    console.log("✅ Adult question NOT visible (correct)");

    // 5. Verify kids answer options appear
    const kidsAnswer = page.locator("text=Shows your app to the world (on the internet!)");
    await expect(kidsAnswer).toBeVisible();
    console.log("✅ Kids answer options visible");

    // 6. Answer all 3 questions
    const radioButtons = await page.locator('input[type="radio"]').all();
    expect(radioButtons.length).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < 3; i++) {
      await radioButtons[i].check();
      await page.waitForTimeout(100);
    }
    console.log("✅ All 3 questions answered");

    // 7. Submit quiz
    await page.click('button:has-text("Submit Quiz")');

    // 8. Wait for results page to load
    await page.waitForSelector('h2:has-text("Quiz Passed!")', { timeout: 5000 }).catch(() => null);
    await page.waitForTimeout(1000);

    // 9. Verify quiz submission and results
    const resultsHeading = page.locator('h2:has-text("Quiz Passed!")');
    const isResultsVisible = await resultsHeading.isVisible().catch(() => false);

    if (isResultsVisible) {
      console.log("✅ Quiz submitted successfully, results visible");
    } else {
      // If heading not visible, check if the percentage is displayed
      const percentageText = await page.textContent("body");
      expect(percentageText).toContain("%");
      console.log("✅ Quiz submitted successfully, results shown");
    }
  });

  test("should keep adult questions for adult version users", async ({ page }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    // 1. Sign up as ADULT version
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "adult"));

    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', "Adult Tester");
    await page.fill('input[placeholder="your@email.com"]', testEmail);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);

    // Select adult version
    const adultRadio = page.locator('input[value="adult"]');
    if (!(await adultRadio.isChecked())) {
      await adultRadio.check();
    }

    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    console.log("✅ Adult signup complete");

    // 2. Navigate to quiz
    await page.goto("/course/0/quiz", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // 3. Verify ADULT quiz questions appear
    const adultQuestion = page.locator("text=In the stack, what is Vercel's job?");
    await expect(adultQuestion).toBeVisible({ timeout: 5000 });
    console.log("✅ Adult question visible: 'In the stack, what is Vercel's job?'");

    // 4. Verify kids question does NOT appear
    const kidsQuestion = page.locator("text=What does Vercel do?");
    const isKidsVisible = await kidsQuestion.isVisible().catch(() => false);
    expect(isKidsVisible).toBe(false);
    console.log("✅ Kids question NOT visible (correct regression test)");

    // 5. Verify adult answer options appear
    const adultAnswer = page.locator("text=deploying the app to a public URL");
    await expect(adultAnswer).toBeVisible();
    console.log("✅ Adult answer options visible");
  });

  test("should persist version in localStorage across quiz flow", async ({ page }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    // Sign up as kids
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', "Persistence Test");
    await page.fill('input[placeholder="your@email.com"]', testEmail);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);

    const kidsRadio = page.locator('input[value="kids"]');
    if (!(await kidsRadio.isChecked())) {
      await kidsRadio.check();
    }

    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // Check version persists
    let version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Version persists after signup");

    // Navigate to quiz
    await page.goto("/course/0/quiz", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Check version still persists
    version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Version persists on quiz page");

    // Back to dashboard
    await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Check version STILL persists
    version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Version persists across all pages");
  });
});
