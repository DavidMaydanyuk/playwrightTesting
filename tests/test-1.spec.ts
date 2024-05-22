import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=ckjkfjbgkdbvj&oq=ckjkfjbgkdbvj&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDEwMzVqMGoyqAIAsAIB&sourceid=chrome&ie=UTF-8');
  await page.locator('.jw8mI').click();
  await page.locator('.jw8mI').click();
  await page.getByRole('button', { name: 'Odrzuć wszystko' }).click();
  await page.getByRole('link', { name: 'Uniwersytet Wrocławski:' }).click();
  await page.locator('#bs-cookies-overlay').click();
  await page.getByLabel('No, leave the page:').click();
  await page.getByRole('link', { name: 'Powiatowy Urząd Pracy we Wroc' }).click();
});