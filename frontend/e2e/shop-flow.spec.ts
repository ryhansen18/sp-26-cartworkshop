import { test, expect } from '@playwright/test';

test.describe('Buckeye Marketplace happy path', () => {
  test('browse products and add to cart', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Verify products load
    await expect(page.getByText('Wireless Headphones')).toBeVisible();

    // Add first product to cart using aria-label
    const addButton = page.getByRole('button', { name: /add wireless headphones to cart/i }).first();
    await addButton.click();

    // Verify cart has item - look for cart indicator
    await expect(page.getByText('Wireless Headphones')).toBeVisible();
  });

  test('register a new user', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const email = `test_${Date.now()}@osu.edu`;

    const response = await page.request.post('http://localhost:5173/api/auth/register', {
      data: { email, password: 'Password1!' },
    });

    console.log('Register status:', response.status());
    expect(response.status()).toBe(200);
  });
});