# Deploy NOW - Step-by-Step Checklist

Follow these exact steps. Check each box as you complete it. **Total time: 15 minutes**

---

## Part 1: Deploy Backend on Render (8 minutes)

### Step 1: Sign Up for Render
- [ ] Go to https://render.com/
- [ ] Click **"Get Started for Free"**
- [ ] Sign up with GitHub (easiest) or email
- [ ] Verify your email if needed

### Step 2: Create PostgreSQL Database
- [ ] In Render dashboard, click **"New +"** (top right)
- [ ] Select **"PostgreSQL"**
- [ ] Fill in:
  - **Name**: `ppm-database`
  - **Database**: `ppm_db`
  - **User**: `ppm_user`
  - **Region**: Choose closest to you (e.g., Oregon)
- [ ] Click **"Create Database"**
- [ ] Wait 2-3 minutes for database to be ready
- [ ] **IMPORTANT**: Copy the **"Internal Database URL"** (you'll need this)

### Step 3: Deploy Backend Service
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Click **"Connect a repository"**
- [ ] Authorize GitHub if prompted
- [ ] Select repository: **`santoshprasad76/ICA_Bob-a-thon`**
- [ ] Fill in:
  - **Name**: `ppm-backend`
  - **Root Directory**: `backend`
  - **Environment**: `Node`
  - **Region**: Same as database
  - **Branch**: `main`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
- [ ] Select **"Free"** plan
- [ ] Click **"Advanced"** to add environment variables

### Step 4: Add Environment Variables
Click **"Add Environment Variable"** for each:

- [ ] **NODE_ENV** = `production`
- [ ] **PORT** = `3001`
- [ ] **JWT_SECRET** = `your-super-secret-jwt-key-change-this-to-something-random`
- [ ] **JWT_EXPIRES_IN** = `7d`
- [ ] **DATABASE_URL** = Paste the Internal Database URL from Step 2
- [ ] **CORS_ORIGIN** = `https://your-app.netlify.app` (we'll update this later)

- [ ] Click **"Create Web Service"**
- [ ] Wait 3-5 minutes for deployment to complete
- [ ] Look for **"Live"** status with green checkmark

### Step 5: Get Backend URL
- [ ] In your backend service, go to **Settings** → **"Networking"**
- [ ] Find your service URL (e.g., `https://ppm-backend-xyz.onrender.com`)
- [ ] **COPY THIS URL** - you'll need it for frontend

### Step 6: Seed the Database
- [ ] In your backend service, click **"Shell"** tab (top menu)
- [ ] Wait for shell to connect
- [ ] Type: `node src/database/seed.js`
- [ ] Press Enter
- [ ] Wait for "🎉 Database seeding completed successfully!"
- [ ] You should see: "60 sample projects created"

---

## Part 2: Deploy Frontend on Netlify (5 minutes)

### Step 1: Sign Up for Netlify
- [ ] Go to https://netlify.com/
- [ ] Click **"Sign up"**
- [ ] Sign up with GitHub (easiest)
- [ ] Authorize Netlify to access your repositories

### Step 2: Deploy Frontend
- [ ] Click **"Add new site"** → **"Import an existing project"**
- [ ] Click **"Deploy with GitHub"**
- [ ] Select repository: **`santoshprasad76/ICA_Bob-a-thon`**
- [ ] Configure build settings:
  - **Base directory**: `frontend`
  - **Build command**: `npm run build`
  - **Publish directory**: `frontend/dist`
- [ ] Click **"Show advanced"** → **"New variable"**

### Step 3: Add Environment Variable
- [ ] **Key**: `VITE_API_URL`
- [ ] **Value**: `https://your-backend-url.onrender.com/api/v1`
  - Replace with YOUR actual Render backend URL from Part 1, Step 5
  - **IMPORTANT**: Add `/api/v1` at the end!

- [ ] Click **"Deploy site"**
- [ ] Wait 2-3 minutes for deployment
- [ ] Look for **"Published"** status

### Step 4: Get Frontend URL
- [ ] Find your site URL (e.g., `https://random-name-123.netlify.app`)
- [ ] **COPY THIS URL**
- [ ] Click on the URL to test (you should see login page)

---

## Part 3: Update CORS (2 minutes)

### Step 1: Update Backend CORS Setting
- [ ] Go back to Render dashboard
- [ ] Open your **ppm-backend** service
- [ ] Go to **"Environment"** tab
- [ ] Find **CORS_ORIGIN** variable
- [ ] Click **"Edit"**
- [ ] Update value to your Netlify URL: `https://your-actual-site.netlify.app`
- [ ] Click **"Save Changes"**
- [ ] Render will automatically redeploy (wait 1-2 minutes)

---

## Part 4: Test Your Deployment! 🎉

### Step 1: Open Your App
- [ ] Go to your Netlify URL
- [ ] You should see the black & gold login page

### Step 2: Login
Try these credentials:
- [ ] **Admin**: Username: `admin`, Password: `admin123`
- [ ] **Manager**: Username: `jsmith`, Password: `password123`
- [ ] **Member**: Username: `bwilson`, Password: `password123`

### Step 3: Verify Features
- [ ] Dashboard loads with statistics
- [ ] Projects page shows 60 projects
- [ ] Navigation works (Dashboard, Projects, Tasks, Resources, Reports)
- [ ] Logout works

---

## ✅ Deployment Complete!

**Your URLs:**
- Frontend: `https://your-site.netlify.app`
- Backend: `https://your-backend.onrender.com`
- Database: Managed by Render

**What you have:**
- ✅ Professional black & gold theme
- ✅ 60 sample projects
- ✅ 16 users (1 admin, 10 managers, 5 members)
- ✅ Secure authentication
- ✅ Free hosting (90 days database, forever frontend/backend)

---

## Troubleshooting

### Frontend shows "Network Error"
- Check CORS_ORIGIN in Render backend matches your Netlify URL exactly
- Make sure VITE_API_URL in Netlify includes `/api/v1` at the end

### Backend shows "Database connection failed"
- Check DATABASE_URL in Render backend environment variables
- Make sure PostgreSQL database is running (green status)

### Login doesn't work
- Make sure you ran the seed script in backend shell
- Check backend logs in Render for errors

### Need to update environment variables?
- **Render**: Environment tab → Edit → Save (auto-redeploys)
- **Netlify**: Site settings → Environment variables → Edit → Redeploy

---

## Cost Breakdown

- **Render Backend**: Free (750 hours/month)
- **Render Database**: Free for 90 days, then $7/month
- **Netlify Frontend**: Free forever (100GB bandwidth)

**Total**: $0 for 90 days, then $7/month

---

## Need Help?

If you get stuck:
1. Check the error message in browser console (F12)
2. Check Render backend logs (Logs tab)
3. Verify all environment variables are set correctly
4. Make sure URLs don't have trailing slashes

**Repository**: https://github.com/santoshprasad76/ICA_Bob-a-thon

---

**You can do this! Just follow the checkboxes step by step.** 🚀