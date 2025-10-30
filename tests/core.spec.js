const { test, expect } = require('@playwright/test');

test.describe('Grind & Brew Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should generate a recipe and display results', async ({ page }) => {
    await page.click('#generateBtn');
    await expect(page.locator('#resultsPanel')).toBeVisible();
    await expect(page.locator('#placeholder')).toBeHidden();
    await expect(page.locator('#totalWater')).not.toHaveText('-');
    await expect(page.locator('#grind')).not.toHaveText('-');
    await expect(page.locator('#temp')).not.toHaveText('-');
  });

  test('timer should start, stop, and reset', async ({ page }) => {
    await expect(page.locator('#timerDisplay')).toHaveText('08:00');

    await page.click('#startTimer');
    await page.waitForTimeout(1500);
    await expect(page.locator('#timerDisplay')).not.toHaveText('08:00');

    await page.click('#stopTimer');
    const stoppedTime = await page.locator('#timerDisplay').textContent();
    await page.waitForTimeout(1000);
    await expect(page.locator('#timerDisplay')).toHaveText(stoppedTime);

    await page.click('#resetTimer');
    await expect(page.locator('#timerDisplay')).toHaveText('08:00');
  });

  test('should display grind equivalents when button is clicked', async ({ page }) => {
    await page.click('#generateBtn');
    await page.click('#showEquivalentsBtn');
    await expect(page.locator('#equivalentsPanel')).toBeVisible();
    await expect(page.locator('#timemoreGrind')).not.toHaveText('-');
    await expect(page.locator('#jUltraGrind')).not.toHaveText('-');
    await expect(page.locator('#kMaxGrind')).not.toHaveText('-');
  });
});
