# Quick Start Guide - Bulalacao Health Hub

## 🚀 Get Started in 5 Minutes

### Step 1: Start Laragon (30 seconds)
1. Open Laragon
2. Click "Start All"
3. Wait for Apache and MySQL to start

### Step 2: Create Database (1 minute)
1. In Laragon, click "Database" button
2. Open HeidiSQL or phpMyAdmin
3. Create new database:
   ```sql
   CREATE DATABASE bulalacao_health_hub;
   ```

### Step 3: Setup Backend (2 minutes)
```bash
# In the project root (backend-laravel)
composer install
php artisan migrate
php artisan serve
```

Leave this terminal open! Backend runs on http://localhost:8000

### Step 4: Setup Frontend (2 minutes)
Open a NEW terminal:
```bash
cd react-frontend
npm install
npm run dev
```

Leave this terminal open! Frontend runs on http://localhost:5173

### Step 5: Register & Login
1. Open browser: http://localhost:5173
2. Click "Register"
3. Fill the form (you'll be the Admin!)
4. Login with your credentials

## ✅ You're Done!

You should now see the dashboard. As the first user, you're automatically an Admin with full access.

## 🎯 What to Do Next

1. **Add Staff**: Go to Staff page, click "Add Staff"
2. **Add Rooms**: Go to Rooms page, add hospital rooms
3. **Add Medicines**: Go to Pharmacy, add medicines
4. **Add Ambulances**: Go to Ambulance, register vehicles

## 🐛 Common Issues

### "Database connection error"
- Make sure MySQL is running in Laragon
- Check if database `bulalacao_health_hub` exists

### "npm install" fails
- Make sure you're in `react-frontend` folder
- Try: `npm install --legacy-peer-deps`

### "Port 8000 already in use"
- Stop other Laravel projects
- Or use: `php artisan serve --port=8001`

### "Cannot connect to API"
- Make sure backend is running (php artisan serve)
- Check if http://localhost:8000/api/user shows something

## 📱 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Database**: Laragon > Database button

## 🔑 Default Credentials

There are no default credentials. The first user you register becomes the Admin!

## 💡 Tips

- Keep both terminals open (backend and frontend)
- Use Chrome/Firefox for best experience
- Check browser console (F12) if something doesn't work
- Backend logs are in `storage/logs/laravel.log`

## 🆘 Need Help?

1. Check if both servers are running
2. Check browser console (F12)
3. Check Laravel logs
4. Make sure database exists and is migrated

---

**Happy coding! 🎉**
