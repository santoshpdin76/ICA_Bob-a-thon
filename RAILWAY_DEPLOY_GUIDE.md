# 🚂 Railway One-Click Deployment Guide

## Step 1: Push Code to Your New GitHub Repo

Since I can't push directly due to permissions, you need to do this:

```bash
cd ppm-app
git remote set-url origin https://github.com/santoshpdin76/ICA_Bob-a-thon.git
git push -u origin main --force
```

If you get a permission error, authenticate with GitHub:
```bash
# Option 1: Use GitHub CLI
gh auth login

# Option 2: Use Personal Access Token
# Go to GitHub → Settings → Developer settings → Personal access tokens
# Create a token with 'repo' permissions
# Then use: git push with your token as password
```

---

## Step 2: Deploy on Railway (3 Clicks!)

### 1. Go to Railway
**Link**: https://railway.app/new

### 2. Sign Up/Login
- Click **"Login with GitHub"**
- Authorize Railway to access your repositories

### 3. Deploy from GitHub
1. Click **"Deploy from GitHub repo"**
2. Select: **`santoshpdin76/ICA_Bob-a-thon`**
3. Railway will automatically:
   - ✅ Read `railway.json` config
   - ✅ Detect Node.js
   - ✅ Create PostgreSQL database
   - ✅ Deploy backend
   - ✅ Link everything together

**That's it!** Wait 3-5 minutes for deployment.

---

## Step 3: Configure Environment Variables

Railway auto-links the database, but you need to add a few more variables:

1. **Go to your project** in Railway
2. **Click on your backend service**
3. **Go to "Variables" tab**
4. **Add these**:

```
NODE_ENV=production
PORT=3001
JWT_SECRET=a1b2c3d4-e5f6-7890-abcd-ef1234567890-change-this
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-url.railway.app
```

**Note**: Railway automatically provides DATABASE_URL from PostgreSQL

5. **Click "Deploy"** to apply changes

---

## Step 4: Seed the Database

1. **In Railway**, click on your backend service
2. **Go to "Deployments"** tab
3. **Click on the latest deployment**
4. **Click "View Logs"**
5. **Wait for**: "✅ Database connection established"
6. **Go to "Settings"** → **"Deploy"**
7. **Run command**: `node src/database/seed.js`

Or use Railway CLI:
```bash
railway run node src/database/seed.js
```

---

## Step 5: Get Your URLs

Railway will give you URLs for:
- **Backend**: `https://your-app.up.railway.app`
- **Frontend**: `https://your-app-frontend.up.railway.app`

---

## Step 6: Update CORS

1. **Go back to Variables** in your backend service
2. **Update CORS_ORIGIN** with your frontend URL
3. **Save** - Railway auto-redeploys

---

## ✅ Done!

Your app is now live on Railway!

**Test it**:
- Open your frontend URL
- Login with: `admin` / `admin123`

---

## What Railway Does Automatically

✅ Reads `railway.json` from your repo
✅ Creates PostgreSQL database
✅ Links database to backend
✅ Deploys backend with Node.js
✅ Provides environment variables
✅ Auto-redeploys on git push
✅ Gives you live URLs

---

## Cost

- **Free Tier**: $5 credit/month
- **Hobby Plan**: $5/month (500 hours)
- **Developer Plan**: $10/month

Your app should fit in the free tier for testing!

---

## Troubleshooting

### "Database connection failed"
- Check that PostgreSQL service is running
- Verify DATABASE_URL is set (Railway does this automatically)

### "CORS error"
- Update CORS_ORIGIN in backend variables
- Make sure it matches your frontend URL exactly

### "Can't find module"
- Railway might be in wrong directory
- Check that root directory is set correctly

---

## Alternative: Use Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up

# Seed database
railway run node src/database/seed.js
```

---

## Your Repository

**GitHub**: https://github.com/santoshpdin76/ICA_Bob-a-thon

**Railway**: https://railway.app/new

---

## Quick Summary

1. Push code to GitHub (you need to do this)
2. Go to railway.app/new
3. Deploy from GitHub repo
4. Add environment variables
5. Seed database
6. Done!

**Total time**: 10 minutes

Your code is ready - just push it and deploy! 🚀