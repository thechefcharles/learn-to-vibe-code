import { test } from '@playwright/test';

test('theme switching with longer waits', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('[data-landing-container]', { timeout: 10000 });
  
  const container = page.locator('[data-landing-container]');
  
  // Initial
  const initialBg = await container.evaluate((el: HTMLElement) => 
    window.getComputedStyle(el).backgroundColor
  );
  console.log('Initial bg:', initialBg);
  
  // Click violet
  console.log('Clicking Violet...');
  await page.locator('[title="Violet"]').click();
  await page.waitForTimeout(500);
  const violetBg1 = await container.evaluate((el: HTMLElement) => {
    const computed = window.getComputedStyle(el).backgroundColor;
    const inline = el.style.backgroundColor;
    const bg = el.style.background;
    return { computed, inline, bg };
  });
  console.log('After Violet click:', violetBg1);
  
  // Click dark
  console.log('Clicking Dark...');
  await page.locator('[title="Dark"]').click();
  await page.waitForTimeout(500);
  const darkBg = await container.evaluate((el: HTMLElement) => {
    const computed = window.getComputedStyle(el).backgroundColor;
    const inline = el.style.backgroundColor;
    const bg = el.style.background;
    return { computed, inline, bg };
  });
  console.log('After Dark click:', darkBg);
  
  // Click violet again
  console.log('Clicking Violet again...');
  await page.locator('[title="Violet"]').click();
  await page.waitForTimeout(500);
  const violetBg2 = await container.evaluate((el: HTMLElement) => {
    const computed = window.getComputedStyle(el).backgroundColor;
    const inline = el.style.backgroundColor;
    const bg = el.style.background;
    return { computed, inline, bg };
  });
  console.log('After Violet click again:', violetBg2);
});
