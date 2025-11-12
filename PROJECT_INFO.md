# Bulalacao Health Hub - Project Information

## 📋 Project Overview

**Name**: Bulalacao Health Hub  
**Type**: Hospital Management System  
**Location**: Bulalacao, Oriental Mindoro  
**Tech Stack**: Laravel + React (JSX)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                     │
│              (Port 5173 - Vite Dev)                 │
│                                                      │
│  - JSX Components (NOT TypeScript)                  │
│  - React Router for navigation                      │
│  - Axios for API calls                              │
│  - Tailwind CSS for styling                         │
│  - Context API for state management                 │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ HTTP/REST API
                   │ (JSON)
                   │
┌──────────────────▼──────────────────────────────────┐
│                Laravel Backend                       │
│              (Port 8000 - Artisan)                  │
│                                                      │
│  - RESTful API                                      │
│  - Laravel Sanctum (Authentication)                 │
│  - MySQL Database                                   │
│  - Role-based Access Control                        │
└──────────────────┬──────────────────────────────────┘
                   │
                   │
┌──────────────────▼──────────────────────────────────┐
│                MySQL Database                        │
│           (bulalacao_health_hub)                    │
│                                                      │
│  - Users, Patients, Staff                           │
│  - Rooms, Medicines, Ambulances                     │
└─────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
backend-laravel/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/
│   │   │   ├── AuthController.php          # Login, Register, Logout
│   │   │   ├── PatientController.php       # Patient CRUD
│   │   │   ├── StaffController.php         # Staff CRUD
│   │   │   ├── RoomController.php          # Room CRUD
│   │   │   ├── MedicineController.php      # Medicine CRUD
│   │   │   └── AmbulanceController.php     # Ambulance CRUD
│   │   └── Middleware/
│   │       └── AdminMiddleware.php         # Admin-only access
│   └── Models/
│       ├── User.php                        # User model (with role)
│       ├── Patient.php                     # Patient model
│       ├── Staff.php                       # Staff model
│       ├── Room.php                        # Room model
│       ├── Medicine.php                    # Medicine model
│       └── Ambulance.php                   # Ambulance model
├── database/
│   └── migrations/                         # All database tables
├── routes/
│   └── api.php                            # API routes
└── .env                                   # Environment config

react-frontend/
├── src/
│   ├── components/
│   │   ├── Button.jsx                     # Reusable button
│   │   ├── Card.jsx                       # Card components
│   │   ├── Input.jsx                      # Input component
│   │   ├── ProtectedRoute.jsx             # Auth guard
│   │   └── Sidebar.jsx                    # Navigation sidebar
│   ├── context/
│   │   └── AuthContext.jsx                # Auth state management
│   ├── layouts/
│   │   └── DashboardLayout.jsx            # Dashboard wrapper
│   ├── pages/
│   │   ├── HomePage.jsx                   # Landing page
│   │   ├── LoginPage.jsx                  # Login form
│   │   ├── RegisterPage.jsx               # Registration form
│   │   ├── Dashboard.jsx                  # Main dashboard
│   │   ├── Patients.jsx                   # Patients list
│   │   ├── Staff.jsx                      # Staff management
│   │   ├── Rooms.jsx                      # Room management
│   │   ├── Pharmacy.jsx                   # Medicine inventory
│   │   ├── Ambulance.jsx                  # Ambulance fleet
│   │   └── MyRecords.jsx                  # Patient records
│   ├── services/
│   │   └── api.js                         # Axios API client
│   ├── App.jsx                            # Main app component
│   ├── main.jsx                           # Entry point
│   └── index.css                          # Global styles
└── package.json                           # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: #A0D2EB (Soft Blue)
- **Background**: #F0F4F8 (Light Gray)
- **Accent**: #B2D7D0 (Muted Green)

### Typography
- **Font Family**: PT Sans
- **Weights**: 400 (Regular), 700 (Bold)

### Components
- Built with Tailwind CSS
- Custom components in `src/components/`
- Lucide React for icons

## 🔐 Authentication Flow

```
1. User Registration
   ├─> Fill registration form
   ├─> Backend creates User + Patient records
   ├─> First user gets 'admin' role
   └─> Subsequent users get 'patient' role

2. User Login
   ├─> Submit email + password
   ├─> Backend validates credentials
   ├─> Returns JWT token (Sanctum)
   ├─> Frontend stores token in localStorage
   └─> Redirect to dashboard

3. Protected Routes
   ├─> Check if token exists
   ├─> Verify with backend
   ├─> Load user data
   └─> Show appropriate UI (Admin/Patient)

4. Logout
   ├─> Call logout API
   ├─> Delete token from backend
   ├─> Clear localStorage
   └─> Redirect to home
```

## 👥 User Roles

### Admin (First User)
**Access**:
- ✅ Dashboard with statistics
- ✅ View all patients
- ✅ Manage staff
- ✅ Manage rooms
- ✅ Manage pharmacy
- ✅ Manage ambulances

**Permissions**:
- Full CRUD on all resources
- View system statistics
- Manage all users

### Patient (Subsequent Users)
**Access**:
- ✅ Personal dashboard
- ✅ View own medical records
- ✅ View personal information

**Permissions**:
- Read-only access to own data
- Cannot access admin features

## 🗄️ Database Tables

### users
```sql
- id (primary key)
- name
- email (unique)
- password (hashed)
- role (admin/patient)
- created_at, updated_at
```

### patients
```sql
- id (primary key)
- user_id (foreign key -> users)
- full_name
- address
- phone_number
- gender (male/female/other)
- ip_status (yes/no)
- tribe (nullable)
- medical_condition (text)
- created_at, updated_at
```

### staff
```sql
- id (primary key)
- name
- position
- department
- phone_number
- status (on-duty/off-duty)
- created_at, updated_at
```

### rooms
```sql
- id (primary key)
- room_number (unique)
- room_type
- capacity (integer)
- status (available/occupied/maintenance)
- current_occupants (integer)
- created_at, updated_at
```

### medicines
```sql
- id (primary key)
- name
- category
- quantity (integer)
- unit
- expiry_date (date)
- supplier
- created_at, updated_at
```

### ambulances
```sql
- id (primary key)
- vehicle_number (unique)
- driver_name
- driver_phone
- status (available/on-call/maintenance)
- last_maintenance (date)
- created_at, updated_at
```

## 🔌 API Endpoints

### Public
```
POST /api/register    - Register new user
POST /api/login       - Login user
```

### Authenticated
```
POST /api/logout      - Logout
GET  /api/user        - Get current user
GET  /api/patients    - List patients
```

### Admin Only
```
POST   /api/staff         - Create staff
PUT    /api/staff/{id}    - Update staff
DELETE /api/staff/{id}    - Delete staff

POST   /api/rooms         - Create room
PUT    /api/rooms/{id}    - Update room
DELETE /api/rooms/{id}    - Delete room

POST   /api/medicines         - Create medicine
PUT    /api/medicines/{id}    - Update medicine
DELETE /api/medicines/{id}    - Delete medicine

POST   /api/ambulances         - Create ambulance
PUT    /api/ambulances/{id}    - Update ambulance
DELETE /api/ambulances/{id}    - Delete ambulance
```

## 🚀 Development Workflow

### Starting Development
```bash
# Terminal 1 - Backend
php artisan serve

# Terminal 2 - Frontend
cd react-frontend
npm run dev
```

### Making Changes

**Backend Changes**:
1. Edit controller/model/migration
2. Run migration if needed: `php artisan migrate`
3. Test API endpoint with Postman/browser
4. Changes reflect immediately (no restart needed)

**Frontend Changes**:
1. Edit JSX component
2. Save file
3. Vite hot-reloads automatically
4. Check browser (changes appear instantly)

### Adding New Features

**New API Endpoint**:
1. Add route in `routes/api.php`
2. Create/update controller method
3. Test with Postman
4. Update frontend API service

**New Page**:
1. Create JSX file in `src/pages/`
2. Add route in `src/App.jsx`
3. Add sidebar link if needed
4. Style with Tailwind CSS

## 🐛 Common Issues & Solutions

### Backend Issues

**"Database connection error"**
```bash
# Check MySQL is running in Laragon
# Verify .env database credentials
# Create database if missing
```

**"Class not found"**
```bash
composer dump-autoload
```

**"Migration error"**
```bash
php artisan migrate:fresh
```

### Frontend Issues

**"Cannot connect to API"**
```bash
# Make sure backend is running on port 8000
# Check src/services/api.js API_URL
```

**"Module not found"**
```bash
cd react-frontend
npm install
```

**"Port 5173 in use"**
```bash
# Kill the process or use different port
npm run dev -- --port 5174
```

## 📦 Dependencies

### Backend (Laravel)
- laravel/framework: ^10.0
- laravel/sanctum: ^3.0 (Authentication)
- guzzlehttp/guzzle: ^7.0

### Frontend (React)
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.22.0 (Routing)
- axios: ^1.6.7 (HTTP client)
- lucide-react: ^0.263.1 (Icons)
- tailwindcss: ^3.4.18 (Styling)
- vite: ^4.4.5 (Build tool)

## 🔒 Security Features

- ✅ Password hashing (bcrypt)
- ✅ JWT token authentication (Sanctum)
- ✅ CORS configuration
- ✅ Admin middleware
- ✅ Input validation
- ✅ SQL injection protection (Eloquent ORM)
- ✅ XSS protection (React escaping)

## 📈 Future Enhancements

### Phase 2
- [ ] Appointment scheduling
- [ ] Medical records upload
- [ ] Doctor assignments
- [ ] Patient history timeline

### Phase 3
- [ ] Billing system
- [ ] Insurance integration
- [ ] Reports generation
- [ ] Analytics dashboard

### Phase 4
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Mobile app (React Native)
- [ ] Telemedicine integration

## 📞 Support

### For Development Issues
1. Check browser console (F12)
2. Check Laravel logs: `storage/logs/laravel.log`
3. Check network tab for API errors
4. Verify both servers are running

### For Database Issues
1. Check MySQL is running
2. Verify database exists
3. Run migrations: `php artisan migrate`
4. Check `.env` credentials

## 📝 Notes

- **All frontend files are in JSX** (not TypeScript/TSX)
- **First registered user becomes Admin** automatically
- **Backend runs on port 8000**, frontend on port 5173
- **Database name**: bulalacao_health_hub
- **CORS is configured** for local development

---

**Project Status**: ✅ Ready for Development  
**Last Updated**: November 10, 2025  
**Version**: 1.0.0
