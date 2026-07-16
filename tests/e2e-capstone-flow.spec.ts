import { test, expect } from '@playwright/test';

test('Learner capstone flow: submit → instructor grades → certificate', async ({ page }) => {
  const testEmail = `capstone-${Date.now()}@test.com`;
  const testPassword = 'TestPassword123!';
  const repoUrl = 'https://github.com/test-user/capstone-project';
  const liveUrl = 'https://capstone-project.vercel.app';

  // Sign up as learner
  await page.goto('http://localhost:3008/signup');
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', testPassword);
  await page.click('button:has-text("Sign Up")');
  await page.waitForURL('http://localhost:3008/dashboard');

  // Navigate to capstone page
  await page.goto('http://localhost:3008/capstone');

  // Verify capstone brief visible
  await expect(page).toContainText('Capstone Project');

  // Fill capstone submission form
  await page.fill('input[name="repo_url"]', repoUrl);
  await page.fill('input[name="live_url"]', liveUrl);
  await page.fill('textarea[name="writeup"]', 'Built a vibe coding platform with auth, quizzes, and gamification.');
  await page.fill('input[name="defense_video_url"]', 'https://youtube.com/watch?v=test123');

  // Submit
  await page.click('button:has-text("Submit Capstone")');

  // Verify submission confirmed
  await expect(page).toContainText('Capstone Submitted');

  // Verify certificate not yet available (awaiting grading)
  const downloadCertLink = page.locator('a:has-text("Download Certificate")');
  await expect(downloadCertLink).not.toBeVisible();

  // Log out as learner
  await page.click('[data-testid="user-menu"]');
  await page.click('button:has-text("Sign Out")');

  // Log in as instructor (assuming instructor account exists)
  const instructorEmail = 'instructor@test.com'; // Pre-existing instructor account
  const instructorPassword = 'InstructorPassword123!';

  await page.goto('http://localhost:3008/login');
  await page.fill('input[name="email"]', instructorEmail);
  await page.fill('input[name="password"]', instructorPassword);
  await page.click('button:has-text("Sign In")');
  await page.waitForURL('http://localhost:3008/dashboard');

  // Navigate to capstone grading page
  await page.goto('http://localhost:3008/admin/capstone-reviews');

  // Find learner's submission
  const submissionRow = page.locator(`text=${testEmail}`);
  await submissionRow.click();

  // Grade capstone (all rubric items)
  // Assume rubric has 4 items scored 1-5
  await page.selectOption('select[name="scope_score"]', '5');
  await page.selectOption('select[name="quality_score"]', '5');
  await page.selectOption('select[name="presentation_score"]', '4');
  await page.selectOption('select[name="impact_score"]', '5');

  // Submit grade
  await page.click('button:has-text("Submit Grade")');

  // Verify grade submitted
  await expect(page).toContainText('Grade Recorded');

  // Log out as instructor
  await page.click('[data-testid="user-menu"]');
  await page.click('button:has-text("Sign Out")');

  // Log back in as learner
  await page.goto('http://localhost:3008/login');
  await page.fill('input[name="email"]', testEmail);
  await page.fill('input[name="password"]', testPassword);
  await page.click('button:has-text("Sign In")');
  await page.waitForURL('http://localhost:3008/dashboard');

  // Navigate to capstone page
  await page.goto('http://localhost:3008/capstone');

  // Verify grade visible
  await expect(page).toContainText('Grade: Pass');

  // Download certificate
  const certDownload = page.waitForEvent('download');
  await page.click('a:has-text("Download Certificate")');
  const download = await certDownload;

  expect(download.suggestedFilename()).toContain('certificate');
});
