-- ========================================
-- BULALACAO HEALTH HUB - COMPLETE DATABASE
-- Hospital Management System
-- Database: bulalacao health_hub
-- ========================================

-- Drop database if exists (CAUTION: This will delete all data!)
-- DROP DATABASE IF EXISTS `bulalacao health_hub`;

-- Create Database
CREATE DATABASE IF NOT EXISTS `bulalacao health_hub` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `bulalacao health_hub`;

-- ========================================
-- TABLE 1: USERS
-- Stores user accounts (Admin and Patients)
-- ========================================
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'patient') NOT NULL DEFAULT 'patient',
    `remember_token` VARCHAR(100) NULL DEFAULT NULL,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABLE 2: PATIENTS
-- Stores patient medical information
-- ========================================
DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `address` TEXT NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `gender` ENUM('male', 'female', 'other') NOT NULL,
    `ip_status` ENUM('yes', 'no') NOT NULL COMMENT 'Indigenous People Status',
    `tribe` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Tribe name if IP status is yes',
    `medical_condition` TEXT NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `patients_user_id_foreign` (`user_id`),
    CONSTRAINT `patients_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABLE 3: STAFF
-- Stores hospital staff information
-- ========================================
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `department` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `status` ENUM('on-duty', 'off-duty') NOT NULL DEFAULT 'off-duty',
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABLE 4: ROOMS
-- Stores hospital room information
-- ========================================
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `room_number` VARCHAR(255) NOT NULL,
    `room_type` VARCHAR(255) NOT NULL,
    `capacity` INT NOT NULL,
    `status` ENUM('available', 'occupied', 'maintenance') NOT NULL DEFAULT 'available',
    `current_occupants` INT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `rooms_room_number_unique` (`room_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABLE 5: MEDICINES
-- Stores pharmacy inventory
-- ========================================
DROP TABLE IF EXISTS `medicines`;
CREATE TABLE `medicines` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `quantity` INT NOT NULL,
    `unit` VARCHAR(255) NOT NULL,
    `expiry_date` DATE NOT NULL,
    `supplier` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABLE 6: AMBULANCES
-- Stores ambulance fleet information
-- ========================================
DROP TABLE IF EXISTS `ambulances`;
CREATE TABLE `ambulances` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `vehicle_number` VARCHAR(255) NOT NULL,
    `driver_name` VARCHAR(255) NOT NULL,
    `driver_phone` VARCHAR(255) NOT NULL,
    `status` ENUM('available', 'on-call', 'maintenance') NOT NULL DEFAULT 'available',
    `last_maintenance` DATE NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `ambulances_vehicle_number_unique` (`vehicle_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABLE 7: PERSONAL ACCESS TOKENS
-- For Laravel Sanctum authentication
-- ========================================
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tokenable_type` VARCHAR(255) NOT NULL,
    `tokenable_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `abilities` TEXT NULL DEFAULT NULL,
    `last_used_at` TIMESTAMP NULL DEFAULT NULL,
    `expires_at` TIMESTAMP NULL DEFAULT NULL,
    `created_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
    KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`, `tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- TABLE 8: MIGRATIONS
-- Laravel migrations tracking
-- ========================================
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `migration` VARCHAR(255) NOT NULL,
    `batch` INT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- INSERT DEFAULT DATA
-- ========================================

-- Insert Admin User
-- Email: admin@gmail.com
-- Password: Admin2025
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@gmail.com', NULL, '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', NULL, NOW(), NOW());

-- Insert Patient Record for Admin
INSERT INTO `patients` (`id`, `user_id`, `full_name`, `address`, `phone_number`, `gender`, `ip_status`, `tribe`, `medical_condition`, `created_at`, `updated_at`) VALUES
(1, 1, 'Administrator', 'Bulalacao, Oriental Mindoro', '09123456789', 'male', 'no', NULL, 'N/A - System Administrator', NOW(), NOW());

-- ========================================
-- SAMPLE DATA (Optional - Uncomment to use)
-- ========================================

-- Sample Staff
-- INSERT INTO `staff` (`name`, `position`, `department`, `phone_number`, `status`, `created_at`, `updated_at`) VALUES
-- ('Dr. Juan Dela Cruz', 'Doctor', 'Emergency', '09171234567', 'on-duty', NOW(), NOW()),
-- ('Nurse Maria Santos', 'Nurse', 'Pediatrics', '09181234567', 'on-duty', NOW(), NOW()),
-- ('Dr. Pedro Reyes', 'Doctor', 'Surgery', '09191234567', 'off-duty', NOW(), NOW());

-- Sample Rooms
-- INSERT INTO `rooms` (`room_number`, `room_type`, `capacity`, `status`, `current_occupants`, `created_at`, `updated_at`) VALUES
-- ('101', 'General Ward', 4, 'available', 0, NOW(), NOW()),
-- ('102', 'ICU', 2, 'occupied', 1, NOW(), NOW()),
-- ('201', 'Private Room', 1, 'available', 0, NOW(), NOW()),
-- ('202', 'Emergency Room', 6, 'available', 0, NOW(), NOW());

-- Sample Medicines
-- INSERT INTO `medicines` (`name`, `category`, `quantity`, `unit`, `expiry_date`, `supplier`, `created_at`, `updated_at`) VALUES
-- ('Paracetamol', 'Painkiller', 500, 'tablets', '2026-12-31', 'PharmaCorp', NOW(), NOW()),
-- ('Amoxicillin', 'Antibiotic', 200, 'capsules', '2025-06-30', 'MediSupply', NOW(), NOW()),
-- ('Ibuprofen', 'Anti-inflammatory', 300, 'tablets', '2026-03-15', 'PharmaCorp', NOW(), NOW()),
-- ('Cetirizine', 'Antihistamine', 150, 'tablets', '2025-12-31', 'HealthPlus', NOW(), NOW());

-- Sample Ambulances
-- INSERT INTO `ambulances` (`vehicle_number`, `driver_name`, `driver_phone`, `status`, `last_maintenance`, `created_at`, `updated_at`) VALUES
-- ('AMB-001', 'Jose Garcia', '09201234567', 'available', '2025-10-15', NOW(), NOW()),
-- ('AMB-002', 'Roberto Cruz', '09211234567', 'on-call', '2025-09-20', NOW(), NOW()),
-- ('AMB-003', 'Miguel Torres', '09221234567', 'maintenance', '2025-08-10', NOW(), NOW());

-- ========================================
-- VIEWS (Optional - For reporting)
-- ========================================

-- View: Active Patients
CREATE OR REPLACE VIEW `active_patients` AS
SELECT 
    p.id,
    p.full_name,
    p.phone_number,
    p.gender,
    p.ip_status,
    p.tribe,
    u.email,
    p.created_at
FROM patients p
INNER JOIN users u ON p.user_id = u.id
WHERE u.role = 'patient'
ORDER BY p.created_at DESC;

-- View: Available Rooms
CREATE OR REPLACE VIEW `available_rooms` AS
SELECT 
    room_number,
    room_type,
    capacity,
    current_occupants,
    (capacity - current_occupants) AS available_beds
FROM rooms
WHERE status = 'available'
ORDER BY room_number;

-- View: Low Stock Medicines
CREATE OR REPLACE VIEW `low_stock_medicines` AS
SELECT 
    name,
    category,
    quantity,
    unit,
    expiry_date,
    supplier,
    DATEDIFF(expiry_date, CURDATE()) AS days_until_expiry
FROM medicines
WHERE quantity < 50 OR DATEDIFF(expiry_date, CURDATE()) < 90
ORDER BY quantity ASC, expiry_date ASC;

-- View: Staff on Duty
CREATE OR REPLACE VIEW `staff_on_duty` AS
SELECT 
    name,
    position,
    department,
    phone_number
FROM staff
WHERE status = 'on-duty'
ORDER BY department, position;

-- ========================================
-- STORED PROCEDURES (Optional)
-- ========================================

-- Procedure: Get Dashboard Statistics
DELIMITER $$
CREATE PROCEDURE `get_dashboard_stats`()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM patients) AS total_patients,
        (SELECT COUNT(*) FROM rooms WHERE status = 'occupied') AS occupied_rooms,
        (SELECT COUNT(*) FROM staff WHERE status = 'on-duty') AS staff_on_duty,
        (SELECT COUNT(*) FROM medicines) AS total_medicines,
        (SELECT COUNT(*) FROM ambulances WHERE status = 'available') AS available_ambulances;
END$$
DELIMITER ;

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Additional indexes for better query performance
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_patients_created_at ON patients(created_at);
CREATE INDEX idx_staff_status ON staff(status);
CREATE INDEX idx_rooms_status ON rooms(status);
CREATE INDEX idx_medicines_expiry ON medicines(expiry_date);
CREATE INDEX idx_ambulances_status ON ambulances(status);

-- ========================================
-- SUCCESS MESSAGE
-- ========================================
SELECT '✅ Database setup completed successfully!' AS Status;
SELECT 'bulalacao health_hub' AS DatabaseName;
SELECT 'admin@gmail.com' AS AdminEmail;
SELECT 'Admin2025' AS AdminPassword;
SELECT '8 tables created' AS TablesCreated;
SELECT '4 views created' AS ViewsCreated;
SELECT '1 stored procedure created' AS ProceduresCreated;

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Show all tables
SHOW TABLES;

-- Show admin user
SELECT id, name, email, role, created_at FROM users WHERE role = 'admin';

-- Show table counts
SELECT 
    'users' AS table_name, COUNT(*) AS record_count FROM users
UNION ALL
SELECT 'patients', COUNT(*) FROM patients
UNION ALL
SELECT 'staff', COUNT(*) FROM staff
UNION ALL
SELECT 'rooms', COUNT(*) FROM rooms
UNION ALL
SELECT 'medicines', COUNT(*) FROM medicines
UNION ALL
SELECT 'ambulances', COUNT(*) FROM ambulances;

-- ========================================
-- END OF SCRIPT
-- ========================================
