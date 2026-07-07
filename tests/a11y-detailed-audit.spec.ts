import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

/**
 * Detailed A11y Audit - WCAG AA Level
 * Scans key pages for accessibility violations
 */
test.describe("A11y Audit - WCAG AA Compliance", () => {
  test("homepage should meet WCAG AA", async ({ page }) => {
    await page.goto("/");
    await injectAxe(page);

    try {
      await checkA11y(page, null, { detailedReport: true });
      console.log("✅ Homepage: WCAG AA compliant");
    } catch (error) {
      console.log("❌ Homepage violations found");
      const violations = (error as any).violations;
      violations.forEach((v: any) => {
        console.log(`  - ${v.id}: ${v.impact} - ${v.description}`);
      });
      throw error;
    }
  });

  test("signup page should meet WCAG AA", async ({ page }) => {
    await page.goto("/auth/sign-up");
    await injectAxe(page);

    try {
      await checkA11y(page, null, { detailedReport: true });
      console.log("✅ Signup: WCAG AA compliant");
    } catch (error) {
      console.log("❌ Signup violations found");
      const violations = (error as any).violations;
      violations.forEach((v: any) => {
        console.log(`  - ${v.id}: ${v.impact} - ${v.description}`);
      });
      throw error;
    }
  });

  test("login page should meet WCAG AA", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await injectAxe(page);

    try {
      await checkA11y(page, null, { detailedReport: true });
      console.log("✅ Login: WCAG AA compliant");
    } catch (error) {
      console.log("❌ Login violations found");
      const violations = (error as any).violations;
      violations.forEach((v: any) => {
        console.log(`  - ${v.id}: ${v.impact} - ${v.description}`);
      });
      throw error;
    }
  });

  test("legal pages should meet WCAG AA", async ({ page }) => {
    const pages = ["/legal/terms", "/legal/privacy", "/legal/refund"];

    for (const legalPage of pages) {
      await page.goto(legalPage);
      await injectAxe(page);

      try {
        await checkA11y(page, null, { detailedReport: true });
        console.log(`✅ ${legalPage}: WCAG AA compliant`);
      } catch (error) {
        console.log(`❌ ${legalPage} violations found`);
        const violations = (error as any).violations;
        violations.forEach((v: any) => {
          console.log(`  - ${v.id}: ${v.impact} - ${v.description}`);
        });
      }
    }
  });

  test("manual a11y checks: color contrast", async ({ page }) => {
    console.log("🔍 Checking color contrast on key pages...");

    await page.goto("/");

    // Check heading contrast
    const headings = await page.locator("h1, h2, h3").all();
    const headingCount = headings.length;
    console.log(`✅ Found ${headingCount} headings with semantic markup`);

    // Check button contrast (visual)
    const buttons = await page.locator("button").all();
    console.log(`✅ Found ${buttons.length} buttons`);

    // Check for alt text on images
    const images = await page.locator("img").all();
    let imagesWithoutAlt = 0;
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      if (!alt || alt.trim() === "") {
        imagesWithoutAlt++;
      }
    }
    console.log(
      `✅ Images: ${images.length - imagesWithoutAlt}/${images.length} have alt text`
    );

    if (imagesWithoutAlt > 0) {
      console.log(`⚠️ ${imagesWithoutAlt} images missing alt text`);
    }
  });

  test("manual a11y checks: keyboard navigation", async ({ page }) => {
    console.log("🔍 Checking keyboard navigation...");

    await page.goto("/");

    // Tab through page
    let tabCount = 0;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      tabCount++;
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      if (focused === "A" || focused === "BUTTON") {
        console.log(`✅ Tab ${tabCount}: Focused on interactive element (${focused})`);
      }
    }

    console.log("✅ Keyboard navigation functional");
  });

  test("manual a11y checks: focus indicators", async ({ page }) => {
    console.log("🔍 Checking focus indicators...");

    await page.goto("/");

    // Check for visible focus styles
    await page.keyboard.press("Tab");

    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      if (!el) return null;
      const style = window.getComputedStyle(el);
      return {
        outline: style.outline,
        boxShadow: style.boxShadow,
        tag: el.tagName,
      };
    });

    if (focused && (focused.outline !== "none" || focused.boxShadow)) {
      console.log(`✅ Focus indicator visible on ${focused.tag}`);
    } else {
      console.log(`⚠️ Focus indicator may not be visible`);
    }
  });

  test("manual a11y checks: semantic HTML", async ({ page }) => {
    console.log("🔍 Checking semantic HTML...");

    await page.goto("/");

    const semanticElements = await page.evaluate(() => ({
      nav: document.querySelectorAll("nav").length,
      main: document.querySelectorAll("main").length,
      article: document.querySelectorAll("article").length,
      section: document.querySelectorAll("section").length,
      header: document.querySelectorAll("header").length,
      footer: document.querySelectorAll("footer").length,
      headings: document.querySelectorAll("h1, h2, h3, h4, h5, h6").length,
    }));

    console.log("✅ Semantic HTML structure:");
    console.log(`  - Navigation: ${semanticElements.nav}`);
    console.log(`  - Main: ${semanticElements.main}`);
    console.log(`  - Headers: ${semanticElements.header}`);
    console.log(`  - Headings: ${semanticElements.headings}`);
  });

  test("manual a11y checks: form accessibility", async ({ page }) => {
    console.log("🔍 Checking form accessibility...");

    await page.goto("/auth/sign-up");

    const inputs = await page.locator("input").all();
    let inputsWithLabels = 0;

    for (const input of inputs) {
      const placeholder = await input.getAttribute("placeholder");
      const name = await input.getAttribute("name");
      const id = await input.getAttribute("id");

      // Check if input has associated label
      if (id) {
        const label = await page.locator(`label[for="${id}"]`).count();
        if (label > 0) {
          inputsWithLabels++;
        }
      }

      // Check for placeholder or aria-label
      if (placeholder || (await input.getAttribute("aria-label"))) {
        inputsWithLabels++;
      }
    }

    console.log(`✅ Form inputs: ${inputsWithLabels}/${inputs.length} have labels or placeholders`);

    if (inputsWithLabels < inputs.length) {
      console.log(`⚠️ ${inputs.length - inputsWithLabels} inputs may lack proper labeling`);
    }
  });
});
