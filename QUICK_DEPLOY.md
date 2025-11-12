# ⚡ Quick Deploy Guide - Pinakamadali!

## 🎯 Recommended: Railway + Vercel

Ito ang **PINAKAMADALING** paraan:

---

## Step 1: Deploy Backend sa Railway (5 minutes)

1. **Pumunta sa**: https://railway.app
2. **Sign up** gamit ang GitHub account mo
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose**: `Bulalaco-Health--hub`
6. **Wait** - Railway will auto-detect Laravel and deploy!

### Add Database:
1. Sa Railway dashboard, click **"New"**
2. Select **"Database"** → **"MySQL"**
3. **Done!** - Railway auto-connects it to your Laravel app

### Get Backend URL:
1. Click your service sa Railway
2. Go to **"Settings"** tab
3. Click **"Generate Domain"**
4. **Copy** the URL (e.g., `https://bulalacao-backend.up.railway.app`)

---

## Step 2: Deploy Frontend sa Vercel (3 minutes)

1. **Pumunta sa**: https://vercel.com
2. **Sign up** gamit ang GitHub
3. **Click "Add New"** → **"Project"**
4. **Import**: `Bulalaco-Health--hub`
5. **Configure**:
   - **Root Directory**: `react-frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Environment Variables** - Click "Environment Variables":
   ```
   VITE_API_URL=https://your-railway-url.up.railway.app/api
   ```
   (Replace with your Railway URL from Step 1)

7. **Click "Deploy"**

---

## Step 3: Setup Admin Account

### Option A: Using Railway Console
1. Sa Railway dashboard, click your service
2. Go to **"Deployments"** tab
3. Click **"View Logs"**
4. Click **"Shell"** or **"Console"**
5. Run:
   ```bash
   php artisan db:seed --class=AdminUserSeeder
   ```

### Option B: Create Manually
1. Open your deployed frontend URL
2. Click **"Register"**
3. Create account with:
   - Email: `admin@bulalacao.com`
   - Password: `admin123`
4. Go to your Railway MySQL database
5. Update the user's role to `admin`

---

## Step 4: Test Everything! 📱

1. **Open frontend URL** sa browser
2. **Login** with admin account
3. **Test sa mobile** - Open sa phone mo
4. **Check lahat ng features**:
   - Dashboard
   - Add patients
   - Manage staff
   - Rooms
   - Pharmacy
   - etc.

---

## ✅ Tapos na!

Your app is now live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.up.railway.app`

---

## 🔧 Kung may problema:

### CORS Error:
1. Go to Railway dashboard
2. Click your service → **"Variables"** tab
3. Add:
   ```
   SANCTUM_STATEFUL_DOMAINS=your-frontend.vercel.app
   SESSION_DOMAIN=.vercel.app
   ```
4. Redeploy

### API Not Working:
1. Check `VITE_API_URL` sa Vercel
2. Make sure may `/api` sa dulo
3. Test backend directly: `https://your-railway-url.up.railway.app/api/health`

### Database Error:
1. Railway auto-connects MySQL
2. Check **"Variables"** tab sa Railway
3. Verify `DATABASE_URL` is set

---

## 💡 Tips:

- **Railway** - Free 500 hours/month (enough for testing)
- **Vercel** - Unlimited free deployments
- **Both** - Auto-deploy on git push
- **Mobile** - Already responsive, test on your phone!

---

## 📱 Mobile Testing:

After deployment, test on:
- ✅ Android phone
- ✅ iPhone
- ✅ Tablet
- ✅ Different screen sizes

All features should work perfectly!

---

**Repository**: https://github.com/marvingabia/Bulalaco-Health--hub

**Enjoy your deployed app!** 🎉
