# 🚀 START HERE - Bulalacao Health Hub

## Quick Start (First Time Setup)

### Step 1: Install Frontend Dependencies
```bash
cd react-frontend
npm install
```
**Wait for this to complete!** (takes 1-2 minutes)

### Step 2: Start Frontend Server
```bash
npm run dev
```
**Keep this terminal open!**

You should see:
```
VITE v4.4.5  ready in 500 ms

➜  Local:   http://localhost:5173/
```

### Step 3: Start Backend Server (New Terminal)
```bash
# Open a NEW terminal
php artisan serve
```
**Keep this terminal open too!**

You should see:
```
Starting Laravel development server: http://127.0.0.1:8000
```

### Step 4: Open Browser
Go to: **http://localhost:5173**

---

## If You See a Blank White Page

### Check Browser Console (F12)
1. Press **F12** in your browser
2. Click **Console** tab
3. Look for red errors

### Common Issues:

**Error: "Cannot find module 'react-router-dom'"**
```bash
cd react-frontend
npm install
```

**Error: "Failed to fetch"**
- Make sure backend is running: `php artisan serve`
- Check if http://localhost:8000/api works

**Still blank?**
```bash
cd react-frontend
rm -rf node_modules
npm install
npm run dev
```

---

## Current Status Check

Run these commands to check if everything is ready:

```bash
# Check if dependencies are installed
cd react-frontend
ls node_modules

# If empty or error, run:
npm install
```

---

## Full Setup Checklist

- [ ] MySQL is running in Laragon
- [ ] Database `bulalacao_health_hub` created
- [ ] Backend dependencies installed (`composer install`)
- [ ] Migrations run (`php artisan migrate`)
- [ ] **Frontend dependencies installed** (`npm install` in react-frontend)
- [ ] Backend server running (`php artisan serve`)
- [ ] Frontend server running (`npm run dev` in react-frontend)
- [ ] Browser open at http://localhost:5173

---

## Terminal Commands Summary

**Terminal 1 (Backend):**
```bash
php artisan serve
```

**Terminal 2 (Frontend):**
```bash
cd react-frontend
npm run dev
```

**Keep both terminals open!**

---

## Need Help?

1. **Blank page?** → Check browser console (F12)
2. **"vite not found"?** → Run `npm install` in react-frontend
3. **"Cannot connect to API"?** → Make sure `php artisan serve` is running
4. **Port already in use?** → Close other Laravel/Vite servers

---

**Next Step:** Open http://localhost:5173 and register your account!
