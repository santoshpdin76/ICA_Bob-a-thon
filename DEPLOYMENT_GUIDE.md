# PPM Application Deployment Guide

This guide covers deploying the PPM application using **Vercel** for the frontend and **Railway** for the backend with PostgreSQL.

## Architecture Overview

- **Frontend**: React + Vite → Vercel
- **Backend**: Node.js + Express → Railway
- **Database**: PostgreSQL → Railway

---

## Prerequisites

1. **Accounts Required**:
   - [Vercel Account](https://vercel.com/signup)
   - [Railway Account](https://railway.app/)
   - [GitHub Account](https://github.com/) (recommended for CI/CD)

2. **Local Tools**:
   - Node.js 18+ installed
   - Git installed
   - Vercel CLI: `npm install -g vercel`
   - Railway CLI: `npm install -g @railway/cli`

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Provision PostgreSQL"**
4. Wait for PostgreSQL to be provisioned

### Step 2: Add Backend Service

1. In the same project, click **"+ New"**
2. Select **"GitHub Repo"** (or "Empty Service" if not using Git)
3. Connect your repository and select the `ppm-app/backend` directory
4. Railway will auto-detect Node.js and use the `railway.json` config

### Step 3: Configure Environment Variables

In Railway, go to your backend service → **Variables** tab and add:

```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Database (Railway will auto-provide these from PostgreSQL service)
DATABASE_URL=${{Postgres.DATABASE_URL}}
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_NAME=${{Postgres.PGDATABASE}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}

# CORS - Update after deploying frontend
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Step 4: Deploy Backend

Railway will automatically deploy when you push to your repository. Or manually trigger:

```bash
# Using Railway CLI
cd ppm-app/backend
railway login
railway link
railway up
```

### Step 5: Seed the Database

After first deployment, run the seed script:

```bash
# Using Railway CLI
railway run node src/database/seed.js
```

Or use Railway's **"Run Command"** feature in the dashboard.

### Step 6: Get Backend URL

1. Go to your backend service in Railway
2. Click **"Settings"** → **"Networking"**
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://your-app.railway.app`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

Update the API URL in your frontend code or use environment variables:

```bash
cd ppm-app/frontend
```

Create `.env.production`:

```env
VITE_API_URL=https://your-backend.railway.app/api/v1
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `ppm-app/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.railway.app/api/v1`
6. Click **"Deploy"**

#### Option B: Using Vercel CLI

```bash
cd ppm-app/frontend
vercel login
vercel --prod
```

Follow the prompts and set the environment variable when asked.

### Step 3: Update CORS in Backend

1. Go back to Railway backend service
2. Update the `CORS_ORIGIN` environment variable with your Vercel URL:
   ```
   CORS_ORIGIN=https://your-app.vercel.app
   ```
3. Railway will automatically redeploy

---

## Part 3: Post-Deployment Configuration

### Update Frontend API URL

If you didn't set it during deployment:

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend.railway.app/api/v1`
3. Redeploy: **Deployments** → **...** → **Redeploy**

### Verify Deployment

1. **Backend Health Check**:
   ```bash
   curl https://your-backend.railway.app/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend**:
   - Visit `https://your-app.vercel.app`
   - Try logging in with test credentials:
     - Admin: `admin` / `admin123`
     - Manager: `jsmith` / `password123`

---

## Part 4: Custom Domain (Optional)

### For Frontend (Vercel)

1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

### For Backend (Railway)

1. Go to Railway backend service → **Settings** → **Networking**
2. Add custom domain
3. Update DNS records as instructed
4. Update `CORS_ORIGIN` in Railway to include new domain

---

## Environment Variables Reference

### Backend (Railway)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3001` |
| `JWT_SECRET` | JWT signing key | `your-secret-key` |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `DATABASE_URL` | Full DB connection string | Auto-provided by Railway |
| `DB_HOST` | Database host | Auto-provided by Railway |
| `DB_PORT` | Database port | Auto-provided by Railway |
| `DB_NAME` | Database name | Auto-provided by Railway |
| `DB_USER` | Database user | Auto-provided by Railway |
| `DB_PASSWORD` | Database password | Auto-provided by Railway |
| `CORS_ORIGIN` | Allowed frontend URL | `https://your-app.vercel.app` |

### Frontend (Vercel)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://your-backend.railway.app/api/v1` |

---

## Continuous Deployment

### Automatic Deployments

Both Vercel and Railway support automatic deployments:

1. **Push to main branch** → Automatic production deployment
2. **Push to other branches** → Preview deployments (Vercel) / Branch deployments (Railway)

### Manual Deployments

```bash
# Frontend (Vercel)
cd ppm-app/frontend
vercel --prod

# Backend (Railway)
cd ppm-app/backend
railway up
```

---

## Monitoring & Logs

### Railway (Backend)

1. Go to your service in Railway dashboard
2. Click **"Deployments"** to see deployment history
3. Click **"Logs"** to view real-time logs
4. Click **"Metrics"** to see resource usage

### Vercel (Frontend)

1. Go to your project in Vercel dashboard
2. Click **"Deployments"** to see deployment history
3. Click on a deployment → **"Logs"** to view build/runtime logs
4. **"Analytics"** tab for visitor metrics (requires Pro plan)

---

## Troubleshooting

### Backend Issues

**Problem**: Database connection fails
- **Solution**: Check Railway PostgreSQL service is running and environment variables are correctly linked

**Problem**: CORS errors
- **Solution**: Verify `CORS_ORIGIN` matches your Vercel frontend URL exactly

**Problem**: 502 Bad Gateway
- **Solution**: Check Railway logs for startup errors, ensure `PORT` is set correctly

### Frontend Issues

**Problem**: API calls fail
- **Solution**: Verify `VITE_API_URL` is set correctly and backend is accessible

**Problem**: Blank page after deployment
- **Solution**: Check Vercel build logs, ensure `dist` folder is generated correctly

**Problem**: Routes return 404
- **Solution**: Verify `vercel.json` rewrites configuration is present

---

## Security Checklist

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Enable HTTPS (automatic on Vercel and Railway)
- [ ] Set `NODE_ENV=production` in Railway
- [ ] Restrict `CORS_ORIGIN` to your frontend domain only
- [ ] Review and update default user passwords
- [ ] Enable Railway's built-in DDoS protection
- [ ] Set up Vercel's security headers (optional)

---

## Scaling

### Backend (Railway)

1. Go to service → **Settings** → **Resources**
2. Adjust CPU and Memory limits
3. Enable autoscaling if needed

### Frontend (Vercel)

- Vercel automatically scales based on traffic
- No manual configuration needed

### Database (Railway)

1. Go to PostgreSQL service → **Settings**
2. Upgrade plan for more storage/connections
3. Consider connection pooling for high traffic

---

## Backup & Recovery

### Database Backups (Railway)

Railway automatically backs up PostgreSQL databases. To manually backup:

```bash
# Using Railway CLI
railway run pg_dump $DATABASE_URL > backup.sql
```

To restore:

```bash
railway run psql $DATABASE_URL < backup.sql
```

---

## Cost Estimates

### Railway (Backend + Database)

- **Hobby Plan**: $5/month (500 hours execution time)
- **Developer Plan**: $10/month (includes PostgreSQL)
- **Team Plan**: $20/month (more resources)

### Vercel (Frontend)

- **Hobby**: Free (personal projects)
- **Pro**: $20/month (commercial projects)
- **Enterprise**: Custom pricing

---

## Support & Resources

- **Railway Docs**: https://docs.railway.app/
- **Vercel Docs**: https://vercel.com/docs
- **Project Issues**: Create an issue in your GitHub repository

---

## Quick Deploy Commands

```bash
# 1. Deploy Backend to Railway
cd ppm-app/backend
railway login
railway init
railway up

# 2. Seed Database
railway run node src/database/seed.js

# 3. Deploy Frontend to Vercel
cd ../frontend
vercel login
vercel --prod

# 4. Update CORS in Railway with Vercel URL
railway variables set CORS_ORIGIN=https://your-app.vercel.app
```

---

**Deployment Complete!** 🎉

Your PPM application is now live with:
- ✅ Professional black & gold theme
- ✅ 60 sample projects
- ✅ Secure authentication
- ✅ Production-ready infrastructure