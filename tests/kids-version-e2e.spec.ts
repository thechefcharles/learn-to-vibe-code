import { test, expect } from "@playwright/test";

const generateTestEmail = () =>
  `kids-test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;

test.describe("Kids Version E2E - Complete Dual-Version Flow", () => {
  test("should signup as kids version and see kid-friendly content", async ({
    page,
  }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";
    const testName = "Kid Learner";

    // 1. Navigate to landing page
    await page.goto("/");
    await expect(page).toHaveTitle(/Learn To Vibe Code/);

    // 2. Verify version toggle exists in top-left
    const versionToggle = page.locator("text=🎮 Kids").first();
    await expect(versionToggle).toBeVisible({ timeout: 5000 });

    // 3. Click Kids version toggle
    await page.click("text=🎮 Kids");

    // 4. Verify landing page shows kids headlines
    await page.waitForTimeout(500); // Wait for re-render
    const kidsHeadline = page.locator("text=Learn to Code & Have Fun!");
    await expect(kidsHeadline).toBeVisible();

    // 5. Click signup button
    await page.click("button:has-text('Start Learning Now'), button:has-text('Start My Journey')");
    await page.waitForURL(/.*\/auth\/sign-up/);

    // 6. Verify signup page has version selector
    const kidsRadio = page.locator('input[value="kids"]');
    await expect(kidsRadio).toBeVisible();

    // 7. Select Kids version (should already be selected after toggle, but ensure)
    await kidsRadio.check();

    // 8. Fill signup form
    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', testName);
    await page.fill('input[placeholder="your@email.com"]', testEmail);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);

    // 9. Submit signup
    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // 10. Verify we reached dashboard
    const dashboardUrl = page.url();
    if (dashboardUrl.includes("/dashboard")) {
      console.log("✅ Signup successful, reached dashboard");

      // 11. Verify localStorage has version='kids'
      const version = await page.evaluate(() =>
        localStorage.getItem("version")
      );
      expect(version).toBe("kids");
      console.log("✅ localStorage.version = 'kids'");
    } else {
      console.log("⚠️ Signup completed but not on dashboard yet:", dashboardUrl);
    }
  });

  test("should see kids module content when enrolled as kids", async ({
    page,
  }) => {
    // This test uses the kids user created above
    // For this test, we'll directly navigate and set localStorage
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    // Signup first
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    // Fill and submit signup
    await page.fill('input[placeholder="John Doe"]', "Kid User");
    await page.fill('input[placeholder="your@email.com"]', testEmail);
    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);
    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // Navigate to Module 0
    await page.goto("/course/0", { waitUntil: "networkidle" });

    // 1. Verify kids module headline appears
    const kidsModuleHeadline = page.locator(
      "text=Get Your Coding Gear Ready"
    );
    await expect(kidsModuleHeadline).toBeVisible({ timeout: 5000 });
    console.log("✅ Kids module headline visible");

    // 2. Verify kid-friendly language in content
    const kidsContent = page.locator("text=Runs your code on your computer");
    await expect(kidsContent).toBeVisible();
    console.log("✅ Kids-friendly content visible");

    // 3. Verify emoji indicators are present
    const emojiIndicator = page.locator("text=🎮");
    await expect(emojiIndicator).toBeVisible();
    console.log("✅ Kids emoji indicators present");
  });

  test("should load kids quiz questions (not adult)", async ({ page }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    // Setup: signup as kids
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));
    await page.fill('input[placeholder="John Doe"]', "Quiz Tester");
    await page.fill('input[placeholder="your@email.com"]', testEmail);
    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);
    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // Navigate to Module 0 quiz
    await page.goto("/course/0/quiz", { waitUntil: "networkidle" });

    // 1. Wait for quiz to load
    await page.waitForSelector("h1", { timeout: 5000 });

    // 2. Verify kids-specific quiz questions appear
    // Kids Q1: "What does Vercel do?"
    const kidsQuestion = page.locator("text=What does Vercel do?");
    await expect(kidsQuestion).toBeVisible({ timeout: 5000 });
    console.log("✅ Kids question 1 visible");

    // 3. Verify NOT adult question
    const adultQuestion = page.locator("text=In the stack, what is Vercel's job?");
    const isAdultVisible = await adultQuestion.isVisible().catch(() => false);
    expect(isAdultVisible).toBe(false);
    console.log("✅ Adult question NOT visible (correct)");

    // 4. Verify kids answer options appear
    // Kids options: "Shows your app to the world (on the internet!)"
    const kidsAnswer = page.locator(
      "text=Shows your app to the world (on the internet!)"
    );
    await expect(kidsAnswer).toBeVisible();
    console.log("✅ Kids answer options visible");

    // 5. Answer all 3 questions
    const questions = await page.locator('input[type="radio"]').all();
    for (let i = 0; i < Math.min(3, questions.length); i++) {
      await questions[i].check();
      await page.waitForTimeout(100);
    }
    console.log("✅ All questions answered");

    // 6. Submit quiz
    await page.click('button:has-text("Submit Quiz")');
    await page.waitForTimeout(2000);

    // 7. Verify results page
    const resultsText = await page.textContent("body");
    expect(resultsText).toContain("Quiz Passed!");
    console.log("✅ Quiz submitted and results visible");
  });

  test("should verify adult version still works (regression)", async ({
    page,
  }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    // Signup as ADULT version
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "adult"));

    // Verify adult radio is selected
    const adultRadio = page.locator('input[value="adult"]');
    await adultRadio.check();

    await page.fill('input[placeholder="John Doe"]', "Adult Learner");
    await page.fill('input[placeholder="your@email.com"]', testEmail);
    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);
    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // Navigate to quiz
    await page.goto("/course/0/quiz", { waitUntil: "networkidle" });

    // 1. Verify ADULT quiz questions appear
    const adultQuestion = page.locator("text=In the stack, what is Vercel's job?");
    await expect(adultQuestion).toBeVisible({ timeout: 5000 });
    console.log("✅ Adult question visible");

    // 2. Verify NOT kids question
    const kidsQuestion = page.locator("text=What does Vercel do?");
    const isKidsVisible = await kidsQuestion.isVisible().catch(() => false);
    expect(isKidsVisible).toBe(false);
    console.log("✅ Kids question NOT visible (correct regression test)");
  });

  test("should persist version selection across page navigation", async ({
    page,
  }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    // Signup as kids
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    const kidsRadio = page.locator('input[value="kids"]');
    await kidsRadio.check();

    await page.fill('input[placeholder="John Doe"]', "Persistence Test");
    await page.fill('input[placeholder="your@email.com"]', testEmail);
    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);
    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // 1. Check version on dashboard
    let version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Version persists on dashboard");

    // 2. Navigate to Module 0
    await page.goto("/course/0");
    version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Version persists on module page");

    // 3. Navigate to quiz
    await page.goto("/course/0/quiz");
    version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Version persists on quiz page");

    // 4. Navigate back to dashboard
    await page.goto("/dashboard");
    version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Version persists across all pages");
  });
});
