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

## Configuration

You'll need to set up:
1. A Clerk account for authentication
2. A Convex project for the backend

See [SETUP.md](./SETUP.md) for complete setup instructions.

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