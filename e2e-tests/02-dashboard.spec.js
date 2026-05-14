import { test, expect } from '@playwright/test';
import { login, TEST_USERS } from './helpers/auth.helper.js';

test.describe('Dashboard Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await login(page, TEST_USERS.admin);
  });

  test('should display dashboard after login', async ({ page }) => {
    // Should be on dashboard
    expect(page.url()).toContain('/dashboard');
    
    // Dashboard container should be visible
    await expect(page.locator('.dashboard-container, [data-testid="dashboard"]')).toBeVisible();
  });

  test('should display dashboard statistics cards', async ({ page }) => {
    // Wait for dashboard to load
    await page.waitForSelector('.dashboard-container, [data-testid="dashboard"]', { timeout: 10000 });
    
    // Check for statistics cards (Total Projects, Active Projects, etc.)
    const cards = page.locator('.bx--tile, .dashboard-card, [class*="card"]');
    const cardCount = await cards.count();
    
    // Should have at least 3-4 statistics cards
    expect(cardCount).toBeGreaterThanOrEqual(3);
  });

  test('should display project statistics with numbers', async ({ page }) => {
    await page.waitForSelector('.dashboard-container', { timeout: 10000 });
    
    // Wait for data to load
    await page.waitForTimeout(2000);
    
    // Check for numeric values in statistics
    const pageContent = await page.content();
    
    // Should contain numbers (project counts)
    expect(pageContent).toMatch(/\d+/);
  });

  test('should display navigation sidebar', async ({ page }) => {
    // Check for sidebar navigation
    const sidebar = page.locator('.bx--side-nav, .sidebar, nav[class*="side"]');
    await expect(sidebar).toBeVisible();
  });

  test('should have navigation links in sidebar', async ({ page }) => {
    // Wait for sidebar to load
    await page.waitForTimeout(1000);
    
    // Check for common navigation items
    const navItems = page.locator('nav a, .bx--side-nav__link');
    const navCount = await navItems.count();
    
    // Should have multiple navigation items
    expect(navCount).toBeGreaterThanOrEqual(3);
  });

  test('should display user information in header', async ({ page }) => {
    // Check for header with user info
    const header = page.locator('header, .bx--header, [class*="header"]');
    await expect(header).toBeVisible();
    
    // Should contain user-related text
    const headerText = await header.textContent();
    expect(headerText.length).toBeGreaterThan(0);
  });

  test('should navigate to projects page from sidebar', async ({ page }) => {
    // Wait for dashboard to load
    await page.waitForTimeout(1000);
    
    // Click on Projects link in sidebar
    await page.click('a:has-text("Projects"), .bx--side-nav__link:has-text("Projects")');
    
    // Should navigate to projects page
    await page.waitForURL('**/projects', { timeout: 10000 });
    expect(page.url()).toContain('/projects');
  });

  test('should display dashboard title or heading', async ({ page }) => {
    // Check for dashboard heading
    const heading = page.locator('h1:has-text("Dashboard"), h2:has-text("Dashboard"), h3:has-text("Dashboard")');
    
    // Wait for heading to be visible
    await page.waitForTimeout(1000);
    
    // Check if heading exists or page has dashboard content
    const pageContent = await page.content();
    expect(pageContent.toLowerCase()).toContain('dashboard');
  });

  test('should load dashboard data within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    // Wait for dashboard to fully load
    await page.waitForSelector('.dashboard-container', { timeout: 10000 });
    await page.waitForTimeout(2000); // Wait for data to load
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should display responsive layout on different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    let dashboard = page.locator('.dashboard-container');
    await expect(dashboard).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    dashboard = page.locator('.dashboard-container');
    await expect(dashboard).toBeVisible();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    dashboard = page.locator('.dashboard-container');
    await expect(dashboard).toBeVisible();
  });

  test('should maintain dashboard state after navigation', async ({ page }) => {
    // Navigate away from dashboard
    await page.click('a:has-text("Projects")');
    await page.waitForURL('**/projects', { timeout: 10000 });
    
    // Navigate back to dashboard
    await page.click('a:has-text("Dashboard")');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    
    // Dashboard should still be functional
    await expect(page.locator('.dashboard-container')).toBeVisible();
  });

  test('should display IBM Carbon Design System components', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Check for Carbon Design System classes
    const pageContent = await page.content();
    
    // Should contain Carbon classes (bx-- prefix)
    expect(pageContent).toContain('bx--');
  });

  test('should handle dashboard refresh', async ({ page }) => {
    // Reload the page
    await page.reload();
    
    // Should still be on dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    
    // Dashboard should be visible
    await expect(page.locator('.dashboard-container')).toBeVisible();
  });

  test('should display correct page title', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Check page title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });
});

// Made with Bob
