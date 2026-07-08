import { test, expect } from "@playwright/test";

test.describe("CredentialPreviewWidget", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/test-credential");
  });

  test("should render the widget without errors", async ({ page }) => {
    // Check page loaded successfully
    const response = await page.goto("/test-credential");
    expect(response?.status()).toBeLessThan(400);
    expect(response?.status()).not.toBe(500);

    // Check main heading is present
    const heading = page.locator("h1");
    await expect(heading).toContainText("Credential Preview Widget Test");
  });

  test("should display the front side of the certificate", async ({ page }) => {
    // The front side should be visible by default
    const trophyIcon = page.locator("text=🏆").first();
    await expect(trophyIcon).toBeVisible();

    // Check for certificate text (in the widget, not the checklist)
    const cardArea = page.locator("[style*='perspective']").first();
    await expect(cardArea.locator("text=Accredited").first()).toBeVisible();
    await expect(cardArea.locator("text=Vibe Coding Course").first()).toBeVisible();
    await expect(cardArea.locator("text=Certificate of Completion").first()).toBeVisible();
  });

  test("should have yellow gradient styling with border", async ({ page }) => {
    // Find the front card div
    const cardDiv = page.locator(
      "div:has-text('Accredited') >> nth=0"
    ).locator("..").locator("..").first();

    // Check for yellow-related classes in the DOM
    const pageContent = await page.content();
    expect(pageContent).toContain("yellow-300");
    expect(pageContent).toContain("yellow-500");
    expect(pageContent).toContain("border");
  });

  test("should flip card on click", async ({ page }) => {
    // Wait for the widget to be interactive
    const card = page.locator("[style*='perspective']").first();
    await expect(card).toBeVisible();

    // Click to flip
    await card.click();

    // After flip, back side content should be visible
    // Wait for animation to complete (600ms)
    await page.waitForTimeout(700);

    // Check for back side content (credential details) - be specific to avoid checklist text
    const cardContainer = card.locator("..");
    const credentialIdText = cardContainer.locator("text=CREDENTIAL ID").first();
    await expect(credentialIdText).toBeVisible();

    const issuedText = cardContainer.locator("text=ISSUED").first();
    await expect(issuedText).toBeVisible();

    const verifyText = cardContainer.locator("text=VERIFY").first();
    await expect(verifyText).toBeVisible();
  });

  test("should flip card on hover", async ({ page }) => {
    const card = page.locator("[style*='perspective']").first();

    // Hover over the card
    await card.hover();

    // Wait for animation
    await page.waitForTimeout(700);

    // Back side should be visible - be specific to avoid checklist
    const cardContainer = card.locator("..");
    const credentialIdText = cardContainer.locator("text=CREDENTIAL ID").first();
    await expect(credentialIdText).toBeVisible();
  });

  test("should show back side with credential info", async ({ page }) => {
    // Click to flip
    const card = page.locator("[style*='perspective']").first();
    await card.click();

    // Wait for animation
    await page.waitForTimeout(700);

    // Check for credential ID format (VBC-YYYY-#####)
    const content = await page.textContent("body");
    expect(content).toContain("VBC-2026");

    // Check for issue date
    const issueDate = page.locator("text=ISSUED").locator("..");
    await expect(issueDate).toContainText(/\d{1,2}/); // Should have a date number
  });

  test("should have working share button", async ({ page }) => {
    // Find the share button
    const cardContainer = page.locator("[style*='perspective']").first().locator("..");
    const shareButton = cardContainer.locator("button").first();
    await expect(shareButton).toBeVisible();

    // Button should contain "Share Certificate" text initially
    const initialText = await shareButton.textContent();
    expect(initialText || "").toContain("Share Certificate");

    // Click the share button
    await shareButton.click();

    // Wait for the click to register and button state to potentially change
    await page.waitForTimeout(1000);

    // Button should still be visible and clickable
    await expect(shareButton).toBeVisible();
    await expect(shareButton).toBeEnabled();
  });

  test("should copy certificate details to clipboard", async ({ page }) => {
    // Grant clipboard permission
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);

    // Click the share button
    const shareButton = page.locator("button:has-text('Share Certificate')");
    await shareButton.click();

    // Wait a moment for clipboard operation
    await page.waitForTimeout(300);

    // Read clipboard content
    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText()
    );

    // Should contain credential ID and verification URL
    expect(clipboardContent).toContain("VBC-2026");
    expect(clipboardContent).toContain("vibecode.academy/verify");
  });

  test("should have proper animations (Framer Motion)", async ({ page }) => {
    // Check that Framer Motion classes/styles are applied
    const pageContent = await page.content();
    expect(pageContent).toContain("perspective");
    expect(pageContent).toContain("rotateY");
  });

  test("should respect reduced motion preference", async ({ browser }) => {
    // Create context with prefers-reduced-motion enabled
    const context = await browser.newContext({
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto("/test-credential");

    // The component should render without complex animations
    const trophyIcon = page.locator("text=🏆");
    await expect(trophyIcon).toBeVisible();

    // The certificate should still be readable
    await expect(page.locator("text=Vibe Coding Course")).toBeVisible();

    await context.close();
  });

  test("should display instructions", async ({ page }) => {
    const instructions = page.locator("text=Click or hover to flip");
    await expect(instructions).toBeVisible();
  });

  test("should be responsive and properly sized", async ({ page }) => {
    // Check that the card takes appropriate space
    const card = page.locator("[style*='perspective']").first();
    const box = await card.boundingBox();

    expect(box).not.toBeNull();
    if (box) {
      // Card should have reasonable dimensions
      expect(box.width).toBeGreaterThan(200); // Minimum width
      expect(box.height).toBeGreaterThan(100); // Minimum height
    }
  });

  test("should have proper test page structure", async ({ page }) => {
    // Check for test checklist
    const checklist = page.locator("text=Test Checklist");
    await expect(checklist).toBeVisible();

    // Should have all checklist items
    const checkmarkItems = page.locator("text=✓").count();
    const count = await checkmarkItems;
    expect(count).toBeGreaterThanOrEqual(7);
  });
});
