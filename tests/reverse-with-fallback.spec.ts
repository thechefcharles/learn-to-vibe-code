import { test } from '@playwright/test';

test('video reverses with fallback mechanisms', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('video', { timeout: 10000 });
  
  const violetVideo = page.locator('video').nth(0);
  
  // Wait for video metadata to load
  await violetVideo.evaluate((el: HTMLVideoElement) => {
    return new Promise((resolve) => {
      if (el.readyState >= 1) resolve(null);
      else el.addEventListener('loadedmetadata', () => resolve(null), { once: true });
    });
  });
  
  // Start playing
  await violetVideo.evaluate((el: HTMLVideoElement) => {
    el.currentTime = 0;
    el.play();
  });
  
  // Wait for it to play
  await page.waitForTimeout(500);
  
  // Jump to near the end
  const duration = await violetVideo.evaluate((el: HTMLVideoElement) => el.duration);
  console.log('Video duration:', duration);
  
  await violetVideo.evaluate((el: HTMLVideoElement) => {
    el.currentTime = el.duration - 0.3;
  });
  
  // Wait for reverse to trigger
  await page.waitForTimeout(1500);
  
  // Check if it reversed
  const finalTime = await violetVideo.evaluate((el: HTMLVideoElement) => el.currentTime);
  console.log('Final time:', finalTime);
  
  if (finalTime < duration - 0.3) {
    console.log('✅ Video is reversing!');
  } else {
    console.log('❌ Video did NOT reverse');
  }
});
