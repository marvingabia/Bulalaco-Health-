-- Fix Admin Password
-- This will update the admin password to: Admin2025

USE `bulalacao health_hub`;

-- Update admin user password
UPDATE users 
SET password = '$2y$10$hvHLdXFaRWd.78ZTDSLX8u1cHuuuZ2/tP0qVEYxD4QSQuamCuRaD2'
WHERE email = 'admin@gmail.com';

-- Verify the update
SELECT id, name, email, role, created_at 
FROM users 
WHERE email = 'admin@gmail.com';

SELECT 'Password updated successfully!' AS Status;
SELECT 'Email: admin@gmail.com' AS Login;
SELECT 'Password: Admin2025' AS Password;
