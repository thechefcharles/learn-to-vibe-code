import { test } from '@playwright/test';

test('Check quiz page content', async ({ page }) => {
  console.log('\n🧪 Checking quiz page...\n');

  await page.goto('http://localhost:3008/course/0/quiz');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // Get page info
  console.log('📍 Current URL:', page.url());

  const pageText = await page.locator('body').textContent();
  console.log('\n📄 PAGE TEXT (first 800 chars):');
  console.log(pageText?.substring(0, 800) || '(empty)');

  // Check for auth
  console.log('\n🔐 AUTH CHECK:');
  const hasLoginInput = await page.locator('input[type="email"]').count();
  const hasPasswordInput = await page.locator('input[type="password"]').count();
  const hasSigninButton = await page.locator('button:has-text("Sign in")').count();
  console.log(`   Email inputs: ${hasLoginInput}`);
  console.log(`   Password inputs: ${hasPasswordInput}`);
  console.log(`   Sign-in buttons: ${hasSigninButton}`);

  if (hasLoginInput > 0 || hasSigninButton > 0) {
    console.log('\n⚠️  PAGE IS SHOWING LOGIN FORM - USER NOT AUTHENTICATED!');
  }

  // Check for quiz
  console.log('\n📝 QUIZ CHECK:');
  const hasQuestion = pageText?.includes('Question') ? 'yes' : 'no';
  const hasQuiz = pageText?.includes('quiz') ? 'yes' : 'no';
  const hasForm = pageText?.includes('form') ? 'yes' : 'no';
  console.log(`   Contains "Question": ${hasQuestion}`);
  console.log(`   Contains "quiz": ${hasQuiz}`);
  console.log(`   Contains "form": ${hasForm}`);

  const buttons = await page.locator('button').allTextContents();
  console.log(`\n🔘 BUTTONS ON PAGE:`);
  buttons.forEach((text, i) => {
    if (text.trim()) console.log(`   ${i + 1}. ${text.trim().substring(0, 50)}`);
  });
});
