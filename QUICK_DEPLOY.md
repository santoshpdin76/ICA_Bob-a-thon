# Quick Deployment Guide

Your code is now on GitHub: https://github.com/santoshprasad76/ICA_Bob-a-thon

## Deploy in 3 Steps

### Step 1: Deploy Backend to Railway (5 minutes)

1. Go to https://railway.app/
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose: `santoshprasad76/ICA_Bob-a-thon`
5. Set **Root Directory**: `backend`
6. Railway will auto-detect Node.js and use `railway.json`

**Add PostgreSQL:**
1. In the same project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically link it

**Set Environment Variables:**
Go to backend service → **Variables** → Add:
```
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-now
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-app.vercel.app
```

**Database variables are auto-linked from PostgreSQL service**

**Seed Database:**
After deployment, go to backend service → **Settings** → **Deploy** → Run command:
```bash
node src/database/seed.js
```

**Get Backend URL:**
- Go to backend service → **Settings** → **Networking**
- Click **"Generate Domain"**
- Copy the URL (e.g., `https://ppm-backend-production.up.railway.app`)

---

### Step 2: Deploy Frontend to Vercel (3 minutes)

1. Go to https://vercel.com/
2. Click **"Add New..."** → **"Project"**
3. Import: `santoshprasad76/ICA_Bob-a-thon`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

**Add Environment Variable:**
- Key: `VITE_API_URL`
- Value: `https://your-backend.railway.app/api/v1` (from Step 1)

5. Click **"Deploy"**

**Get Frontend URL:**
- Vercel will provide a URL like: `https://your-app.vercel.app`

---

### Step 3: Update CORS (1 minute)

1. Go back to Railway backend service
2. Go to **Variables**
3. Update `CORS_ORIGIN` with your Vercel URL:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
4. Railway will auto-redeploy

---

## ✅ Done!

Visit your Vercel URL and login with:
- **Admin**: `admin` / `admin123`
- **Manager**: `jsmith` / `password123`
- **Member**: `bwilson` / `password123`

---

## Alternative: Use CLI (Advanced)

### Railway CLI:
```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
railway run node src/database/seed.js
```

### Vercel CLI:
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

---

## Need Help?

See full guide: `DEPLOYMENT_GUIDE.md`

Repository: https://github.com/santoshprasad76/ICA_Bob-a-thon