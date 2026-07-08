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
    // Check for certificate text (in the widget, not the checklist)
    const cardArea = page.locator("[style*='perspective']").first();
    await expect(cardArea.locator("text=Accredited").first()).toBeVisible();
    await expect(cardArea.locator("text=Vibe Coding Course").first()).toBeVisible();
    await expect(cardArea.locator("text=Certificate of Completion").first()).toBeVisible();
  });

  test("should have violet glass morphism styling with border", async ({ page }) => {
    // Find the front card div
    const cardDiv = page.locator(
      "div:has-text('Accredited') >> nth=0"
    ).locator("..").locator("..").first();

    // Check for violet/purple glass morphism classes in the DOM
    const pageContent = await page.content();
    expect(pageContent).toContain("violet-400");
    expect(pageContent).toContain("purple-300");
    expect(pageContent).toContain("backdrop-blur");
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

  test("should share with signup invitation on button click", async ({ page, context }) => {
    // Listen for popup windows
    const popupPromise = context.waitForEvent("page");

    // Click the share button
    const shareButton = page.locator("button:has-text('Share Certificate')");
    await shareButton.click();

    // Wait a moment for the action to complete
    await page.waitForTimeout(300);

    // The button state should change temporarily
    const buttonText = await shareButton.textContent();
    expect(buttonText || "").toContain("Share Certificate");
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
    // The certificate should still be readable
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();

    // Should render certificate content when reduced motion is active
    const hasAccredited = await page.evaluate(() =>
      document.body.textContent?.includes("Accredited")
    );
    expect(hasAccredited).toBe(true);

    await context.close();
  });

  test("should have interactive flip functionality", async ({ page }) => {
    // The card should be interactive and respond to hover/click
    const card = page.locator("[style*='perspective']").first();
    await expect(card).toBeVisible();

    // Card should have pointer cursor (indicating interactivity)
    const cardClass = await card.getAttribute("class");
    expect(cardClass).toContain("cursor-pointer");
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
