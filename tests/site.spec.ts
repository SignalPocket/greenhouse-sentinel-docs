import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/", "/product/quickstart/", "/product/operations/", "/product/architecture/",
  "/product/troubleshooting/", "/about/how-it-works/", "/about/build-from-scratch/",
  "/about/branding/", "/about/publishing/", "/contributing/writing-guide/",
  "/contributing/accessibility/", "/contributing/release-checklist/",
  "/contributing/automated-testing/", "/contributing/test-results/"
];
const widths = [320, 360, 390, 768, 1024, 1440];

for (const path of pages) {
  test(`@a11y ${path} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(path);
    if (path === "/contributing/test-results/") {
      await expect(page.locator("#test-results")).toHaveAttribute("aria-busy", "false");
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations.filter(({ impact }) =>
      impact === "serious" || impact === "critical"
    )).toEqual([]);
  });
}

for (const path of ["/", "/contributing/test-results/"]) {
  for (const width of widths) {
    test(`@responsive ${path} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      if (path === "/contributing/test-results/") {
        await expect(page.locator("#test-results")).toHaveAttribute("aria-busy", "false");
      }
      const overflow = await page.evaluate(() => {
        const root = document.documentElement;
        if (root.scrollWidth <= root.clientWidth) return [];
        return [...document.querySelectorAll("*")].filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.right > root.clientWidth + 1 || rect.left < -1;
        }).map((element) => {
          const rect = element.getBoundingClientRect();
          return { tag: element.tagName.toLowerCase(), id: element.id,
            classes: element.className, left: rect.left, right: rect.right };
        });
      });
      expect(overflow, JSON.stringify(overflow, null, 2)).toEqual([]);
    });
  }
}
