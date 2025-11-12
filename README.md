# 🏥 Bulalacao Health Hub

A comprehensive Hospital Management System built with Laravel (Backend) and React (Frontend).

## ✨ Features

### 👥 User Management
- **Patient Registration** - Register with medical history
- **Staff Registration** - Create staff accounts with login credentials
- **Role-Based Access** - Admin, Staff, and Patient roles

### 🏥 Hospital Management
- **Patient Records** - Complete medical records management
- **Staff Management** - CRUD operations for staff
- **Room Management** - Track room availability and occupancy
- **Laboratory** - Blood tests and urinalysis management
- **Pharmacy** - Medicine inventory management
- **Ambulance** - Emergency ambulance services
- **Billing** - Patient billing system
- **Morgue** - Morgue management

### 📋 Patient Records Features
- Complaint & Diagnosis tracking
- Discharge scheduling
- Billing information
- Prescription generation (downloadable/printable)
- Hospital transfer papers (downloadable/printable)

### 📱 Responsive Design
- ✅ Works on Desktop
- ✅ Works on Tablet
- ✅ Works on Mobile (Android/iOS)
- Beautiful rainbow-colored UI with oblong buttons

## 🚀 Tech Stack

**Backend:**
- Laravel 9.x
- MySQL Database
- RESTful API
- Sanctum Authentication

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- React Router

## 📦 Installation

### Prerequisites
- PHP 8.0+
- Composer
- Node.js 16+
- MySQL

### Backend Setup
```bash
# Install dependencies
composer install

# Copy environment file
copy .env.example .env

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start server
php artisan serve
```

### Frontend Setup
```bash
cd react-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Deployment

### Vercel Deployment (Frontend)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `react-frontend`
4. Deploy!

### Backend Deployment
Deploy Laravel backend to your preferred hosting (Railway, Heroku, etc.)

## 👨‍💻 Default Credentials

First user to register becomes admin automatically.

## 📸 Screenshots

- Rainbow-colored sidebar navigation
- Responsive design for all devices
- Modern oblong/pill-shaped buttons and inputs

## 🤝 Contributing

This is a hospital management system for Bulalacao, Oriental Mindoro.

## 📄 License

Private project for Bulalacao Health Hub

## 📞 Contact

For support, contact the hospital administration.
