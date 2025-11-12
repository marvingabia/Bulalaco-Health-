# 🚀 Database Setup Instructions

## Method 1: Automatic Setup (Easiest) ⭐

Just double-click this file:
```
setup-complete.bat
```

This will:
1. ✅ Create the database
2. ✅ Create all tables
3. ✅ Create admin user
4. ✅ Everything ready!

---

## Method 2: Manual Commands

Run these commands one by one:

### Step 1: Create Database
```bash
mysql -u root -e "CREATE DATABASE \`bulalacao health_hub\`;"
```

### Step 2: Run Migrations
```bash
php artisan migrate
```

### Step 3: Create Admin User
```bash
php artisan db:seed --class=AdminUserSeeder
```

---

## Method 3: Using phpMyAdmin

1. **Open phpMyAdmin**
   - Start Laragon
   - Click "Database" button
   - Select phpMyAdmin
   - Or go to: http://localhost/phpmyadmin

2. **Import SQL File**
   - Click "Import" tab
   - Click "Choose File"
   - Select: `setup_database.sql`
   - Click "Go"

---

## Verify Setup

Run this command to check if everything is ready:
```bash
php artisan migrate:status
```

You should see all tables listed!

---

## Admin Login Credentials

After setup, login with:
- **Email**: `admin@gmail.com`
- **Password**: `Admin2025`

---

## Troubleshooting

### "Access denied for user 'root'"
**Solution**: Check your `.env` file:
```env
DB_USERNAME=root
DB_PASSWORD=
```
(Leave password empty for Laragon default)

### "Unknown database 'bulalacao health_hub'"
**Solution**: Run the database creation command:
```bash
mysql -u root -e "CREATE DATABASE \`bulalacao health_hub\`;"
```

### "SQLSTATE[HY000] [2002]"
**Solution**: Start MySQL in Laragon (click "Start All")

---

## Quick Start After Setup

1. **Start Backend**:
   ```bash
   php artisan serve
   ```

2. **Start Frontend** (new terminal):
   ```bash
   cd react-frontend
   npm run dev
   ```

3. **Open Browser**:
   ```
   http://localhost:5173
   ```

4. **Login**:
   - Email: admin@gmail.com
   - Password: Admin2025

---

## All Done! 🎉

Your Bulalacao Health Hub is ready to use!
