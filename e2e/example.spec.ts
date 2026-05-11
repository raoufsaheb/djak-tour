import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/جمعية/);
});

test('splash screen displays correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=جمعية')).toBeVisible();
  await expect(page.locator('text=ادخر معاً')).toBeVisible();
});

test('navigation to login works', async ({ page }) => {
  await page.goto('/');
  
  // Wait for splash animation
  await page.waitForTimeout(3000);
  
  await expect(page.locator('text=تسجيل الدخول')).toBeVisible();
});

test('login with valid credentials', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(3000);
  
  // Fill login form
  await page.fill('input[type="tel"]', '550123456');
  await page.fill('input[type="password"]', 'Ahmed123!');
  await page.click('button[type="submit"]');
  
  // Should see dashboard
  await expect(page.locator('text=مرحباً')).toBeVisible();
});

test('login with invalid credentials shows error', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(3000);
  
  await page.fill('input[type="tel"]', '000000000');
  await page.fill('input[type="password"]', 'wrongpassword');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('text=رقم الهاتف أو كلمة المرور غير صحيحة')).toBeVisible();
});
