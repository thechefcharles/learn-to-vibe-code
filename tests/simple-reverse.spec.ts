import { test } from '@playwright/test';

test('simple reverse without freezing', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('video', { timeout: 10000 });
  
  const violetVideo = page.locator('video').nth(0);
  
  // Get initial state
  const initialState = await violetVideo.evaluate((el: HTMLVideoElement) => ({
    duration: el.duration,
    playing: !el.paused,
  }));
  console.log('Initial:', initialState);
  
  // Wait for it to play and approach end
  await page.waitForTimeout(7000);
  
  // Check current state
  const midState = await violetVideo.evaluate((el: HTMLVideoElement) => ({
    currentTime: el.currentTime,
    duration: el.duration,
    playing: !el.paused,
  }));
  console.log('After 7s:', midState);
  
  // Wait more to see reverse
  await page.waitForTimeout(3000);
  
  const finalState = await violetVideo.evaluate((el: HTMLVideoElement) => ({
    currentTime: el.currentTime,
    duration: el.duration,
    playing: !el.paused,
  }));
  console.log('After 10s total:', finalState);
  
  if (finalState.currentTime < midState.currentTime) {
    console.log('✅ Reverse is working smoothly!');
  }
});
