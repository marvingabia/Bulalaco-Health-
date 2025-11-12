-- ========================================
-- Bulalacao Health Hub - Complete Database Setup
-- ========================================

-- Create Database (with space in name)
CREATE DATABASE IF NOT EXISTS `bulalacao health_hub`;
USE `bulalacao health_hub`;

-- ========================================
-- 1. Users Table
-- ========================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'patient') NOT NULL DEFAULT 'patient',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 2. Patients Table
-- ========================================
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    ip_status ENUM('yes', 'no') NOT NULL,
    tribe VARCHAR(255) NULL,
    medical_condition TEXT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 3. Staff Table
-- ========================================
CREATE TABLE IF NOT EXISTS staff (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    status ENUM('on-duty', 'off-duty') NOT NULL DEFAULT 'off-duty',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 4. Rooms Table
-- ========================================
CREATE TABLE IF NOT EXISTS rooms (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(255) NOT NULL UNIQUE,
    room_type VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    status ENUM('available', 'occupied', 'maintenance') NOT NULL DEFAULT 'available',
    current_occupants INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 5. Medicines Table
-- ========================================
CREATE TABLE IF NOT EXISTS medicines (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(255) NOT NULL,
    expiry_date DATE NOT NULL,
    supplier VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 6. Ambulances Table
-- ========================================
CREATE TABLE IF NOT EXISTS ambulances (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(255) NOT NULL UNIQUE,
    driver_name VARCHAR(255) NOT NULL,
    driver_phone VARCHAR(255) NOT NULL,
    status ENUM('available', 'on-call', 'maintenance') NOT NULL DEFAULT 'available',
    last_maintenance DATE NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 7. Personal Access Tokens Table (for Laravel Sanctum)
-- ========================================
CREATE TABLE IF NOT EXISTS personal_access_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    abilities TEXT NULL,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX personal_access_tokens_tokenable_type_tokenable_id_index (tokenable_type, tokenable_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- 8. Insert Admin User
-- ========================================
-- Password: Admin2025 (hashed with bcrypt)
INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES (
    'Administrator',
    'admin@gmail.com',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'admin',
    NOW(),
    NOW()
);

-- Get the admin user ID
SET @admin_id = LAST_INSERT_ID();

-- Insert Patient record for admin
INSERT INTO patients (user_id, full_name, address, phone_number, gender, ip_status, tribe, medical_condition, created_at, updated_at)
VALUES (
    @admin_id,
    'Administrator',
    'Bulalacao, Oriental Mindoro',
    '09123456789',
    'male',
    'no',
    NULL,
    'N/A - System Administrator',
    NOW(),
    NOW()
);

-- ========================================
-- Success Message
-- ========================================
SELECT 'Database setup completed successfully!' AS Status;
SELECT 'Database name: bulalacao health_hub' AS DatabaseName;
SELECT 'Login with: admin@gmail.com / Admin2025' AS Credentials;
