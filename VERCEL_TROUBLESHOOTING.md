# 🔧 Vercel Deployment Troubleshooting

## ✅ Fixed Issues

### Issue 1: "functions property cannot be used with builds"
**Status**: ✅ FIXED
- Removed `builds` property from vercel.json
- Now using only `functions` property
- Updated in latest commit

### Issue 2: 404 Errors on Vercel Dashboard
**Status**: These are Vercel dashboard errors, not deployment errors
- Ignore these if deployment succeeds
- They don't affect the actual deployment

---

## 🚀 Current Deployment Status

**Repository**: https://github.com/marvingabia/Bulalaco-Health-

**Files Ready**:
- ✅ `vercel.json` - Fixed configuration
- ✅ `api/index.php` - Laravel entry point
- ✅ `.vercelignore` - Exclude unnecessary files
- ✅ All code pushed to GitHub

---

## 📋 Deployment Options

### ⭐ OPTION 1: Railway (EASIEST - RECOMMENDED)

**Why Railway is Better for Laravel**:
- ✅ Auto-detects Laravel
- ✅ Free MySQL included
- ✅ No complex configuration
- ✅ More reliable for PHP
- ✅ Better error logs

**Steps**:
1. Go to: https://railway.app
2. Sign in with GitHub
3. New Project → Deploy from GitHub
4. Select: `Bulalaco-Health-`
5. Add MySQL database
6. Generate domain
7. Done! (5 minutes total)

**Then deploy frontend to Vercel**:
1. Import repository
2. Root: `react-frontend`
3. Framework: Vite
4. Env: `VITE_API_URL=https://your-railway-url.up.railway.app/api`

---

### OPTION 2: Vercel (Both Backend & Frontend)

**Backend on Vercel**:

1. **Import Project**: `Bulalaco-Health-`
2. **Configure**:
   - Name: `bulalacao-backend`
   - Root Directory: `./` (leave as root)
   - Framework Preset: Other
   - Build Command: Leave empty
   - Output Directory: Leave empty

3. **Environment Variables** (REQUIRED):
   ```
   APP_NAME=Bulalacao Health Hub
   APP_ENV=production
   APP_DEBUG=false
   APP_KEY=base64:YOUR_KEY_FROM_LOCAL
   APP_URL=https://bulalacao-backend.vercel.app
   
   DB_CONNECTION=mysql
   DB_HOST=your-planetscale-host
   DB_PORT=3306
   DB_DATABASE=your-database
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   
   SANCTUM_STATEFUL_DOMAINS=bulalacao-frontend.vercel.app,localhost
   SESSION_DRIVER=cookie
   CACHE_DRIVER=array
   QUEUE_CONNECTION=sync
   LOG_CHANNEL=stderr
   ```

4. **Get APP_KEY**: Run locally:
   ```bash
   php artisan key:generate --show
   ```
   Copy the output (including `base64:`)

5. **Setup Database** (PlanetScale - Free):
   - Go to: https://planetscale.com
   - Create account
   - New database
   - Get connection string
   - Add to Vercel environment variables

**Frontend on Vercel**:

1. **Import Same Repository**: `Bulalaco-Health-`
2. **Configure**:
   - Name: `bulalacao-frontend`
   - Root Directory: `react-frontend`
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

3. **Environment Variable**:
   ```
   VITE_API_URL=https://bulalacao-backend.vercel.app/api
   ```

4. **Deploy!**

---

## 🔍 Common Errors & Solutions

### Error: "Build failed"
**Solution**:
- Check build logs in Vercel
- Verify `composer.json` exists
- Make sure PHP version is compatible

### Error: "500 Internal Server Error"
**Solution**:
- Check `APP_KEY` is set correctly
- Verify database connection
- Check Vercel function logs

### Error: "CORS Error"
**Solution**: Add to backend environment variables:
```
SANCTUM_STATEFUL_DOMAINS=your-frontend.vercel.app
SESSION_DOMAIN=.vercel.app
```
Then redeploy.

### Error: "Database Connection Failed"
**Solution**:
- Verify all DB credentials are correct
- Check database is running
- Test connection from PlanetScale/Railway dashboard
- Make sure DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD are set

### Error: "API 404 Not Found"
**Solution**:
- Check `VITE_API_URL` in frontend has `/api` at the end
- Verify backend is deployed successfully
- Test backend directly: `https://your-backend.vercel.app/api/health`

### Error: "Composer not found"
**Solution**: Vercel should auto-detect PHP. If not:
- Add `composer.json` to root (already there)
- Check Vercel build logs
- Try Railway instead (easier)

---

## 📱 After Successful Deployment

### 1. Test Backend:
Visit: `https://your-backend.vercel.app/api/health`
Should return: `{"status":"ok"}`

### 2. Test Frontend:
Visit: `https://your-frontend.vercel.app`
Should show login page

### 3. Create Admin User:

**Option A**: Register and update database
1. Register new user
2. Go to database
3. Update user's `role` to `admin`

**Option B**: Use seeder (if you can access console)
```bash
php artisan db:seed --class=AdminUserSeeder
```

### 4. Test on Mobile:
- Open on Android phone
- Open on iPhone/iPad
- Test all features
- Verify hamburger menu works

---

## 💡 Pro Tips

1. **Use Railway for Backend** - Seriously, it's much easier
2. **PlanetScale for Database** - Free tier is generous
3. **Check Logs** - Always check deployment logs for errors
4. **Test Locally First** - Make sure everything works locally
5. **Environment Variables** - Double-check all are set correctly

---

## 🆘 Still Having Issues?

### Check These:

1. **Vercel Build Logs**:
   - Go to Vercel dashboard
   - Click your project
   - Go to "Deployments"
   - Click latest deployment
   - Check logs

2. **Browser Console**:
   - Open frontend in browser
   - Press F12
   - Check Console tab for errors

3. **Network Tab**:
   - F12 → Network tab
   - Try to login
   - Check API requests
   - Look for failed requests

4. **Backend Logs**:
   - Vercel dashboard → Functions
   - Check function logs
   - Look for PHP errors

---

## 🎯 My Strong Recommendation

**Use Railway for Backend + Vercel for Frontend**

This combination:
- ✅ Works perfectly
- ✅ Easy to setup
- ✅ Free tiers available
- ✅ Better for Laravel
- ✅ Less troubleshooting needed

**Follow QUICK_DEPLOY.md for Railway setup!**

---

## 📞 Quick Links

- **Repository**: https://github.com/marvingabia/Bulalaco-Health-
- **Railway**: https://railway.app
- **Vercel**: https://vercel.com
- **PlanetScale**: https://planetscale.com

---

**Good luck with deployment!** 🚀

If you're still stuck, try Railway - it's much simpler for Laravel!
