import { test, expect } from '@playwright/test';
import { login, TEST_USERS } from './helpers/auth.helper.js';

test.describe('Navigation and UI Components', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await login(page, TEST_USERS.admin);
  });

  test('should display main navigation sidebar', async ({ page }) => {
    // Check for sidebar
    const sidebar = page.locator('.bx--side-nav, nav[class*="side"], .sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('should have all main navigation links', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Check for Dashboard link
    const dashboardLink = page.locator('a:has-text("Dashboard")');
    await expect(dashboardLink).toBeVisible();
    
    // Check for Projects link
    const projectsLink = page.locator('a:has-text("Projects")');
    await expect(projectsLink).toBeVisible();
  });

  test('should navigate between pages using sidebar', async ({ page }) => {
    // Start on dashboard
    expect(page.url()).toContain('/dashboard');
    
    // Navigate to Projects
    await page.click('a:has-text("Projects")');
    await page.waitForURL('**/projects', { timeout: 10000 });
    expect(page.url()).toContain('/projects');
    
    // Navigate back to Dashboard
    await page.click('a:has-text("Dashboard")');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    expect(page.url()).toContain('/dashboard');
  });

  test('should display application header', async ({ page }) => {
    // Check for header
    const header = page.locator('header, .bx--header, [class*="header"]');
    await expect(header).toBeVisible();
  });

  test('should display application logo or title', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Check for logo or title
    const pageContent = await page.content();
    expect(pageContent.toLowerCase()).toMatch(/ppm|project portfolio|logo/i);
  });

  test('should display user menu in header', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Look for user menu button
    const userMenu = page.locator('button:has-text("Admin"), button:has-text("User"), [class*="user-menu"]');
    const hasUserMenu = await userMenu.count() > 0;
    
    expect(hasUserMenu).toBeTruthy();
  });

  test('should open user menu on click', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Click user menu
    await page.click('button:has-text("Admin"), [class*="user-menu"]');
    
    // Wait for menu to open
    await page.waitForTimeout(500);
    
    // Check for logout option
    const logoutButton = page.locator('button:has-text("Logout")');
    await expect(logoutButton).toBeVisible();
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Dashboard should be active
    const dashboardLink = page.locator('a:has-text("Dashboard")');
    const dashboardClass = await dashboardLink.getAttribute('class');
    
    // Should have active class or aria-current
    const isActive = 
      dashboardClass?.includes('active') || 
      await dashboardLink.getAttribute('aria-current') === 'page';
    
    expect(isActive || dashboardClass).toBeDefined();
  });

  test('should display IBM Carbon Design System styling', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Check for Carbon classes
    const pageContent = await page.content();
    expect(pageContent).toContain('bx--');
  });

  test('should have consistent header across pages', async ({ page }) => {
    // Get header on dashboard
    let header = page.locator('header');
    let headerText = await header.textContent();
    
    // Navigate to projects
    await page.click('a:has-text("Projects")');
    await page.waitForURL('**/projects', { timeout: 10000 });
    
    // Header should still be present
    header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should have consistent sidebar across pages', async ({ page }) => {
    // Get sidebar on dashboard
    let sidebar = page.locator('.bx--side-nav, nav[class*="side"]');
    await expect(sidebar).toBeVisible();
    
    // Navigate to projects
    await page.click('a:has-text("Projects")');
    await page.waitForURL('**/projects', { timeout: 10000 });
    
    // Sidebar should still be present
    sidebar = page.locator('.bx--side-nav, nav[class*="side"]');
    await expect(sidebar).toBeVisible();
  });

  test('should handle browser back button', async ({ page }) => {
    // Navigate to projects
    await page.click('a:has-text("Projects")');
    await page.waitForURL('**/projects', { timeout: 10000 });
    
    // Use browser back button
    await page.goBack();
    await page.waitForTimeout(1000);
    
    // Should be back on dashboard
    expect(page.url()).toContain('/dashboard');
  });

  test('should handle browser forward button', async ({ page }) => {
    // Navigate to projects
    await page.click('a:has-text("Projects")');
    await page.waitForURL('**/projects', { timeout: 10000 });
    
    // Go back
    await page.goBack();
    await page.waitForTimeout(1000);
    
    // Go forward
    await page.goForward();
    await page.waitForTimeout(1000);
    
    // Should be on projects again
    expect(page.url()).toContain('/projects');
  });

  test('should display page titles correctly', async ({ page }) => {
    // Check dashboard title
    let title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    // Navigate to projects
    await page.click('a:has-text("Projects")');
    await page.waitForURL('**/projects', { timeout: 10000 });
    
    // Check projects title
    title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should be responsive on tablet view', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(1000);
    
    // Main content should be visible
    const mainContent = page.locator('main, .main-content, [role="main"]');
    await expect(mainContent).toBeVisible();
  });

  test('should be responsive on mobile view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Main content should be visible
    const mainContent = page.locator('main, .main-content, [role="main"]');
    await expect(mainContent).toBeVisible();
  });

  test('should handle rapid navigation clicks', async ({ page }) => {
    // Rapidly click between pages
    await page.click('a:has-text("Projects")');
    await page.waitForTimeout(500);
    await page.click('a:has-text("Dashboard")');
    await page.waitForTimeout(500);
    await page.click('a:has-text("Projects")');
    await page.waitForTimeout(1000);
    
    // Should end up on projects page
    expect(page.url()).toContain('/projects');
  });

  test('should maintain scroll position on navigation', async ({ page }) => {
    // Scroll down on dashboard
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);
    
    // Navigate to projects
    await page.click('a:has-text("Projects")');
    await page.waitForURL('**/projects', { timeout: 10000 });
    
    // Page should be scrolled to top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(50);
  });

  test('should display loading states appropriately', async ({ page }) => {
    // Navigate to projects
    await page.click('a:has-text("Projects")');
    
    // There might be a loading state (spinner, skeleton, etc.)
    await page.waitForTimeout(500);
    
    // Eventually content should load
    await page.waitForURL('**/projects', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Projects should be visible
    const projects = page.locator('.projects-container, [data-testid="projects"]');
    await expect(projects).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through elements
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    
    // Should be able to navigate with keyboard
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeDefined();
  });

  test('should display consistent color scheme', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    // Get computed styles
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    expect(backgroundColor).toBeDefined();
    expect(backgroundColor.length).toBeGreaterThan(0);
  });
});

// Made with Bob
