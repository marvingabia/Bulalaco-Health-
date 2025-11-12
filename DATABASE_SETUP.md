# 📊 Database Setup - bulalacao health_hub

## Database Name
```
bulalacao health_hub
```
(Note: Database name has a **space** between "bulalacao" and "health_hub")

---

## Quick Setup (Choose One Method)

### Method 1: Automatic Setup ⭐
```bash
setup-complete.bat
```

### Method 2: Step by Step

**Step 1: Create Database**
```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS `bulalacao health_hub`;"
```

**Step 2: Run Migrations**
```bash
php artisan migrate
```

**Step 3: Create Admin User**
```bash
php artisan db:seed --class=AdminUserSeeder
```

### Method 3: Using SQL File
```bash
mysql -u root < setup_database.sql
```

---

## Verify Database

Check if database exists:
```bash
mysql -u root -e "SHOW DATABASES LIKE 'bulalacao%';"
```

You should see:
```
+---------------------------+
| Database (bulalacao%)     |
+---------------------------+
| bulalacao health_hub      |
+---------------------------+
```

---

## Laravel Configuration

Your `.env` file should have:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bulalacao health_hub
DB_USERNAME=root
DB_PASSWORD=
```

**Note**: The database name with space works fine in Laravel!

---

## Tables Created

After running migrations, you'll have these tables:
1. ✅ users
2. ✅ patients
3. ✅ staff
4. ✅ rooms
5. ✅ medicines
6. ✅ ambulances
7. ✅ personal_access_tokens

---

## Admin Account

After seeding, you'll have:
- **Email**: admin@gmail.com
- **Password**: Admin2025
- **Role**: admin

---

## Common Issues

### Issue: "Unknown database"
**Solution**:
```bash
mysql -u root -e "CREATE DATABASE \`bulalacao health_hub\`;"
```

### Issue: "Access denied"
**Solution**: Check `.env` file - password should be empty for Laragon

### Issue: "SQLSTATE[HY000] [2002]"
**Solution**: Start MySQL in Laragon

---

## Test Connection

```bash
php artisan migrate:status
```

If successful, you'll see all migration tables listed!

---

## Next Steps

1. ✅ Database created
2. ✅ Tables created
3. ✅ Admin user created
4. 🚀 Start servers:
   ```bash
   php artisan serve
   cd react-frontend && npm run dev
   ```
5. 🌐 Open: http://localhost:5173
6. 🔐 Login with admin credentials

---

**Database name: `bulalacao health_hub` (with space) ✅**
