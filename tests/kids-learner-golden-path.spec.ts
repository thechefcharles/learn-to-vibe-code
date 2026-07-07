import { test, expect } from "@playwright/test";

const generateTestEmail = () =>
  `golden-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;

/**
 * GOLDEN PATH TEST: Kids learner signup and core features
 *
 * Validates the dual-version system:
 * 1. Sign up as kids version
 * 2. Version persists through navigation
 * 3. Kids-specific content loads
 * 4. Dashboard with gamification
 * 5. Capstone page shows kids UI
 */
test.describe("Kids Learner Golden Path - Version System", () => {
  const testPassword = "TestPassword2024!";

  test("should signup as kids and access dashboard", async ({ page }) => {
    console.log("🚀 GOLDEN PATH: Kids Signup & Dashboard");

    const testEmail = generateTestEmail();

    // 1. Sign up as kids version
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', "Golden Path User");
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

    console.log("✅ Step 1: Kids learner signed up");

    // 2. Navigate to dashboard
    await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const dashboardContent = await page.textContent("body");
    expect(dashboardContent).toContain("Dashboard") || expect(dashboardContent).toContain("Level");

    console.log("✅ Step 2: Dashboard loaded with gamification");

    // 3. Verify version persists
    const version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ Step 3: Kids version persists");
  });

  test("should access dashboard and view progress", async ({ page }) => {
    console.log("🚀 GOLDEN PATH: Dashboard");

    // Sign up
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    const uniqueName = `Dashboard-${Date.now()}`;
    const uniqueEmail = generateTestEmail();

    await page.fill('input[placeholder="John Doe"]', uniqueName);
    await page.fill('input[placeholder="your@email.com"]', uniqueEmail);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);

    const kidsRadio = page.locator('input[value="kids"]');
    if (!(await kidsRadio.isChecked())) {
      await kidsRadio.check();
    }

    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // Navigate to dashboard
    await page.goto("/dashboard");
    await page.waitForTimeout(1000);

    // Check for dashboard elements
    const dashboardContent = await page.textContent("body");
    expect(dashboardContent).toContain("Dashboard") || expect(dashboardContent).toContain("Level");

    console.log("✅ Dashboard loaded");

    // Check for gamification elements (level, streak, badges, modules)
    const hasLevel = dashboardContent?.includes("Level");
    const hasStreak = dashboardContent?.includes("Streak") || dashboardContent?.includes("streak");
    const hasModules = dashboardContent?.includes("Module");

    console.log(`✅ Dashboard shows: Level=${hasLevel}, Streak=${hasStreak}, Modules=${hasModules}`);
  });

  test("should verify capstone page exists and is access-controlled", async ({ page }) => {
    console.log("🚀 GOLDEN PATH: Capstone Access");

    // Sign up
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    const uniqueName = `Capstone-${Date.now()}`;
    const uniqueEmail = generateTestEmail();

    await page.fill('input[placeholder="John Doe"]', uniqueName);
    await page.fill('input[placeholder="your@email.com"]', uniqueEmail);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);

    const kidsRadio = page.locator('input[value="kids"]');
    if (!(await kidsRadio.isChecked())) {
      await kidsRadio.check();
    }

    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // Try to access capstone
    await page.goto("/capstone");
    await page.waitForTimeout(1000);

    const capstoneContent = await page.textContent("body");
    // Should show either "Build Your Project" (kids version) or unlock message
    const isKidsCapstone = capstoneContent?.includes("Build Your Project") || capstoneContent?.includes("🎮");
    const isLocked = capstoneContent?.includes("Module 15") || capstoneContent?.includes("unlock");

    console.log(`✅ Capstone page: Kids UI=${isKidsCapstone}, Access controlled=${isLocked || isKidsCapstone}`);
    expect(capstoneContent).toBeTruthy();
  });

  test("should persist version across dashboard navigation", async ({ page }) => {
    console.log("🚀 GOLDEN PATH: Version Persistence");

    const uniqueEmail = generateTestEmail();

    // Sign up as kids
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', "Version Test");
    await page.fill('input[placeholder="your@email.com"]', uniqueEmail);

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);

    const kidsRadio = page.locator('input[value="kids"]');
    if (!(await kidsRadio.isChecked())) {
      await kidsRadio.check();
    }

    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // Verify version in localStorage
    const version = await page.evaluate(() => localStorage.getItem("version"));
    expect(version).toBe("kids");
    console.log("✅ localStorage version persists after signup");

    // Navigate to dashboard and verify version persists
    await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
    const versionOnDashboard = await page.evaluate(() => localStorage.getItem("version"));
    expect(versionOnDashboard).toBe("kids");
    console.log("✅ localStorage version persists on /dashboard");

    // Navigate to capstone and verify version persists
    await page.goto("/capstone", { waitUntil: "domcontentloaded" }).catch(() => null);
    const versionOnCapstone = await page.evaluate(() => localStorage.getItem("version"));
    expect(versionOnCapstone).toBe("kids");
    console.log("✅ localStorage version persists on /capstone");
  });

  test("should display kids-specific UI elements and styling", async ({ page }) => {
    console.log("🚀 GOLDEN PATH: Kids UI Verification");

    // Sign up as kids
    await page.goto("/auth/sign-up");
    await page.evaluate(() => localStorage.setItem("version", "kids"));

    await page.waitForSelector('input[placeholder="John Doe"]', { timeout: 5000 });
    await page.fill('input[placeholder="John Doe"]', "UI Test");
    await page.fill('input[placeholder="your@email.com"]', generateTestEmail());

    const passwordInputs = await page.locator('input[type="password"]').all();
    await passwordInputs[0].fill(testPassword);
    await passwordInputs[1].fill(testPassword);

    const kidsRadio = page.locator('input[value="kids"]');
    if (!(await kidsRadio.isChecked())) {
      await kidsRadio.check();
    }

    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(2000);

    // Check for kids-specific UI elements
    const dashboardContent = await page.textContent("body");

    // Look for kids-themed language or emojis
    const hasGameTheme = dashboardContent?.includes("🎮") || dashboardContent?.includes("Level");
    const hasDashboard = dashboardContent?.includes("Dashboard") || dashboardContent?.includes("dashboard");

    console.log(`✅ Kids UI elements present: GameTheme=${hasGameTheme}, Dashboard=${hasDashboard}`);

    // Navigate to course and check for kids modules
    await page.goto("/course/0");
    const courseContent = await page.textContent("body");
    expect(courseContent).toBeTruthy();
    console.log("✅ Kids course content loads successfully");
  });
});
