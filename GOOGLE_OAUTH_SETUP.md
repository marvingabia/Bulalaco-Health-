# Google OAuth Setup Guide

## What Was Implemented

✅ Installed `@react-oauth/google` package
✅ Added GoogleOAuthProvider to App.jsx
✅ Implemented Google Login button in RegisterPage
✅ Added popup functionality for Gmail account selection

## How It Works Now

When users click "Continue with Google":
1. A Google popup window appears
2. Shows all Gmail accounts logged in on the browser
3. User can select an existing account
4. Or click "Use another account" to sign in with a different Gmail
5. Or click "Create account" to make a new Gmail

## To Make It Fully Functional

You need to get a Google OAuth Client ID. Here's how:

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it "Bulalacao Health Hub"

### Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click "Enable"

### Step 3: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add these Authorized JavaScript origins:
   - `http://localhost:5173`
   - `http://localhost:3000`
   - Your production URL (when deployed)
5. Add these Authorized redirect URIs:
   - `http://localhost:5173`
   - `http://localhost:3000`
   - Your production URL
6. Click "Create"
7. Copy the **Client ID** (looks like: `123456789-abc123.apps.googleusercontent.com`)

### Step 4: Add Client ID to Your App

1. Open `react-frontend/src/App.jsx`
2. Find this line:
   ```javascript
   <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
   ```
3. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:
   ```javascript
   <GoogleOAuthProvider clientId="123456789-abc123.apps.googleusercontent.com">
   ```

### Step 5: Update Backend (Optional)

To fully integrate with your Laravel backend:

1. Install Laravel Socialite:
   ```bash
   composer require laravel/socialite
   ```

2. Add Google credentials to `.env`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
   ```

3. Create a Google auth controller to handle the OAuth response

## Current Functionality

Right now, the Google button will:
- ✅ Show Google's account picker popup
- ✅ Let users select existing Gmail accounts
- ✅ Allow creating new Gmail accounts
- ✅ Return user information (name, email, profile picture)
- ⚠️ Shows an alert (needs backend integration to actually register)

## Testing Without Client ID

The app will still work, but clicking "Continue with Google" will show an error. Users can still register using the email form below.

## Security Notes

- Never commit your Client ID to public repositories
- Use environment variables for production
- Always validate tokens on the backend
- Implement proper CSRF protection

## Next Steps

1. Get Google OAuth Client ID (follow steps above)
2. Add it to App.jsx
3. Test the Google login popup
4. Implement backend OAuth handling
5. Connect frontend Google response to backend registration

## Support

If you need help setting up Google OAuth:
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth Google Docs](https://www.npmjs.com/package/@react-oauth/google)
