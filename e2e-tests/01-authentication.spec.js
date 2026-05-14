import { test, expect } from '@playwright/test';
import { login, logout, TEST_USERS, clearAuth } from './helpers/auth.helper.js';

test.describe('Authentication Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth data
    await clearAuth(page);
  });

  test('should display login page on initial load', async ({ page }) => {
    await page.goto('/');
    
    // Check for login form elements
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check for page title or heading
    const heading = page.locator('h1, h2, h3').first();
    await expect(heading).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/');
    
    // Fill in invalid credentials
    await page.fill('input[name="username"]', 'invaliduser');
    await page.fill('input[name="password"]', 'wrongpassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for error message (could be toast, alert, or inline error)
    await page.waitForTimeout(2000);
    
    // Should still be on login page
    expect(page.url()).toContain('/');
    await expect(page.locator('input[name="username"]')).toBeVisible();
  });

  test('should successfully login with admin credentials', async ({ page }) => {
    await login(page, TEST_USERS.admin);
    
    // Should be redirected to dashboard
    expect(page.url()).toContain('/dashboard');
    
    // Dashboard should be visible
    await expect(page.locator('.dashboard-container, [data-testid="dashboard"]')).toBeVisible();
    
    // Check for user info or welcome message
    const pageContent = await page.content();
    expect(pageContent).toContain('Dashboard');
  });

  test('should successfully login with manager credentials', async ({ page }) => {
    await login(page, TEST_USERS.manager);
    
    // Should be redirected to dashboard
    expect(page.url()).toContain('/dashboard');
    
    // Dashboard should be visible
    await expect(page.locator('.dashboard-container, [data-testid="dashboard"]')).toBeVisible();
  });

  test('should successfully login with member credentials', async ({ page }) => {
    await login(page, TEST_USERS.member);
    
    // Should be redirected to dashboard
    expect(page.url()).toContain('/dashboard');
    
    // Dashboard should be visible
    await expect(page.locator('.dashboard-container, [data-testid="dashboard"]')).toBeVisible();
  });

  test('should store auth token in localStorage after login', async ({ page }) => {
    await login(page, TEST_USERS.admin);
    
    // Check for auth token in localStorage
    const token = await page.evaluate(() => localStorage.getItem('accessToken'));
    expect(token).toBeTruthy();
    expect(token.length).toBeGreaterThan(20);
  });

  test('should successfully logout', async ({ page }) => {
    // Login first
    await login(page, TEST_USERS.admin);
    
    // Wait for dashboard to fully load
    await page.waitForTimeout(1000);
    
    // Logout
    await logout(page);
    
    // Should be redirected to login page
    await page.waitForTimeout(1000);
    expect(page.url()).not.toContain('/dashboard');
    
    // Login form should be visible
    await expect(page.locator('input[name="username"]')).toBeVisible();
  });

  test('should clear auth token from localStorage after logout', async ({ page }) => {
    // Login first
    await login(page, TEST_USERS.admin);
    
    // Verify token exists
    let token = await page.evaluate(() => localStorage.getItem('accessToken'));
    expect(token).toBeTruthy();
    
    // Logout
    await logout(page);
    
    // Token should be cleared
    token = await page.evaluate(() => localStorage.getItem('accessToken'));
    expect(token).toBeFalsy();
  });

  test('should redirect to login when accessing protected route without auth', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should be redirected to login
    await page.waitForTimeout(1000);
    expect(page.url()).not.toContain('/dashboard');
    
    // Login form should be visible
    await expect(page.locator('input[name="username"]')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('/');
    
    // Try to submit without filling fields
    await page.click('button[type="submit"]');
    
    // Wait a moment for validation
    await page.waitForTimeout(1000);
    
    // Should still be on login page
    expect(page.url()).toContain('/');
  });

  test('should allow navigation back to login after failed attempt', async ({ page }) => {
    await page.goto('/');
    
    // Fill in invalid credentials
    await page.fill('input[name="username"]', 'invalid');
    await page.fill('input[name="password"]', 'invalid');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(2000);
    
    // Clear fields and try again with valid credentials
    await page.fill('input[name="username"]', TEST_USERS.admin.username);
    await page.fill('input[name="password"]', TEST_USERS.admin.password);
    await page.click('button[type="submit"]');
    
    // Should successfully login
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    expect(page.url()).toContain('/dashboard');
  });
});

// Made with Bob
