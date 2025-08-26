# Expo React Native Todo App with Convex + Clerk

A modern, real-time todo application built with Expo, React Native, Convex backend, and Clerk authentication. Features a clean, Notion-inspired design with secure user authentication and real-time data synchronization.

## Features

- 🔐 **Secure Authentication** - Email/password authentication with Clerk
- 🔄 **Real-time Sync** - Instant updates across all devices with Convex
- 📱 **Cross-Platform** - Works on iOS, Android, and Web
- 🎨 **Clean UI** - Notion-inspired design with smooth interactions
- 👤 **User Profiles** - Personal todo lists for each user
- ⚡ **Fast & Responsive** - Optimized performance with React Native

## Tech Stack

- **Frontend**: Expo, React Native, TypeScript
- **Backend**: Convex (serverless, real-time database)
- **Authentication**: Clerk
- **Navigation**: Expo Router
- **Icons**: Lucide React Native

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your credentials (see [SETUP.md](./SETUP.md) for detailed instructions)

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Start the app**
   ```bash
   npm run dev
   ```

## ⚠️ CRITICAL SETUP STEPS

### 1. Create Clerk Account & Configure JWT Template

1. **Sign up at [clerk.com](https://clerk.com)**
2. **Create new application** → Select "Expo" framework
3. **⚠️ CRITICAL: Set up JWT Template**
   - Go to **Configure** → **JWT Templates**
   - Click **"+ New template"**
   - Select **"Convex"** from the list
   - Name: Must be exactly `convex`
   - Click **Create**
4. **Get your keys:**
   - Go to **API Keys** tab
   - Copy **Publishable key** (starts with `pk_test_`)
   - Note your **Frontend API** URL (e.g., `https://your-app.clerk.accounts.dev`)

### 2. Create Convex Project & Set Environment Variable

1. **Sign up at [convex.dev](https://convex.dev)**
2. **Create new project**
3. **⚠️ CRITICAL: Set Clerk domain in Convex**
   - In Convex dashboard → **Settings** → **Environment Variables**
   - Add variable: `CLERK_JWT_ISSUER_DOMAIN`
   - Value: Your Clerk Frontend API URL (from step 1.4)
4. **Initialize Convex:**
   ```bash
   npx convex dev
   ```
   - Select your project
   - This creates `.env.local` with your Convex URL

### 3. Configure Your Environment Variables

**Create/update `.env.local` file with:**
```env
# Clerk - Get from clerk.com → Your App → API Keys
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE

# Convex - Auto-filled by 'npx convex dev'
EXPO_PUBLIC_CONVEX_URL=https://YOUR_PROJECT.convex.cloud
```

### 4. Deploy & Test

```bash
# Deploy Convex functions
npx convex deploy

# Start the app
npm run dev
```

**🚨 Common Setup Issues:**
- JWT template MUST be named exactly `convex` (case-sensitive)
- Environment variables MUST start with `EXPO_PUBLIC_` for Expo
- Clerk domain in Convex MUST match your Frontend API URL exactly
- Run `npx convex deploy` after any schema changes

For detailed setup instructions, see [SETUP.md](./SETUP.md).

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── providers/         # Context providers
├── components/            # Reusable UI components
├── convex/               # Backend functions and schema
│   ├── schema.ts        # Database schema
│   ├── todos.ts         # Todo CRUD operations
│   └── users.ts         # User management
├── hooks/                # Custom React hooks
└── assets/              # Images and fonts
```

## Environment Variables

Create a `.env.local` file with:

```env
# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Convex
EXPO_PUBLIC_CONVEX_URL=https://...convex.cloud
```

## Available Scripts

```bash
npm run dev        # Start Expo development server
npm run build:web  # Build for web platform
npm run lint       # Run ESLint
npx convex dev     # Start Convex development
npx convex deploy  # Deploy Convex functions
```

## Features in Detail

### Authentication
- Email/password sign up and sign in
- Email verification for new accounts
- Secure session management
- Protected routes

### Todo Management
- Create, read, update, delete todos
- Mark todos as complete/incomplete
- Filter by status (all, active, completed)
- Real-time updates across devices

### User Profile
- View account information
- Sign out functionality
- User-specific todo lists

## Security

- JWT-based authentication with Clerk
- Row-level security in Convex
- Secure token storage with Expo SecureStore
- Environment variables for sensitive data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
- Check [SETUP.md](./SETUP.md) for setup help
- Review the [Convex docs](https://docs.convex.dev)
- Review the [Clerk docs](https://clerk.com/docs)
- Open an issue on GitHub

## Acknowledgments

- Built with [Expo](https://expo.dev)
- Backend powered by [Convex](https://convex.dev)
- Authentication by [Clerk](https://clerk.com)