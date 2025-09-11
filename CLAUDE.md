# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the Expo development server (with telemetry disabled)
- `npm run build:web` - Build for web platform
- `npm run lint` - Run ESLint checks
- `npx convex dev` - Start Convex development server
- `npx convex deploy` - Deploy Convex functions to production

## Architecture Overview

This is an Expo React Native todo app with Convex backend and Clerk authentication, using Expo Router for navigation with a tab-based structure.

### Project Structure
- `app/` - Uses Expo Router file-based routing
  - `app/(auth)/` - Authentication screens (sign-in, sign-up)
  - `app/(tabs)/` - Protected tab navigation with todos and settings screens
  - `app/providers/` - Context providers for authentication and backend
  - `app/_layout.tsx` - Root layout with AuthProvider wrapper
- `components/` - Reusable UI components for todo functionality
- `convex/` - Backend functions and schema
  - `schema.ts` - Database schema definition
  - `todos.ts` - Todo CRUD operations
  - `users.ts` - User management functions
  - `auth.config.ts` - Clerk authentication configuration
- `hooks/` - Custom hooks including `useFrameworkReady` for framework integration

### Key Architecture Patterns
- Uses TypeScript with strict mode enabled
- Path aliases configured with `@/*` mapping to root directory
- Components follow React Native StyleSheet pattern for styling
- Real-time data synchronization with Convex
- JWT-based authentication with Clerk
- Todo data structure: `{ _id: Id<"todos">, text: string, completed: boolean, createdAt: number, userId: string }`
- Custom hooks for framework integration (`useFrameworkReady`)
- ESLint configuration with Expo flat config structure

### Authentication & Security
- Protected routes using Clerk's `useAuth` hook
- User-specific data filtering at the database level
- Secure token storage with Expo SecureStore
- JWT tokens with Convex integration

### Backend Integration
- Convex provides real-time database with TypeScript support
- All mutations and queries are type-safe
- Automatic optimistic updates and real-time sync
- Row-level security ensures users only see their own todos

### Navigation Structure
- Root Stack navigator with AuthProvider
- Protected tab navigation with authentication checks
- Authentication flow with sign-in/sign-up screens
- Uses Lucide React Native icons for UI elements

### Styling Approach
- Inline StyleSheet.create() patterns
- Consistent color palette using hex values (#1F2937, #9CA3AF, #10B981, etc.)
- Platform-specific adjustments (iOS/Android) for tab bar spacing
- No external styling library (no NativeWind/Tailwind despite project name)
- Notion-inspired clean UI design with rounded corners and subtle shadows

### Component Structure
- `TodoItem.tsx` - Individual todo list item with checkbox, text, and delete button
- `AddTodoForm.tsx` - Form component for creating new todos
- `FilterTabs.tsx` - Tab navigation for filtering todos (all, active, completed)
- `EmptyState.tsx` - Component shown when no todos match current filter

### Backend Schema & Operations
- **Todos table**: `{ _id, text: string, completed: boolean, userId: string, createdAt: number }`
- **Users table**: `{ _id, clerkId: string, email?: string, name?: string }`
- Row-level security with user-specific queries using `identity.subject`
- CRUD operations: `list`, `add`, `toggle`, `remove`, `update` in todos.ts
- Debug authentication helper for troubleshooting auth issues

### Development Environment
- Node.js 18+ required
- Expo SDK 53.0.22
- React 19.0.0 and React Native 0.79.5
- TypeScript 5.8.3 with strict mode
- ESLint with Expo flat config
- No testing framework configured

### Configuration Files
- `app.json` - Expo configuration with typed routes enabled
- `tsconfig.json` - TypeScript config extending Expo base with path aliases
- `eslint.config.js` - ESLint flat configuration
- `.env.example` - Environment variables template
- `convex.json` - Convex project configuration