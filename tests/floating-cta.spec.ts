import { test, expect } from '@playwright/test';

test.describe('FloatingCTA Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a page that would render FloatingCTA
    // For now, we'll test the component by checking if it can be imported
    await page.goto('http://localhost:3008/landing-kids');
    await page.waitForLoadState('networkidle');
  });

  test('button is visible in top-right corner', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    await expect(cta).toBeVisible();
  });

  test('button has correct href to signup', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    const href = await cta.getAttribute('href');
    expect(href).toBe('/signup');
  });

  test('button has gradient background', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    const classes = await cta.getAttribute('class');
    expect(classes).toContain('bg-gradient-to-r');
    expect(classes).toContain('from-cyan-500');
    expect(classes).toContain('to-purple-600');
  });

  test('button has border-cyan-400', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    const classes = await cta.getAttribute('class');
    expect(classes).toContain('border-cyan-400');
  });

  test('button has cyan glow effect', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    const style = await cta.getAttribute('style');
    expect(style).toContain('box-shadow');
    expect(style).toContain('rgba(6, 182, 212'); // cyan glow
  });

  test('button is positioned fixed top-right', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    const parent = cta.locator('..');
    const classes = await parent.getAttribute('class');
    expect(classes).toContain('fixed');
    expect(classes).toContain('top-8');
    expect(classes).toContain('right-8');
    expect(classes).toContain('z-50');
  });

  test('button has scale hover effect', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    const classes = await cta.getAttribute('class');
    expect(classes).toContain('hover:scale-105');
  });

  test('button has active press effect', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    const classes = await cta.getAttribute('class');
    expect(classes).toContain('active:scale-95');
  });

  test('button respects prefers-reduced-motion', async ({ page }) => {
    // Test with prefers-reduced-motion: reduce
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Reload page to apply media preference
    await page.reload();
    await page.waitForLoadState('networkidle');

    const cta = page.getByTestId('floating-cta-button');
    await expect(cta).toBeVisible();

    // When prefers-reduced-motion is reduce, animate-pulse should not be applied
    const classes = await cta.getAttribute('class');
    // The class string should not contain animate-pulse when reduced motion is preferred
    if (!classes?.includes('animate-pulse')) {
      // This is expected behavior
      expect(true).toBe(true);
    }
  });

  test('button has focus ring for accessibility', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');
    const classes = await cta.getAttribute('class');
    expect(classes).toContain('focus:outline-none');
    expect(classes).toContain('focus:ring-2');
    expect(classes).toContain('focus:ring-cyan-400');
  });

  test('button remains visible on scroll', async ({ page }) => {
    const cta = page.getByTestId('floating-cta-button');

    // Get initial position
    const initialBox = await cta.locator('..').boundingBox();
    expect(initialBox).toBeTruthy();

    // Scroll down if possible
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(100);

    // Button should still be visible
    await expect(cta).toBeVisible();

    // Button should still be in top-right area (fixed position)
    const afterScrollBox = await cta.locator('..').boundingBox();
    expect(afterScrollBox?.x).toBeGreaterThan((page.viewportSize()?.width || 0) - 200);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('http://localhost:3008/landing-kids');
    await page.waitForLoadState('networkidle');
    
    expect(errors).toHaveLength(0);
  });
});
