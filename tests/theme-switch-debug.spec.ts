import { test } from '@playwright/test';

test('theme switching background', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('[data-landing-container]', { timeout: 10000 });
  
  const container = page.locator('[data-landing-container]');
  
  // Get initial state
  const initialBg = await container.evaluate((el: HTMLElement) => 
    window.getComputedStyle(el).backgroundColor
  );
  console.log('Initial bg:', initialBg);
  
  // Click violet (should be transparent)
  await page.locator('[title="Violet"]').click();
  await page.waitForTimeout(300);
  const violetBg1 = await container.evaluate((el: HTMLElement) => 
    window.getComputedStyle(el).backgroundColor
  );
  console.log('After clicking Violet:', violetBg1);
  
  // Click dark theme
  await page.locator('[title="Dark"]').click();
  await page.waitForTimeout(300);
  const darkBg = await container.evaluate((el: HTMLElement) => 
    window.getComputedStyle(el).backgroundColor
  );
  console.log('After clicking Dark:', darkBg);
  
  // Click violet again
  await page.locator('[title="Violet"]').click();
  await page.waitForTimeout(300);
  const violetBg2 = await container.evaluate((el: HTMLElement) => 
    window.getComputedStyle(el).backgroundColor
  );
  console.log('After clicking Violet again:', violetBg2);
});
