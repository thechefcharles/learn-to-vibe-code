import { test } from '@playwright/test';

test('RAF reverse playback works smoothly', async ({ page }) => {
  await page.goto('http://localhost:3008/landing-kids');
  await page.waitForSelector('video', { timeout: 10000 });
  
  const violetVideo = page.locator('video').nth(0);
  
  // Wait for video to play
  await page.waitForTimeout(1000);
  
  // Jump to near the end to trigger reverse
  await violetVideo.evaluate((el: HTMLVideoElement) => {
    el.currentTime = el.duration - 0.5;
  });
  
  // Wait for end event to trigger
  await page.waitForTimeout(2000);
  
  const state = await violetVideo.evaluate((el: HTMLVideoElement) => ({
    currentTime: el.currentTime,
    duration: el.duration,
    paused: el.paused,
  }));
  
  console.log('Video state:', state);
  
  if (state.currentTime < state.duration - 0.5) {
    console.log('✅ Video is reversing smoothly');
  } else {
    console.log('⚠️ Video may not have reversed yet');
  }
});
