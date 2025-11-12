-- Create Admin User for Bulalacao Health Hub
-- Email: admin@gmail.com
-- Password: Admin2025

USE bulalacao_health_hub;

-- Insert Admin User
INSERT INTO users (name, email, password, role, created_at, updated_at)
VALUES (
    'Administrator',
    'admin@gmail.com',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Password: Admin2025
    'admin',
    NOW(),
    NOW()
);

-- Get the last inserted user ID
SET @user_id = LAST_INSERT_ID();

-- Insert Patient record for admin
INSERT INTO patients (user_id, full_name, address, phone_number, gender, ip_status, tribe, medical_condition, created_at, updated_at)
VALUES (
    @user_id,
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

-- Show success message
SELECT 'Admin user created successfully!' AS message;
SELECT 'Email: admin@gmail.com' AS login_email;
SELECT 'Password: Admin2025' AS login_password;
