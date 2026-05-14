# Free Deployment Options (No Credit Card Required)

Since you've exceeded free plan limits on Railway/Vercel, here are completely free alternatives:

---

## Option 1: Render (Recommended - 100% Free)

### Backend + Database on Render

**Step 1: Deploy PostgreSQL Database**
1. Go to https://render.com/ (sign up free)
2. Click **"New +"** → **"PostgreSQL"**
3. Name: `ppm-database`
4. Database: `ppm_db`
5. User: `ppm_user`
6. Region: Choose closest to you
7. Click **"Create Database"** (Free tier: 90 days, then $7/month)

**Step 2: Deploy Backend**
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub: `santoshprasad76/ICA_Bob-a-thon`
3. Configure:
   - **Name**: `ppm-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Environment Variables** (click "Advanced"):
   ```
   NODE_ENV=production
   PORT=3001
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=7d
   DATABASE_URL=[Copy from PostgreSQL service Internal Database URL]
   CORS_ORIGIN=https://your-app.netlify.app
   ```

5. Click **"Create Web Service"**

**Step 3: Seed Database**
After deployment, go to backend service → **Shell** tab:
```bash
node src/database/seed.js
```

**Get Backend URL**: `https://ppm-backend.onrender.com`

---

### Frontend on Netlify

**Step 1: Deploy to Netlify**
1. Go to https://netlify.com/ (sign up free)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub: `santoshprasad76/ICA_Bob-a-thon`
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

5. **Environment Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://ppm-backend.onrender.com/api/v1`

6. Click **"Deploy site"**

**Get Frontend URL**: `https://your-app.netlify.app`

**Step 4: Update CORS**
Go back to Render backend → Environment → Update:
```
CORS_ORIGIN=https://your-app.netlify.app
```

---

## Option 2: Fly.io (Free Tier - No Credit Card)

### Backend + Database on Fly.io

**Install Fly CLI:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Deploy Backend:**
```bash
cd ppm-app/backend
fly auth signup  # or fly auth login
fly launch --name ppm-backend --region sjc
# Choose: Yes to PostgreSQL (free tier)
# Choose: No to Redis
fly deploy
```

**Seed Database:**
```bash
fly ssh console
node src/database/seed.js
exit
```

**Frontend on Netlify** (same as Option 1)

---

## Option 3: Heroku (Free Tier with Student Pack)

If you have GitHub Student Pack, Heroku is free:

### Backend on Heroku

**Install Heroku CLI:**
```bash
npm install -g heroku
```

**Deploy:**
```bash
cd ppm-app/backend
heroku login
heroku create ppm-backend
heroku addons:create heroku-postgresql:mini
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key
heroku config:set CORS_ORIGIN=https://your-app.netlify.app
git push heroku main
heroku run node src/database/seed.js
```

**Frontend on Netlify** (same as Option 1)

---

## Option 4: Docker + Free VPS (Oracle Cloud)

Oracle Cloud offers **always free** VPS:

1. Sign up at https://cloud.oracle.com/
2. Create free VM instance (ARM-based, 4 cores, 24GB RAM - FREE forever)
3. Deploy using Docker Compose

**Create docker-compose.yml:**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ppm_db
      POSTGRES_USER: ppm_user
      POSTGRES_PASSWORD: your-password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://ppm_user:your-password@postgres:5432/ppm_db
      JWT_SECRET: your-secret-key
      CORS_ORIGIN: http://your-vm-ip:3000
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      VITE_API_URL: http://your-vm-ip:3001/api/v1

volumes:
  postgres_data:
```

**Deploy:**
```bash
ssh into your Oracle VM
git clone https://github.com/santoshprasad76/ICA_Bob-a-thon.git
cd ICA_Bob-a-thon/ppm-app
docker-compose up -d
docker-compose exec backend node src/database/seed.js
```

---

## Option 5: Supabase (Free PostgreSQL) + Netlify

**Backend Database on Supabase:**
1. Go to https://supabase.com/ (free tier)
2. Create new project
3. Get connection string from Settings → Database
4. Use with Render/Fly.io backend

**Advantages:**
- Free PostgreSQL (500MB)
- No credit card required
- Built-in auth (optional)

---

## Comparison Table

| Platform | Backend | Database | Frontend | Free Tier | Credit Card |
|----------|---------|----------|----------|-----------|-------------|
| **Render + Netlify** | ✅ Free | ✅ 90 days free | ✅ Free | 750 hrs/month | Required after 90 days |
| **Fly.io + Netlify** | ✅ Free | ✅ Free | ✅ Free | 3 VMs, 3GB storage | Not required |
| **Heroku + Netlify** | ✅ Student | ✅ Student | ✅ Free | With Student Pack | Required |
| **Oracle Cloud** | ✅ Free Forever | ✅ Free Forever | ✅ Free Forever | 4 cores, 24GB RAM | Required (but free) |
| **Supabase + Render** | ✅ Free | ✅ Free | ✅ Free | 500MB DB | Not required |

---

## Recommended: Render + Netlify

**Why?**
- ✅ Easiest setup (web interface)
- ✅ Auto-deploys from GitHub
- ✅ Free SSL certificates
- ✅ Good performance
- ✅ 90 days free database (enough for demo/testing)

**Cost after 90 days:**
- Database: $7/month (or migrate to Supabase free tier)
- Backend: Free (750 hours/month)
- Frontend: Free (100GB bandwidth)

---

## Quick Start (Render + Netlify)

1. **Render**: Deploy backend + PostgreSQL (15 minutes)
   - https://render.com/
   - Follow "Option 1" above

2. **Netlify**: Deploy frontend (5 minutes)
   - https://netlify.com/
   - Connect GitHub repo
   - Set base directory: `frontend`
   - Add env var: `VITE_API_URL`

3. **Update CORS** in Render backend (1 minute)

**Total Time: ~20 minutes**

---

## Need Help?

- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com/
- Fly.io Docs: https://fly.io/docs/

Your code is ready - just choose a platform and deploy! 🚀