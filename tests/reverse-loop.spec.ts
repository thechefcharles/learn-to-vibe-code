import { test } from '@playwright/test';

test('video reverse loop works', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('video', { timeout: 10000 });
  
  const violetVideo = page.locator('video').nth(0);
  
  // Wait for video to be ready and playing
  await page.waitForTimeout(2000);
  
  // Get initial time
  const time1 = await violetVideo.evaluate((el: HTMLVideoElement) => el.currentTime);
  console.log('Initial time:', time1);
  
  // Wait and check if it's progressing
  await page.waitForTimeout(1000);
  const time2 = await violetVideo.evaluate((el: HTMLVideoElement) => el.currentTime);
  console.log('After 1s:', time2);
  
  if (time2 > time1) {
    console.log('✅ Video is playing forward');
  } else {
    console.log('⚠️ Video time not advancing');
  }
  
  // Check video duration
  const duration = await violetVideo.evaluate((el: HTMLVideoElement) => el.duration);
  console.log('Video duration:', duration);
});
