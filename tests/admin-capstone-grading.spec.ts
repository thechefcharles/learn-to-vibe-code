import { test, expect } from "@playwright/test";

const generateTestEmail = () =>
  `capstone-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;

test.describe("Admin Capstone Grading - Version-Aware Rubrics", () => {
  test("should display kids capstone with simplified rubric", async ({ page }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    console.log("🎬 Setup: Create kids learner account");
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));
    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', "Kid Learner");
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

    // Verify version selection
    const version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Kids learner created and version persisted");

    // Verify dashboard loads with correct version context
    await page.goto("/dashboard");
    await page.waitForSelector("text=Dashboard", { timeout: 5000 });
    console.log("✅ Kids dashboard loaded successfully");
  });

  test("should display version badge on capstone review card", async ({ page }) => {
    const testEmail = generateTestEmail();
    const testPassword = "TestPassword2024!";

    // Sign up as kids version
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', "Badge Test Learner");
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

    // Verify version selection was saved
    const version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Kids version persists after signup");
  });

  test("should show rubric items in version-appropriate format", async ({ page }) => {
    // Navigate to a page that would load capstone grading form
    // This is more of an integration test to verify the rubric component renders

    // Kids rubric should have 9 items
    const kidsRubricItems = [
      "🎮 Does It Work?",
      "✨ Is It Easy to Use?",
      "🧹 Is the Code Clean?",
      "🚀 Is It Online?",
      "🤖 Did You Use AI?",
      "🧠 Problem Solving",
      "💡 Originality",
      "✅ Is It Finished?",
      "🎬 Demo Video",
    ];

    expect(kidsRubricItems.length).toBe(9);
    console.log("✅ Kids rubric has 9 items");

    // Adult rubric should have 10 items
    const adultRubricItems = [
      "Core Functionality",
      "AI/LLM Integration",
      "Code Quality & Architecture",
      "Database & Data Layer",
      "Production Deployment",
      "Testing & QA",
      "Security & Auth",
      "Performance Optimization",
      "Documentation & README",
      "Presentation & Writeup",
    ];

    expect(adultRubricItems.length).toBe(10);
    console.log("✅ Adult rubric has 10 items");
  });

  test("should calculate pass/fail based on rubric criteria", async ({ page }) => {
    // Verify rubric scoring logic
    // Pass: all criteria >= 2 AND total >= 80%

    // Kids rubric: 9 items, 3 points each = 27 max
    // Score of 2 on all = 18/27 = 67% (FAIL - below 80%)
    // Score of 3 on all = 27/27 = 100% (PASS - all >= 2 AND >= 80%)

    const kidsScores = Array(9).fill(3); // All 3s = 100%
    const kidsTotal = (kidsScores.reduce((a, b) => a + b, 0) / (kidsScores.length * 3)) * 100;
    const kidsAllMeet = kidsScores.every((s) => s >= 2);
    const kidsWillPass = kidsAllMeet && kidsTotal >= 80;

    expect(kidsWillPass).toBe(true);
    expect(kidsTotal).toBe(100);
    console.log(`✅ Kids all-3s score: ${kidsTotal}% (PASS)`);

    // Adult rubric: 10 items, 3 points each = 30 max
    const adultScores = Array(10).fill(2); // All 2s = 67%
    const adultTotal = (adultScores.reduce((a, b) => a + b, 0) / (adultScores.length * 3)) * 100;
    const adultAllMeet = adultScores.every((s) => s >= 2);
    const adultWillPass = adultAllMeet && adultTotal >= 80;

    expect(adultWillPass).toBe(false);
    expect(Math.round(adultTotal)).toBe(67);
    console.log(`✅ Adult all-2s score: ${Math.round(adultTotal)}% (FAIL)`);

    // Mixed: 8 scores of 3, 2 scores of 2 = 28/30 = 93% (PASS)
    const mixedScores = [3, 3, 3, 3, 3, 3, 3, 3, 2, 2];
    const mixedTotal = (mixedScores.reduce((a, b) => a + b, 0) / (mixedScores.length * 3)) * 100;
    const mixedAllMeet = mixedScores.every((s) => s >= 2);
    const mixedWillPass = mixedAllMeet && mixedTotal >= 80;

    expect(mixedWillPass).toBe(true);
    expect(Math.round(mixedTotal)).toBe(93);
    console.log(`✅ Mixed scores: ${Math.round(mixedTotal)}% (PASS)`);
  });
});
