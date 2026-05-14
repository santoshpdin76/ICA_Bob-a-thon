/**
 * Authentication Helper for E2E Tests
 * Provides reusable authentication functions
 */

/**
 * Test user credentials
 */
export const TEST_USERS = {
  admin: {
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
    expectedName: 'Admin User'
  },
  manager: {
    username: 'jsmith',
    password: 'password123',
    role: 'Manager',
    expectedName: 'John Smith'
  },
  member: {
    username: 'bwilson',
    password: 'password123',
    role: 'Member',
    expectedName: 'Bob Wilson'
  }
};

/**
 * Login to the application
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Object} user - User credentials object
 * @returns {Promise<void>}
 */
export async function login(page, user) {
  // Navigate to login page
  await page.goto('/');
  
  // Wait for login form to be visible
  await page.waitForSelector('input[name="username"]', { timeout: 10000 });
  
  // Fill in credentials
  await page.fill('input[name="username"]', user.username);
  await page.fill('input[name="password"]', user.password);
  
  // Click login button
  await page.click('button[type="submit"]');
  
  // Wait for navigation to dashboard
  await page.waitForURL('**/dashboard', { timeout: 10000 });
  
  // Wait for dashboard to load
  await page.waitForSelector('.dashboard-container', { timeout: 10000 });
}

/**
 * Logout from the application
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<void>}
 */
export async function logout(page) {
  // Click user menu
  await page.click('[data-testid="user-menu"], .user-menu, button:has-text("Admin"), button:has-text("Manager"), button:has-text("Member")');
  
  // Wait a bit for menu to open
  await page.waitForTimeout(500);
  
  // Click logout button
  await page.click('button:has-text("Logout"), [data-testid="logout-button"]');
  
  // Wait for redirect to login page
  await page.waitForURL('**/', { timeout: 10000 });
}

/**
 * Check if user is logged in
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<boolean>}
 */
export async function isLoggedIn(page) {
  try {
    // Check if we're on dashboard or have the app layout
    const url = page.url();
    return url.includes('/dashboard') || url.includes('/projects');
  } catch (error) {
    return false;
  }
}

/**
 * Get stored auth token from localStorage
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<string|null>}
 */
export async function getAuthToken(page) {
  return await page.evaluate(() => {
    return localStorage.getItem('accessToken');
  });
}

/**
 * Clear all auth data
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {Promise<void>}
 */
export async function clearAuth(page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

// Made with Bob
