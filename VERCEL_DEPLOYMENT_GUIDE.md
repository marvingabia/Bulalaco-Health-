# 🚀 Vercel Deployment Guide - Bulalacao Health Hub

## ✅ GitHub Repository
Your code is now pushed to: https://github.com/marvingabia/Bulalaco-Health-

## 📱 Mobile Responsive Design
All pages are fully responsive using Tailwind CSS:
- ✅ Mobile screens (320px+)
- ✅ Tablets (768px+)
- ✅ Desktop (1024px+)
- ✅ All functions work on all screen sizes

## 🎯 Deployment Steps

### Part 1: Deploy Backend (Laravel API)

1. **Go to Vercel**: https://vercel.com
2. **Import Project**: Click "Add New" → "Project"
3. **Select Repository**: Choose `Bulalaco-Health-`
4. **Configure Project**:
   - Framework Preset: `Other`
   - Root Directory: `./` (root)
   - Build Command: Leave empty
   - Output Directory: `public`

5. **Environment Variables** (IMPORTANT!):
   Click "Environment Variables" and add these:
   ```
   APP_NAME=Bulalacao Health Hub
   APP_ENV=production
   APP_KEY=base64:YOUR_APP_KEY_HERE
   APP_DEBUG=false
   APP_URL=https://your-backend-url.vercel.app

   DB_CONNECTION=mysql
   DB_HOST=your-database-host
   DB_PORT=3306
   DB_DATABASE=your-database-name
   DB_USERNAME=your-database-user
   DB_PASSWORD=your-database-password

   SANCTUM_STATEFUL_DOMAINS=your-frontend-url.vercel.app
   SESSION_DOMAIN=.vercel.app
   ```

6. **Get APP_KEY**: Run locally: `php artisan key:generate --show`

7. **Deploy**: Click "Deploy"

### Part 2: Deploy Frontend (React)

1. **Import Again**: Click "Add New" → "Project"
2. **Select Same Repository**: Choose `Bulalaco-Health-`
3. **Configure Project**:
   - Framework Preset: `Vite`
   - Root Directory: `react-frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

5. **Deploy**: Click "Deploy"

### Part 3: Database Setup

**Option A: Use PlanetScale (Free MySQL)**
1. Go to: https://planetscale.com
2. Create free database
3. Get connection string
4. Update backend environment variables

**Option B: Use Railway (Free PostgreSQL/MySQL)**
1. Go to: https://railway.app
2. Create new project → Add MySQL
3. Get connection details
4. Update backend environment variables

**Option C: Use Supabase (Free PostgreSQL)**
1. Go to: https://supabase.com
2. Create new project
3. Get database URL
4. Update backend environment variables

### Part 4: After Deployment

1. **Run Migrations**: In Vercel backend project:
   - Go to Settings → Functions
   - Or use Vercel CLI: `vercel env pull` then `php artisan migrate --force`

2. **Create Admin User**: Run seeder or create manually

3. **Update Frontend API URL**: 
   - Go to frontend Vercel project
   - Settings → Environment Variables
   - Update `VITE_API_URL` with your backend URL
   - Redeploy

4. **Test on Mobile**: Open on your phone/tablet to verify responsive design

## 🔧 Alternative: Deploy Frontend Only (Use Local Backend)

If you want to deploy only the frontend and keep backend local:

1. Deploy frontend to Vercel (Part 2 above)
2. Use ngrok to expose local backend:
   ```bash
   ngrok http 8000
   ```
3. Update frontend `VITE_API_URL` to ngrok URL

## 📱 Mobile Testing Checklist

Test these on mobile/tablet:
- ✅ Login/Register pages
- ✅ Dashboard with statistics
- ✅ Patient Records (add, edit, view)
- ✅ Staff Management
- ✅ Rooms Management
- ✅ Pharmacy
- ✅ Laboratory
- ✅ Ambulance tracking
- ✅ Morgue
- ✅ Billing
- ✅ Navigation sidebar (hamburger menu on mobile)

## 🎨 Responsive Features

- Rainbow-colored oblong buttons work on all screens
- Sidebar collapses to hamburger menu on mobile
- Tables scroll horizontally on small screens
- Forms stack vertically on mobile
- Cards resize appropriately
- All modals are mobile-friendly

## 🆘 Troubleshooting

**CORS Errors**: Update backend `.env`:
```
SANCTUM_STATEFUL_DOMAINS=your-frontend-domain.vercel.app
SESSION_DOMAIN=.vercel.app
```

**API Not Found**: Check `VITE_API_URL` in frontend environment variables

**Database Connection Failed**: Verify database credentials in backend environment variables

**Build Failed**: Check build logs in Vercel dashboard

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Test API endpoints directly using Postman

---

**Your Repository**: https://github.com/marvingabia/Bulalaco-Health-
**Vercel Dashboard**: https://vercel.com/dashboard

Good luck with deployment! 🎉
