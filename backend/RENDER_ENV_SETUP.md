# How to Set Environment Variables in Render

Render doesn't use `.env` files directly. Instead, you add environment variables through their web interface.

## Step-by-Step Instructions

### 1. Open Your Backend Service in Render
- Go to https://dashboard.render.com/
- Click on your `ppm-backend` service

### 2. Go to Environment Tab
- Click **"Environment"** in the left sidebar
- You'll see a list of environment variables

### 3. Add Each Variable

Click **"Add Environment Variable"** and add these one by one:

#### Required Variables:

**NODE_ENV**
```
production
```

**PORT**
```
3001
```

**JWT_SECRET**
```
CHANGE-THIS-TO-A-RANDOM-SECRET-KEY-AT-LEAST-32-CHARACTERS-LONG
```
⚠️ **IMPORTANT**: Generate a secure random string at https://www.uuidgenerator.net/
Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890-your-secret-key-here`

**JWT_EXPIRES_IN**
```
7d
```

**DATABASE_URL**
```
[Copy from your PostgreSQL service]
```
📝 **How to get this:**
1. Go to your PostgreSQL database in Render
2. Click on it
3. Scroll down to **"Connections"**
4. Copy the **"Internal Database URL"**
5. It looks like: `postgresql://ppm_user:password@dpg-xxxxx.oregon-postgres.render.com/ppm_db`

**CORS_ORIGIN**
```
https://your-app-name.netlify.app
```
📝 **Update this after deploying frontend to Netlify**
- Deploy frontend first to get the URL
- Then come back and update this value
- Click "Save Changes" - Render will auto-redeploy

### 4. Save Changes
- Click **"Save Changes"** button at the bottom
- Render will automatically redeploy your service
- Wait 2-3 minutes for deployment to complete

## Quick Copy-Paste Format

If Render allows bulk import, use this format:

```
NODE_ENV=production
PORT=3001
JWT_SECRET=your-generated-secret-key-here
JWT_EXPIRES_IN=7d
DATABASE_URL=postgresql://ppm_user:password@dpg-xxxxx.oregon-postgres.render.com/ppm_db
CORS_ORIGIN=https://your-app-name.netlify.app
```

## Verification

After adding all variables:

1. Check that all 6 variables are listed
2. Click **"Manual Deploy"** → **"Deploy latest commit"** if needed
3. Go to **"Logs"** tab to see if deployment succeeded
4. Look for: `✅ Database connection established successfully.`

## Common Issues

### "Database connection failed"
- Check DATABASE_URL is correct
- Make sure PostgreSQL service is running (green status)
- Verify you copied the **Internal** Database URL, not External

### "CORS error" in frontend
- Make sure CORS_ORIGIN matches your Netlify URL exactly
- No trailing slash in the URL
- Must start with `https://`

### "JWT error"
- Make sure JWT_SECRET is at least 32 characters long
- Don't use spaces or special characters that might break

## Security Notes

✅ **DO**: Use strong random strings for JWT_SECRET
✅ **DO**: Keep DATABASE_URL secret
✅ **DO**: Update CORS_ORIGIN to your actual frontend URL
❌ **DON'T**: Commit `.env.render` with real values to Git
❌ **DON'T**: Share your DATABASE_URL publicly
❌ **DON'T**: Use simple passwords like "password123"

## After Setup

Once all variables are set:

1. Go to **"Shell"** tab in Render
2. Run: `node src/database/seed.js`
3. Wait for: "🎉 Database seeding completed successfully!"
4. You should see: "60 sample projects created"

Your backend is now ready! 🚀