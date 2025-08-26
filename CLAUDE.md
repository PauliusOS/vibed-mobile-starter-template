# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start the Expo development server (with telemetry disabled)
- `npm run build:web` - Build for web platform
- `npm run lint` - Run ESLint checks

## Architecture Overview

This is an Expo React Native todo app using Expo Router for navigation with a tab-based structure.

### Project Structure
- `app/` - Uses Expo Router file-based routing
  - `app/(tabs)/` - Tab navigation with index (todos) and settings screens
  - `app/_layout.tsx` - Root layout with Stack navigator
- `components/` - Reusable UI components for todo functionality
- `hooks/` - Custom hooks including `useFrameworkReady` for framework integration

### Key Architecture Patterns
- Uses TypeScript with strict mode enabled
- Path aliases configured with `@/*` mapping to root directory
- Components follow React Native StyleSheet pattern for styling
- State management is local React state (no external state library)
- Todo data structure: `{ id: string, text: string, completed: boolean, createdAt: Date }`

### Navigation Structure
- Root Stack navigator with headerless screens
- Tab navigation with two tabs: Todos and Settings
- Uses Lucide React Native icons for UI elements

### Styling Approach
- Inline StyleSheet.create() patterns
- Consistent color palette using hex values
- Platform-specific adjustments (iOS/Android) for tab bar spacing
- No external styling library (no NativeWind/Tailwind despite project name)