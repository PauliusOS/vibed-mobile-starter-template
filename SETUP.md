# Convex + Clerk Setup Guide

This guide will help you set up your own Convex backend and Clerk authentication for this todo app.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- An Expo development environment set up
- iOS Simulator (Mac) or Android Emulator

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-name>

# Install dependencies
npm install
```

## Step 2: Set Up Clerk

1. **Create a Clerk Account**
   - Go to [clerk.com](https://clerk.com) and sign up
   - Create a new application
   - Choose "Expo" as your framework

2. **Configure Clerk Application**
   - In your Clerk Dashboard, go to **API Keys**
   - Copy your **Publishable Key** (starts with `pk_`)
   - Go to **JWT Templates** in the sidebar
   - Click **New Template** and select **Convex**
   - Name it "convex" (this exact name is important)
   - Save the template

3. **Get Your Clerk Domain**
   - In your Clerk Dashboard, go to **API Keys**
   - Note your Frontend API URL (e.g., `https://your-app.clerk.accounts.dev`)

## Step 3: Set Up Convex

1. **Create a Convex Account**
   - Go to [convex.dev](https://convex.dev) and sign up
   - Create a new project

2. **Initialize Convex in Your Project**
   ```bash
   npx convex dev
   ```
   - When prompted, select "Create a new project"
   - Enter your project name
   - This will create a `.env.local` file with your Convex URL

3. **Configure Convex Authentication**
   - In your Convex Dashboard, go to **Settings** → **Environment Variables**
   - Add a new variable:
     - Name: `CLERK_JWT_ISSUER_DOMAIN`
     - Value: Your Clerk Frontend API URL (from Step 2.3)

## Step 4: Configure Environment Variables

1. **Update `.env.local`** with your credentials:
   ```env
   # Clerk Configuration
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

   # Convex Configuration (auto-populated by npx convex dev)
   EXPO_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
   ```

2. **Verify your setup**:
   - Ensure `.env.local` is in your `.gitignore` (it should be by default)
   - Never commit your actual keys to version control

## Step 5: Deploy Convex Functions

```bash
# Deploy your Convex functions
npx convex deploy
```

This will deploy your schema and functions to your Convex backend.

## Step 6: Run the Application

**Important: You must run this command yourself in your terminal** (not through an AI agent) to see the QR code and interactive prompt:

```bash
npm run dev
```

Once the server starts, you'll see:
- A QR code to scan with your Expo Go app
- Interactive options to press 'i' for iOS Simulator or 'a' for Android Emulator

## Step 7: Test the Integration

1. **Sign Up Flow**
   - Open the app
   - You'll be redirected to the sign-in screen
   - Tap "Sign Up" to create a new account
   - Enter your email and password
   - Check your email for the verification code
   - Enter the code to complete signup

2. **Todo Functionality**
   - After signing in, create a new todo
   - Toggle completion status
   - Delete todos
   - All changes sync in real-time

3. **Sign Out**
   - Go to the Settings tab
   - Tap "Sign Out"
   - You'll be redirected to the sign-in screen

## Troubleshooting

### "Missing Clerk Publishable Key" Error
- Ensure `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` is set in `.env.local`
- Restart the Expo dev server after adding environment variables

### "Failed to connect to Convex" Error
- Ensure `EXPO_PUBLIC_CONVEX_URL` is set correctly
- Check that your Convex functions are deployed: `npx convex deploy`
- Verify your internet connection

### Authentication Not Working
- Verify the JWT template in Clerk is named exactly "convex"
- Check that `CLERK_JWT_ISSUER_DOMAIN` is set in Convex environment variables
- Ensure you're using the correct Clerk publishable key

### Todos Not Syncing
- Check the Convex Dashboard logs for any errors
- Ensure you're authenticated (check the network tab for auth tokens)
- Verify the Convex schema matches your code

## Production Deployment

For production deployment:

1. **Environment Variables**
   - Use production keys from Clerk and Convex
   - Set up proper environment management for your deployment platform

2. **Security**
   - Enable appropriate security rules in Convex
   - Configure allowed domains in Clerk
   - Set up proper CORS policies

3. **Monitoring**
   - Set up error tracking (e.g., Sentry)
   - Monitor Convex function performance
   - Track authentication metrics in Clerk

## Additional Resources

- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [Expo Documentation](https://docs.expo.dev)
- [Convex + Clerk Integration Guide](https://docs.convex.dev/auth/clerk)

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs in your development environment
3. Check the Convex Dashboard for function errors
4. Review the Clerk Dashboard for authentication issues

## Next Steps

Once your setup is complete, you can:
- Customize the authentication flow
- Add social login providers in Clerk
- Implement additional Convex functions
- Add offline support with Convex's caching
- Implement real-time collaboration features