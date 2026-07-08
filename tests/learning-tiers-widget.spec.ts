import { test, expect } from '@playwright/test';

test.describe('LearningTiersWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3008/landing-kids', { waitUntil: 'networkidle' });
  });

  test('should render 4 tier cards with correct names', async ({ page }) => {
    // Find the Interactive Tier Explorer section
    const tierExplorer = page.locator('text=Interactive Tier Explorer');
    await expect(tierExplorer).toBeVisible();

    // Check for all 4 tier cards
    const foundationsCard = page.locator('button:has-text("Foundations")');
    const buildingCard = page.locator('button:has-text("Building")');
    const productionCard = page.locator('button:has-text("Production")');
    const landscapeCard = page.locator('button:has-text("Landscape")');

    await expect(foundationsCard).toBeVisible();
    await expect(buildingCard).toBeVisible();
    await expect(productionCard).toBeVisible();
    await expect(landscapeCard).toBeVisible();
  });

  test('should display module counts on tier cards', async ({ page }) => {
    const tiersContainer = page.locator('text=Interactive Tier Explorer').locator('..');

    // Each tier card should show "N modules"
    const foundationsText = page.locator('button:has-text("Foundations")');
    const text = await foundationsText.innerText();

    // Should contain both tier name and module count
    expect(text).toContain('Foundations');
    expect(text).toMatch(/\d+\s+modules/i);
  });

  test('should expand Foundations tier on click', async ({ page }) => {
    const foundationsBtn = page.locator('button:has-text("Foundations")');
    await foundationsBtn.click();

    // Wait for expansion animation
    await page.waitForTimeout(400);

    // Check for expanded content
    const expandedText = page.locator('text=Foundations Modules');
    await expect(expandedText).toBeVisible();

    // Should show Module list
    const moduleText = page.locator('text=Module 0');
    await expect(moduleText).toBeVisible();
  });

  test('should expand Building tier on click', async ({ page }) => {
    const buildingBtn = page.locator('button:has-text("Building")');
    await buildingBtn.click();

    await page.waitForTimeout(400);

    const expandedText = page.locator('text=Building Modules');
    await expect(expandedText).toBeVisible();

    const moduleText = page.locator('text=Module 4');
    await expect(moduleText).toBeVisible();
  });

  test('should expand Production tier on click', async ({ page }) => {
    const productionBtn = page.locator('button:has-text("Production")');
    await productionBtn.click();

    await page.waitForTimeout(400);

    const expandedText = page.locator('text=Production Modules');
    await expect(expandedText).toBeVisible();

    const moduleText = page.locator('text=Module 10');
    await expect(moduleText).toBeVisible();
  });

  test('should expand Landscape tier on click', async ({ page }) => {
    const landscapeBtn = page.locator('button:has-text("Landscape")');
    await landscapeBtn.click();

    await page.waitForTimeout(400);

    const expandedText = page.locator('text=Landscape Modules');
    await expect(expandedText).toBeVisible();

    const moduleText = page.locator('text=Module 13');
    await expect(moduleText).toBeVisible();
  });

  test('should collapse tier on second click', async ({ page }) => {
    const foundationsBtn = page.locator('button:has-text("Foundations")');

    // Click to expand
    await foundationsBtn.click();
    await page.waitForTimeout(400);

    let expandedText = page.locator('text=Foundations Modules');
    await expect(expandedText).toBeVisible();

    // Click to collapse
    await foundationsBtn.click();
    await page.waitForTimeout(400);

    expandedText = page.locator('text=Foundations Modules');
    await expect(expandedText).not.toBeVisible();
  });

  test('should show ring on active tier', async ({ page }) => {
    const foundationsBtn = page.locator('button:has-text("Foundations")');
    await foundationsBtn.click();

    // Check if ring class is applied
    const className = await foundationsBtn.getAttribute('class');
    expect(className).toContain('ring');
    expect(className).toContain('ring-white');
  });

  test('should display correct gradient colors', async ({ page }) => {
    const foundationsBtn = page.locator('button:has-text("Foundations")');
    const buildingBtn = page.locator('button:has-text("Building")');
    const productionBtn = page.locator('button:has-text("Production")');
    const landscapeBtn = page.locator('button:has-text("Landscape")');

    // Check gradient classes
    const foundationsClass = await foundationsBtn.getAttribute('class');
    const buildingClass = await buildingBtn.getAttribute('class');
    const productionClass = await productionBtn.getAttribute('class');
    const landscapeClass = await landscapeBtn.getAttribute('class');

    expect(foundationsClass).toMatch(/from-blue.*to-cyan|to-cyan.*from-blue/);
    expect(buildingClass).toMatch(/from-purple.*to-pink|to-pink.*from-purple/);
    expect(productionClass).toMatch(/from-green.*to-emerald|to-emerald.*from-green/);
    expect(landscapeClass).toMatch(/from-orange.*to-red|to-red.*from-orange/);
  });

  test('should allow switching between tiers', async ({ page }) => {
    // Open Foundations
    let foundationsBtn = page.locator('button:has-text("Foundations")');
    await foundationsBtn.click();
    await page.waitForTimeout(400);

    let foundationsDetails = page.locator('text=Foundations Modules');
    await expect(foundationsDetails).toBeVisible();

    // Open Building
    let buildingBtn = page.locator('button:has-text("Building")');
    await buildingBtn.click();
    await page.waitForTimeout(400);

    foundationsDetails = page.locator('text=Foundations Modules');
    let buildingDetails = page.locator('text=Building Modules');

    // Foundations should be hidden, Building should be visible
    await expect(foundationsDetails).not.toBeVisible();
    await expect(buildingDetails).toBeVisible();
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Interact with widget
    const foundationsBtn = page.locator('button:has-text("Foundations")');
    await foundationsBtn.click();
    await page.waitForTimeout(500);

    expect(errors.length).toBe(0);
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab through the page
    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => {
      const elem = document.activeElement;
      return elem?.tagName;
    });

    expect(['BUTTON', 'A', 'INPUT']).toContain(focused);
  });

  test('should work with hover interactions', async ({ page }) => {
    const foundationsBtn = page.locator('button:has-text("Foundations")');

    // Hover over button
    await foundationsBtn.hover();
    await page.waitForTimeout(200);

    // Button should still be visible and interactive
    await expect(foundationsBtn).toBeVisible();

    // Click should still work
    await foundationsBtn.click();
    await page.waitForTimeout(400);

    const expandedText = page.locator('text=Foundations Modules');
    await expect(expandedText).toBeVisible();
  });
});
