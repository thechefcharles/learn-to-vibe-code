import { test } from '@playwright/test';

test('video plays on violet theme', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  
  // Wait for page to load
  await page.waitForSelector('video', { timeout: 10000 });
  
  const video = page.locator('video');
  
  // Check initial state
  const initialState = await video.first().evaluate((el: HTMLVideoElement) => ({
    src: el.querySelector('source')?.getAttribute('src'),
    visibility: window.getComputedStyle(el).visibility,
    opacity: window.getComputedStyle(el).opacity,
  }));
  console.log('Initial video state:', initialState);
  
  // Click violet theme button
  const violetBtn = page.locator('[title="Violet"]');
  await violetBtn.click();
  await page.waitForTimeout(600);
  
  // Check state after click
  const afterState = await video.first().evaluate((el: HTMLVideoElement) => ({
    visibility: window.getComputedStyle(el).visibility,
    opacity: window.getComputedStyle(el).opacity,
    paused: el.paused,
    currentTime: el.currentTime,
    readyState: el.readyState,
  }));
  console.log('After violet click:', afterState);
});
