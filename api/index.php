<?php

// Laravel on Vercel entry point
// This file forwards all requests to Laravel's public/index.php

// Set the correct paths for Vercel serverless environment
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/../public/index.php';
$_SERVER['SCRIPT_NAME'] = '/api/index.php';
$_SERVER['PHP_SELF'] = '/api/index.php';

// Load Laravel
require __DIR__ . '/../public/index.php';
