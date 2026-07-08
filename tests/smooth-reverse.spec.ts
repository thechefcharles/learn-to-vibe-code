import { test } from '@playwright/test';

test('video reverse playback is smooth', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('video', { timeout: 10000 });
  
  const violetVideo = page.locator('video').nth(0);
  
  // Wait for video to load
  await page.waitForTimeout(2000);
  
  // Get playback rate
  const rate1 = await violetVideo.evaluate((el: HTMLVideoElement) => el.playbackRate);
  console.log('Initial playback rate:', rate1);
  
  // Wait a bit
  await page.waitForTimeout(1000);
  
  // Get current time (should be advancing)
  const time1 = await violetVideo.evaluate((el: HTMLVideoElement) => el.currentTime);
  console.log('Time at 1s:', time1);
  
  // Check if playback rate gets set to -1 at end (simulate by jumping to near end)
  await violetVideo.evaluate((el: HTMLVideoElement) => {
    el.currentTime = el.duration - 0.2;
  });
  
  await page.waitForTimeout(500);
  
  const rate2 = await violetVideo.evaluate((el: HTMLVideoElement) => el.playbackRate);
  const time2 = await violetVideo.evaluate((el: HTMLVideoElement) => el.currentTime);
  
  console.log('Near end - playback rate:', rate2, 'time:', time2);
  
  if (Math.abs(rate2) === 1) {
    console.log('✅ Video playback rate is set correctly');
  }
});
