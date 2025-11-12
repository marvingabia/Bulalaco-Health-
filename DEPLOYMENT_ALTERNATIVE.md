# 🚀 Alternative Deployment Guide - Easier Options

## ⚠️ Important Note
Laravel on Vercel can be tricky. Here are **EASIER** deployment options:

---

## ✅ RECOMMENDED: Option 1 - Railway (Easiest!)

### Why Railway?
- ✅ Free tier available
- ✅ Supports Laravel perfectly
- ✅ Includes free MySQL database
- ✅ One-click deployment
- ✅ Automatic HTTPS

### Steps:

1. **Go to Railway**: https://railway.app
2. **Sign up** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: `Bulalaco-Health--hub`
5. **Add MySQL**: Click "New" → "Database" → "MySQL"
6. **Environment Variables** (Railway will auto-detect Laravel):
   ```
   APP_NAME=Bulalacao Health Hub
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=base64:YOUR_KEY_HERE
   ```
7. **Deploy!** - Railway handles everything automatically

8. **Get Backend URL**: Copy from Railway dashboard
9. **Deploy Frontend on Vercel**:
   - Import repository
   - Root directory: `react-frontend`
   - Framework: Vite
   - Environment variable: `VITE_API_URL=https://your-railway-url.up.railway.app/api`

---

## ✅ Option 2 - Render (Also Easy!)

### Why Render?
- ✅ Free tier
- ✅ Great Laravel support
- ✅ Free PostgreSQL database
- ✅ Easy setup

### Steps:

1. **Go to Render**: https://render.com
2. **Sign up** with GitHub
3. **New** → **Web Service**
4. **Connect**: `Bulalaco-Health--hub`
5. **Settings**:
   - Name: `bulalacao-backend`
   - Environment: `PHP`
   - Build Command: `composer install --no-dev`
   - Start Command: `php artisan serve --host=0.0.0.0 --port=$PORT`
6. **Add PostgreSQL**: Dashboard → New → PostgreSQL
7. **Environment Variables**: Add from Render dashboard
8. **Deploy!**

9. **Deploy Frontend on Vercel** (same as above)

---

## ✅ Option 3 - Frontend Only on Vercel + Local Backend

### If you want to test quickly:

1. **Keep backend running locally**:
   ```bash
   php artisan serve
   ```

2. **Use ngrok to expose it**:
   ```bash
   ngrok http 8000
   ```
   Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

3. **Deploy Frontend to Vercel**:
   - Import repository
   - Root directory: `react-frontend`
   - Framework: Vite
   - Environment variable: `VITE_API_URL=https://abc123.ngrok.io/api`

4. **Access your app**: Use Vercel URL for frontend

---

## ✅ Option 4 - Both on Vercel (Advanced)

If you still want Vercel for backend:

### Backend Setup:

1. **Create separate Vercel project** for backend
2. **Root directory**: `./` (root)
3. **Framework**: Other
4. **Install Command**: `composer install`
5. **Build Command**: Leave empty
6. **Output Directory**: `public`

7. **Environment Variables** (CRITICAL):
   ```
   APP_NAME=Bulalacao Health Hub
   APP_ENV=production
   APP_KEY=base64:YOUR_APP_KEY_HERE
   APP_DEBUG=false
   APP_URL=https://your-backend.vercel.app
   
   DB_CONNECTION=mysql
   DB_HOST=your-planetscale-host
   DB_PORT=3306
   DB_DATABASE=your-database
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   
   SANCTUM_STATEFUL_DOMAINS=your-frontend.vercel.app
   SESSION_DRIVER=cookie
   CACHE_DRIVER=array
   QUEUE_CONNECTION=sync
   ```

8. **Get APP_KEY**: Run locally:
   ```bash
   php artisan key:generate --show
   ```

### Database for Vercel Backend:

Use **PlanetScale** (Free MySQL):
1. Go to: https://planetscale.com
2. Create account
3. New database → Get connection string
4. Add to Vercel environment variables

### Frontend Setup:

1. **Create separate Vercel project** for frontend
2. **Root directory**: `react-frontend`
3. **Framework**: Vite
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend.vercel.app/api
   ```

---

## 🎯 My Recommendation

**Use Railway for Backend + Vercel for Frontend**

This is the easiest and most reliable setup:
- Railway handles Laravel perfectly
- Free MySQL included
- Vercel handles React perfectly
- Both have free tiers
- Easy to set up

---

## 📱 After Deployment

1. **Test on mobile** - Open deployed URL on your phone
2. **Create admin user** - Use database seeder or create manually
3. **Test all features** - Login, add patients, etc.

---

## 🆘 Troubleshooting

### CORS Errors:
Update backend `.env`:
```
SANCTUM_STATEFUL_DOMAINS=your-frontend-domain.vercel.app,localhost:5173
SESSION_DOMAIN=.vercel.app
```

### 404 Errors:
- Check `VITE_API_URL` in frontend
- Verify backend is running
- Check API routes in browser

### Database Connection Failed:
- Verify database credentials
- Check if database is running
- Test connection locally first

---

## 📞 Need Help?

1. Check deployment logs in Railway/Render/Vercel
2. Check browser console for frontend errors
3. Test API endpoints with Postman
4. Verify environment variables are set

---

**Repository**: https://github.com/marvingabia/Bulalaco-Health--hub

**Choose the option that works best for you!** 🚀
