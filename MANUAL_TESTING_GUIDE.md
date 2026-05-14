# 🧪 Manual Testing Guide - PPM Application
## Step-by-Step End-User Testing Instructions

**Last Updated**: May 14, 2026  
**Application Version**: 1.0.0  
**Testing Environment**: Local Development

---

## 🚀 Quick Start - Access the Application

### Step 1: Open Your Browser

1. Open your preferred web browser (Chrome, Firefox, Safari, or Edge)
2. Navigate to: **http://localhost:3000**
3. You should see the PPM Application login page

### Step 2: Verify Servers Are Running

Before testing, ensure both servers are running:

```bash
# Check if frontend is running (should return HTML)
curl http://localhost:3000

# Check if backend is running (should return JSON)
curl http://localhost:3001/health
```

If servers are not running, start them:

```bash
# Terminal 1 - Start Backend
cd ppm-app/backend
npm run dev

# Terminal 2 - Start Frontend
cd ppm-app/frontend
npm run dev
```

---

## 👤 Test User Credentials

Use these credentials to test different user roles:

| Role | Username | Password | Description |
|------|----------|----------|-------------|
| **Admin** | `admin` | `admin123` | Full system access |
| **Manager** | `jsmith` | `password123` | Project management access |
| **Member** | `bwilson` | `password123` | Basic user access |

---

## 📋 Manual Testing Checklist

### ✅ Test 1: Login Page (Initial Load)

**What to Test**: Login page displays correctly

**Steps**:
1. Open http://localhost:3000 in your browser
2. Observe the login page

**Expected Results**:
- ✅ Login form is visible
- ✅ Username input field is present
- ✅ Password input field is present
- ✅ "Sign In" button is visible
- ✅ IBM Carbon Design System styling is applied
- ✅ Page title shows "PPM Application - Project Portfolio Management"

**Screenshot Location**: Take a screenshot for reference

---

### ✅ Test 2: Invalid Login Attempt

**What to Test**: Error handling for invalid credentials

**Steps**:
1. Enter username: `wronguser`
2. Enter password: `wrongpass`
3. Click "Sign In" button
4. Observe the response

**Expected Results**:
- ✅ Error message appears (toast notification or inline error)
- ✅ User remains on login page
- ✅ Form fields are still accessible
- ✅ No crash or blank screen

**Notes**: Error message may appear as a toast notification at the top of the page

---

### ✅ Test 3: Successful Login (Admin User)

**What to Test**: Login with admin credentials

**Steps**:
1. Clear any previous input
2. Enter username: `admin`
3. Enter password: `admin123`
4. Click "Sign In" button
5. Wait for redirect

**Expected Results**:
- ✅ Login successful
- ✅ Redirected to dashboard page (URL changes to /dashboard)
- ✅ Dashboard loads within 2-3 seconds
- ✅ No error messages appear

**URL After Login**: http://localhost:3000/dashboard

---

### ✅ Test 4: Dashboard Display

**What to Test**: Dashboard page content and layout

**Steps**:
1. After logging in, observe the dashboard
2. Look for key elements

**Expected Results**:

**Header Section**:
- ✅ Application logo/title visible
- ✅ User menu button (showing "Admin" or user icon)
- ✅ Header spans full width

**Sidebar Navigation**:
- ✅ Sidebar visible on left side
- ✅ "Dashboard" link present and highlighted
- ✅ "Projects" link present
- ✅ Other navigation items visible

**Main Content Area**:
- ✅ Dashboard heading/title visible
- ✅ Statistics cards displayed (3-4 cards)
- ✅ Cards show project counts or metrics
- ✅ Numbers are visible in cards

**Statistics Cards Should Show**:
- Total Projects count
- Active Projects count
- Completed Projects count
- Other relevant metrics

**Visual Check**:
- ✅ IBM Carbon Design System styling (blue/gray color scheme)
- ✅ Clean, professional layout
- ✅ No overlapping elements
- ✅ Responsive design (resize browser to check)

---

### ✅ Test 5: Navigation to Projects Page

**What to Test**: Navigation from dashboard to projects

**Steps**:
1. From the dashboard, locate the sidebar
2. Click on "Projects" link in the sidebar
3. Wait for page to load

**Expected Results**:
- ✅ URL changes to http://localhost:3000/projects
- ✅ Projects page loads
- ✅ Sidebar remains visible
- ✅ Header remains consistent
- ✅ "Projects" link is now highlighted in sidebar

---

### ✅ Test 6: Projects List Display

**What to Test**: Projects page shows all seeded projects

**Steps**:
1. On the projects page, observe the content
2. Count the number of projects displayed

**Expected Results**:

**Page Layout**:
- ✅ Projects heading/title visible
- ✅ Data table or list view displayed
- ✅ Table headers visible (Name, Status, Priority, Dates, etc.)

**Project Data** (5 projects should be visible):
1. ✅ **Customer Portal Redesign**
   - Status: Active
   - Priority: High
   - Visible in the list

2. ✅ **Data Analytics Platform**
   - Status: Active
   - Priority: Critical
   - Visible in the list

3. ✅ **Mobile App Development**
   - Status: Planning
   - Priority: Medium
   - Visible in the list

4. ✅ **Security Compliance Upgrade**
   - Status: Completed
   - Priority: Critical
   - Visible in the list

5. ✅ **Legacy System Migration**
   - Status: On Hold
   - Priority: Low
   - Visible in the list

**Data Quality**:
- ✅ All project names are readable
- ✅ Status indicators are visible (badges or labels)
- ✅ Priority levels are shown
- ✅ Dates are formatted correctly
- ✅ No "undefined" or "null" values

---

### ✅ Test 7: Search Functionality

**What to Test**: Search/filter projects

**Steps**:
1. Look for a search input field on the projects page
2. If present, type: `Customer`
3. Observe the results

**Expected Results**:
- ✅ Search input field is visible
- ✅ Typing filters the project list
- ✅ Only "Customer Portal Redesign" is shown
- ✅ Other projects are hidden
- ✅ Clear search to see all projects again

**Note**: If search is not implemented, this is expected (placeholder feature)

---

### ✅ Test 8: Pagination Controls

**What to Test**: Pagination functionality

**Steps**:
1. Look for pagination controls at the bottom of the projects list
2. Check for page size selector
3. Try changing items per page

**Expected Results**:
- ✅ Pagination controls visible (if more than default page size)
- ✅ Page numbers or next/previous buttons present
- ✅ Items per page selector works
- ✅ Changing page size updates the display

**Note**: With only 5 projects, pagination may not be active

---

### ✅ Test 9: Navigation Back to Dashboard

**What to Test**: Return to dashboard from projects

**Steps**:
1. From the projects page, click "Dashboard" in the sidebar
2. Wait for page to load

**Expected Results**:
- ✅ URL changes back to /dashboard
- ✅ Dashboard content reappears
- ✅ Statistics cards are still visible
- ✅ "Dashboard" link is highlighted in sidebar
- ✅ No data loss or errors

---

### ✅ Test 10: User Menu Interaction

**What to Test**: User menu functionality

**Steps**:
1. Locate the user menu button in the header (top-right)
2. Click on it
3. Observe the dropdown menu

**Expected Results**:
- ✅ User menu opens
- ✅ User name or role is displayed
- ✅ "Logout" option is visible
- ✅ Menu closes when clicking outside
- ✅ Menu has proper styling

---

### ✅ Test 11: Logout Functionality

**What to Test**: Logout and session termination

**Steps**:
1. Click on user menu button
2. Click "Logout" option
3. Observe the result

**Expected Results**:
- ✅ User is logged out
- ✅ Redirected to login page (URL: http://localhost:3000/)
- ✅ Login form is visible again
- ✅ Cannot access /dashboard without logging in
- ✅ Session is cleared

**Verification**:
- Try accessing http://localhost:3000/dashboard directly
- Should redirect back to login page

---

### ✅ Test 12: Login with Different User Roles

**What to Test**: Different user roles can access the system

**Steps**:
1. Logout if currently logged in
2. Login as Manager:
   - Username: `jsmith`
   - Password: `password123`
3. Verify dashboard access
4. Logout
5. Login as Member:
   - Username: `bwilson`
   - Password: `password123`
6. Verify dashboard access

**Expected Results**:
- ✅ Manager can login successfully
- ✅ Manager sees dashboard
- ✅ Manager can view projects
- ✅ Member can login successfully
- ✅ Member sees dashboard
- ✅ Member can view projects

**Note**: Role-based permissions may show different features for each role

---

### ✅ Test 13: Responsive Design - Desktop

**What to Test**: Application works on desktop screen sizes

**Steps**:
1. Set browser window to full screen (1920x1080 or larger)
2. Navigate through dashboard and projects pages
3. Observe layout

**Expected Results**:
- ✅ Sidebar is fully visible
- ✅ Content uses available space efficiently
- ✅ Statistics cards are arranged in rows
- ✅ Table columns are all visible
- ✅ No horizontal scrolling needed
- ✅ Text is readable

---

### ✅ Test 14: Responsive Design - Tablet

**What to Test**: Application works on tablet screen sizes

**Steps**:
1. Resize browser window to ~768px width
2. Navigate through pages
3. Observe layout changes

**Expected Results**:
- ✅ Layout adjusts to smaller width
- ✅ Sidebar may collapse or become a hamburger menu
- ✅ Statistics cards stack vertically
- ✅ Table remains usable (may scroll horizontally)
- ✅ All content is accessible
- ✅ Touch-friendly button sizes

---

### ✅ Test 15: Responsive Design - Mobile

**What to Test**: Application works on mobile screen sizes

**Steps**:
1. Resize browser window to ~375px width (iPhone size)
2. Navigate through pages
3. Test all interactions

**Expected Results**:
- ✅ Mobile-optimized layout
- ✅ Sidebar becomes hamburger menu
- ✅ Statistics cards stack vertically
- ✅ Table adapts to small screen
- ✅ Buttons are touch-friendly
- ✅ Text remains readable
- ✅ No content is cut off

---

### ✅ Test 16: Browser Back/Forward Buttons

**What to Test**: Browser navigation works correctly

**Steps**:
1. Login and go to dashboard
2. Navigate to projects page
3. Click browser back button
4. Click browser forward button

**Expected Results**:
- ✅ Back button returns to dashboard
- ✅ Forward button goes to projects
- ✅ Page state is maintained
- ✅ No errors occur
- ✅ User remains logged in

---

### ✅ Test 17: Page Refresh

**What to Test**: Application handles page refresh

**Steps**:
1. Login and navigate to dashboard
2. Press F5 or Cmd+R to refresh
3. Navigate to projects page
4. Refresh again

**Expected Results**:
- ✅ Page reloads successfully
- ✅ User remains logged in
- ✅ Data is still displayed
- ✅ No errors occur
- ✅ Session persists

---

### ✅ Test 18: Direct URL Access

**What to Test**: Protected routes require authentication

**Steps**:
1. Logout completely
2. Try to access http://localhost:3000/dashboard directly
3. Try to access http://localhost:3000/projects directly

**Expected Results**:
- ✅ Redirected to login page
- ✅ Cannot access protected routes without login
- ✅ After login, can access all routes
- ✅ Security is enforced

---

### ✅ Test 19: API Integration

**What to Test**: Frontend successfully communicates with backend

**Steps**:
1. Open browser developer tools (F12)
2. Go to Network tab
3. Login to the application
4. Navigate to projects page
5. Observe network requests

**Expected Results**:
- ✅ Login API call succeeds (POST /api/v1/auth/login)
- ✅ Projects API call succeeds (GET /api/v1/projects)
- ✅ Status codes are 200 (success)
- ✅ Response data contains project information
- ✅ No 404 or 500 errors
- ✅ Authentication headers are sent

**Network Requests to Verify**:
```
POST http://localhost:3001/api/v1/auth/login
Response: 200 OK, contains user data and tokens

GET http://localhost:3001/api/v1/projects
Response: 200 OK, contains array of 5 projects
```

---

### ✅ Test 20: Performance Check

**What to Test**: Application loads quickly

**Steps**:
1. Clear browser cache
2. Open http://localhost:3000
3. Time how long it takes to see the login page
4. Login and time dashboard load
5. Navigate to projects and time the load

**Expected Results**:
- ✅ Login page loads in < 2 seconds
- ✅ Dashboard loads in < 3 seconds after login
- ✅ Projects page loads in < 2 seconds
- ✅ No long loading spinners
- ✅ Smooth transitions between pages

**Performance Metrics**:
- Initial page load: < 2s
- Login response: < 500ms
- API calls: < 200ms
- Page transitions: < 1s

---

## 🎨 Visual Quality Checklist

### IBM Carbon Design System

Check that the application uses IBM Carbon components:

- ✅ **Color Scheme**: Blue and gray tones
- ✅ **Typography**: IBM Plex Sans font family
- ✅ **Buttons**: Carbon button styles (primary, secondary)
- ✅ **Forms**: Carbon input fields with proper styling
- ✅ **Tables**: Carbon data table component
- ✅ **Navigation**: Carbon side navigation
- ✅ **Header**: Carbon header component
- ✅ **Icons**: Carbon icons (if used)
- ✅ **Spacing**: Consistent padding and margins
- ✅ **Shadows**: Subtle elevation shadows

### UI/UX Quality

- ✅ **Consistency**: Same header and sidebar on all pages
- ✅ **Readability**: Text is clear and easy to read
- ✅ **Contrast**: Good color contrast for accessibility
- ✅ **Alignment**: Elements are properly aligned
- ✅ **Spacing**: Adequate white space between elements
- ✅ **Feedback**: Visual feedback on button clicks
- ✅ **Loading States**: Indicators when data is loading
- ✅ **Error Messages**: Clear and helpful error messages

---

## 🐛 Common Issues and Solutions

### Issue 1: Login Page Not Loading

**Symptoms**: Blank page or "Cannot connect" error

**Solutions**:
1. Check if frontend server is running: `curl http://localhost:3000`
2. Restart frontend: `cd ppm-app/frontend && npm run dev`
3. Clear browser cache and reload
4. Check browser console for errors (F12)

### Issue 2: Login Fails

**Symptoms**: Error message after entering credentials

**Solutions**:
1. Check if backend server is running: `curl http://localhost:3001/health`
2. Restart backend: `cd ppm-app/backend && npm run dev`
3. Verify database is running: `psql -U santoshprasad -d ppm_db -c "SELECT COUNT(*) FROM users;"`
4. Check credentials are correct (see table above)

### Issue 3: Projects Page Empty

**Symptoms**: No projects displayed

**Solutions**:
1. Check if database has data: `psql -U santoshprasad -d ppm_db -c "SELECT COUNT(*) FROM projects;"`
2. Re-seed database: `cd ppm-app/backend && npm run seed`
3. Check browser console for API errors
4. Verify backend API: `curl http://localhost:3001/api/v1/projects -H "Authorization: Bearer YOUR_TOKEN"`

### Issue 4: Styling Looks Wrong

**Symptoms**: Plain HTML with no styling

**Solutions**:
1. Check if CSS files are loading (Network tab in DevTools)
2. Clear browser cache
3. Restart frontend server
4. Check for console errors related to CSS

### Issue 5: Cannot Logout

**Symptoms**: Logout button doesn't work

**Solutions**:
1. Check browser console for JavaScript errors
2. Try clearing localStorage manually: Open DevTools → Application → Local Storage → Clear
3. Close and reopen browser
4. Restart frontend server

---

## 📊 Test Results Template

Use this template to record your test results:

```
# Manual Testing Results - [Your Name]
Date: [Date]
Browser: [Chrome/Firefox/Safari/Edge]
Screen Size: [Desktop/Tablet/Mobile]

## Test Results

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | Login Page Display | ✅ Pass | |
| 2 | Invalid Login | ✅ Pass | |
| 3 | Successful Login | ✅ Pass | |
| 4 | Dashboard Display | ✅ Pass | |
| 5 | Navigate to Projects | ✅ Pass | |
| 6 | Projects List | ✅ Pass | |
| 7 | Search Functionality | ⚠️ N/A | Not implemented |
| 8 | Pagination | ⚠️ N/A | Not needed (5 items) |
| 9 | Back to Dashboard | ✅ Pass | |
| 10 | User Menu | ✅ Pass | |
| 11 | Logout | ✅ Pass | |
| 12 | Different Roles | ✅ Pass | |
| 13 | Desktop Responsive | ✅ Pass | |
| 14 | Tablet Responsive | ✅ Pass | |
| 15 | Mobile Responsive | ✅ Pass | |
| 16 | Browser Navigation | ✅ Pass | |
| 17 | Page Refresh | ✅ Pass | |
| 18 | Direct URL Access | ✅ Pass | |
| 19 | API Integration | ✅ Pass | |
| 20 | Performance | ✅ Pass | |

## Overall Assessment

Pass Rate: __/20 (___%)
Critical Issues: [None/List]
Minor Issues: [None/List]
Recommendations: [Your recommendations]
```

---

## 🎯 Success Criteria

The application passes manual testing if:

- ✅ **Authentication**: All 3 user roles can login and logout
- ✅ **Navigation**: Can navigate between all pages
- ✅ **Data Display**: All 5 projects are visible with correct data
- ✅ **Responsive**: Works on desktop, tablet, and mobile
- ✅ **Performance**: Pages load within acceptable time
- ✅ **Stability**: No crashes or errors during normal use
- ✅ **UI/UX**: IBM Carbon Design System properly implemented
- ✅ **Security**: Protected routes require authentication

**Minimum Pass Rate**: 18/20 tests (90%)

---

## 📞 Need Help?

If you encounter issues:

1. **Check Server Logs**:
   ```bash
   tail -f /tmp/backend.log
   tail -f /tmp/frontend.log
   ```

2. **Check Browser Console**: Press F12 and look for errors

3. **Restart Servers**:
   ```bash
   # Kill all node processes
   pkill -9 node
   
   # Restart backend
   cd ppm-app/backend && npm run dev
   
   # Restart frontend
   cd ppm-app/frontend && npm run dev
   ```

4. **Database Issues**:
   ```bash
   # Check database connection
   psql -U santoshprasad -d ppm_db -c "\dt"
   
   # Re-seed if needed
   cd ppm-app/backend && npm run seed
   ```

---

## 📝 Additional Notes

- **Test Duration**: Allow 30-45 minutes for complete testing
- **Browser**: Chrome or Firefox recommended for best experience
- **Screen Recording**: Consider recording your testing session
- **Screenshots**: Take screenshots of any issues found
- **Documentation**: Note any unexpected behavior

---

**Happy Testing! 🎉**

If all tests pass, your PPM application is ready for production deployment!