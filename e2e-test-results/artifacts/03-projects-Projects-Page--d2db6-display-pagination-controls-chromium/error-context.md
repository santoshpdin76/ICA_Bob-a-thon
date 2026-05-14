# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-projects.spec.js >> Projects Page Functionality >> should display pagination controls
- Location: e2e-tests/03-projects.spec.js:70:7

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('input[name="username"]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e7]:
  - generic [ref=e8]:
    - img [ref=e9]
    - heading "PPM Application" [level=1] [ref=e12]
    - paragraph [ref=e13]: Project Portfolio Management
  - generic [ref=e14]:
    - generic [ref=e15]:
      - generic [ref=e16]: Email
      - generic [ref=e18]:
        - textbox "Email" [ref=e19]:
          - /placeholder: Enter your email
        - alert
    - generic [ref=e20]:
      - text: Password
      - generic [ref=e22]:
        - textbox "Password" [ref=e23]:
          - /placeholder: Enter your password
        - generic [ref=e24]:
          - button "Show password" [ref=e26]:
            - img [ref=e27]
          - tooltip [ref=e30]: Show password
    - button "Sign In" [ref=e31]
  - generic [ref=e32]:
    - paragraph [ref=e33]: "Default credentials for testing:"
    - list [ref=e34]:
      - listitem [ref=e35]:
        - strong [ref=e36]: "Admin:"
        - text: admin@ppm.com / Admin@123
      - listitem [ref=e37]:
        - strong [ref=e38]: "Manager:"
        - text: manager@ppm.com / Manager@123
      - listitem [ref=e39]:
        - strong [ref=e40]: "Member:"
        - text: member@ppm.com / Member@123
```

# Test source

```ts
  1   | /**
  2   |  * Authentication Helper for E2E Tests
  3   |  * Provides reusable authentication functions
  4   |  */
  5   | 
  6   | /**
  7   |  * Test user credentials
  8   |  */
  9   | export const TEST_USERS = {
  10  |   admin: {
  11  |     username: 'admin',
  12  |     password: 'admin123',
  13  |     role: 'Admin',
  14  |     expectedName: 'Admin User'
  15  |   },
  16  |   manager: {
  17  |     username: 'jsmith',
  18  |     password: 'password123',
  19  |     role: 'Manager',
  20  |     expectedName: 'John Smith'
  21  |   },
  22  |   member: {
  23  |     username: 'bwilson',
  24  |     password: 'password123',
  25  |     role: 'Member',
  26  |     expectedName: 'Bob Wilson'
  27  |   }
  28  | };
  29  | 
  30  | /**
  31  |  * Login to the application
  32  |  * @param {import('@playwright/test').Page} page - Playwright page object
  33  |  * @param {Object} user - User credentials object
  34  |  * @returns {Promise<void>}
  35  |  */
  36  | export async function login(page, user) {
  37  |   // Navigate to login page
  38  |   await page.goto('/');
  39  |   
  40  |   // Wait for login form to be visible
> 41  |   await page.waitForSelector('input[name="username"]', { timeout: 10000 });
      |              ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  42  |   
  43  |   // Fill in credentials
  44  |   await page.fill('input[name="username"]', user.username);
  45  |   await page.fill('input[name="password"]', user.password);
  46  |   
  47  |   // Click login button
  48  |   await page.click('button[type="submit"]');
  49  |   
  50  |   // Wait for navigation to dashboard
  51  |   await page.waitForURL('**/dashboard', { timeout: 10000 });
  52  |   
  53  |   // Wait for dashboard to load
  54  |   await page.waitForSelector('.dashboard-container', { timeout: 10000 });
  55  | }
  56  | 
  57  | /**
  58  |  * Logout from the application
  59  |  * @param {import('@playwright/test').Page} page - Playwright page object
  60  |  * @returns {Promise<void>}
  61  |  */
  62  | export async function logout(page) {
  63  |   // Click user menu
  64  |   await page.click('[data-testid="user-menu"], .user-menu, button:has-text("Admin"), button:has-text("Manager"), button:has-text("Member")');
  65  |   
  66  |   // Wait a bit for menu to open
  67  |   await page.waitForTimeout(500);
  68  |   
  69  |   // Click logout button
  70  |   await page.click('button:has-text("Logout"), [data-testid="logout-button"]');
  71  |   
  72  |   // Wait for redirect to login page
  73  |   await page.waitForURL('**/', { timeout: 10000 });
  74  | }
  75  | 
  76  | /**
  77  |  * Check if user is logged in
  78  |  * @param {import('@playwright/test').Page} page - Playwright page object
  79  |  * @returns {Promise<boolean>}
  80  |  */
  81  | export async function isLoggedIn(page) {
  82  |   try {
  83  |     // Check if we're on dashboard or have the app layout
  84  |     const url = page.url();
  85  |     return url.includes('/dashboard') || url.includes('/projects');
  86  |   } catch (error) {
  87  |     return false;
  88  |   }
  89  | }
  90  | 
  91  | /**
  92  |  * Get stored auth token from localStorage
  93  |  * @param {import('@playwright/test').Page} page - Playwright page object
  94  |  * @returns {Promise<string|null>}
  95  |  */
  96  | export async function getAuthToken(page) {
  97  |   return await page.evaluate(() => {
  98  |     return localStorage.getItem('accessToken');
  99  |   });
  100 | }
  101 | 
  102 | /**
  103 |  * Clear all auth data
  104 |  * @param {import('@playwright/test').Page} page - Playwright page object
  105 |  * @returns {Promise<void>}
  106 |  */
  107 | export async function clearAuth(page) {
  108 |   await page.evaluate(() => {
  109 |     localStorage.clear();
  110 |     sessionStorage.clear();
  111 |   });
  112 | }
  113 | 
  114 | // Made with Bob
  115 | 
```