# Feature: Convex + Clerk Authentication Implementation Plan

## Overview
This document outlines the implementation plan for integrating Convex backend with Clerk authentication in the Expo React Native todo app. The goal is to create a production-ready boilerplate that future developers can easily configure with their own environment variables.

## Architecture Goals
- **Easy Environment Swapping**: All credentials stored in environment variables
- **Type-Safe**: Full TypeScript support throughout
- **Real-time Sync**: Leverage Convex's reactive database with authenticated users
- **Secure**: Industry-standard JWT authentication with Clerk
- **Developer-Friendly**: Clear separation of concerns and minimal boilerplate

## Implementation Phases

### Phase 1: Dependencies & Initial Setup
**Files to modify:**
- `package.json`
- `.env.local` (new file)
- `.gitignore`

**Actions:**
1. Install core dependencies:
   ```bash
   npm install convex @clerk/clerk-expo convex-react-clerk
   npm install --save-dev @types/react
   ```

2. Create environment configuration:
   - Add `.env.local` to `.gitignore`
   - Create `.env.example` with template variables:
     ```
     EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
     EXPO_PUBLIC_CONVEX_URL=
     ```

### Phase 2: Convex Backend Setup
**Files to create/modify:**
- `convex/` (new directory)
- `convex/schema.ts`
- `convex/auth.config.ts`
- `convex/todos.ts`
- `convex/users.ts`

**Actions:**
1. Initialize Convex project:
   ```bash
   npx convex dev
   ```

2. Define schema for todos with user ownership:
   ```typescript
   // convex/schema.ts
   import { defineSchema, defineTable } from "convex/server";
   import { v } from "convex/values";

   export default defineSchema({
     todos: defineTable({
       text: v.string(),
       completed: v.boolean(),
       userId: v.string(),
       createdAt: v.number(),
     }).index("by_user", ["userId"]),
     
     users: defineTable({
       clerkId: v.string(),
       email: v.optional(v.string()),
       name: v.optional(v.string()),
     }).index("by_clerk_id", ["clerkId"]),
   });
   ```

3. Configure Clerk authentication:
   ```typescript
   // convex/auth.config.ts
   export default {
     providers: [
       {
         domain: process.env.CLERK_JWT_ISSUER_DOMAIN || "https://your-clerk-domain.clerk.accounts.dev",
         applicationID: "convex",
       },
     ],
   };
   ```

### Phase 3: Clerk Integration
**Files to modify:**
- `app/_layout.tsx`
- Create `app/providers/AuthProvider.tsx`

**Actions:**
1. Create authentication provider wrapper:
   ```typescript
   // app/providers/AuthProvider.tsx
   import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
   import { ConvexProviderWithClerk } from "convex/react-clerk";
   import { ConvexReactClient } from "convex/react";
   
   const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);
   
   export function AuthProvider({ children }: { children: React.ReactNode }) {
     return (
       <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
         <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
           {children}
         </ConvexProviderWithClerk>
       </ClerkProvider>
     );
   }
   ```

2. Update root layout to use providers

### Phase 4: Authentication Flows
**Files to create/modify:**
- `app/(auth)/` (new directory)
- `app/(auth)/_layout.tsx`
- `app/(auth)/sign-in.tsx`
- `app/(auth)/sign-up.tsx`
- `app/(tabs)/_layout.tsx` (protect tabs)

**Actions:**
1. Create authentication screens using Clerk's custom flows
2. Implement protected route logic using `useAuth()` hook
3. Add sign-out functionality to settings

### Phase 5: Convert Todo Logic to Convex
**Files to modify:**
- `app/(tabs)/index.tsx`
- `components/TodoItem.tsx`
- `components/AddTodoForm.tsx`
- Remove local state management

**Actions:**
1. Replace local state with Convex queries and mutations:
   ```typescript
   // convex/todos.ts
   import { query, mutation } from "./_generated/server";
   import { v } from "convex/values";
   
   export const list = query({
     handler: async (ctx) => {
       const identity = await ctx.auth.getUserIdentity();
       if (!identity) return [];
       
       return await ctx.db
         .query("todos")
         .withIndex("by_user", q => q.eq("userId", identity.subject))
         .order("desc")
         .collect();
     },
   });
   
   export const add = mutation({
     args: { text: v.string() },
     handler: async (ctx, { text }) => {
       const identity = await ctx.auth.getUserIdentity();
       if (!identity) throw new Error("Not authenticated");
       
       return await ctx.db.insert("todos", {
         text,
         completed: false,
         userId: identity.subject,
         createdAt: Date.now(),
       });
     },
   });
   ```

2. Update React components to use Convex hooks

### Phase 6: User Profile Management
**Files to create/modify:**
- `app/(tabs)/settings.tsx`
- `components/UserProfile.tsx`

**Actions:**
1. Display user information from Clerk
2. Add profile management features
3. Implement account deletion with data cleanup

### Phase 7: Development Experience
**Files to create/modify:**
- `scripts/setup.js` (new)
- `README.md`
- `SETUP.md` (new)

**Actions:**
1. Create setup script for easy onboarding:
   ```javascript
   // scripts/setup.js
   // Checks for required env vars
   // Provides setup instructions
   // Validates Convex connection
   ```

2. Update README with clear setup instructions
3. Create detailed SETUP.md guide

### Phase 8: Testing & Validation
**Actions:**
1. Test authentication flows
2. Verify data persistence
3. Test environment variable swapping
4. Ensure TypeScript types are correct
5. Test on iOS and Android simulators

## Environment Variables Required

```env
# Clerk Configuration
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Convex Configuration  
EXPO_PUBLIC_CONVEX_URL=https://...convex.cloud
CLERK_JWT_ISSUER_DOMAIN=https://...clerk.accounts.dev

# Optional (for production)
CLERK_WEBHOOK_SECRET=whsec_... (for syncing user data)
```

## Security Considerations

1. **JWT Validation**: Convex automatically validates Clerk JWTs
2. **Row-Level Security**: All queries filter by authenticated user
3. **Environment Isolation**: Separate dev/staging/prod environments
4. **Secret Management**: Never commit actual keys to repository

## Developer Onboarding Process

1. Clone repository
2. Copy `.env.example` to `.env.local`
3. Create Clerk account and get keys
4. Create Convex project and get URL
5. Run `npm install`
6. Run `npx convex dev` to setup backend
7. Run `npm run dev` to start app

## Migration Path for Existing Users

Since this is a boilerplate, no migration needed. However, the pattern supports:
- Easy swap between auth providers (Auth0, Supabase, etc.)
- Simple environment variable updates
- Clear separation between auth and business logic

## Success Criteria

- [ ] User can sign up with email/password
- [ ] User can sign in and see only their todos
- [ ] Todos persist across sessions
- [ ] Real-time sync across devices
- [ ] Clean logout removes local session
- [ ] Environment variables can be swapped easily
- [ ] TypeScript provides full type safety
- [ ] Setup takes less than 10 minutes

## Future Enhancements

- Social login providers (Google, GitHub)
- Biometric authentication
- Offline support with sync
- Multi-tenant support
- Rate limiting
- Analytics integration

## Resources

- [Convex Docs: React Native](https://docs.convex.dev/client/react-native)
- [Clerk Docs: Expo](https://clerk.com/docs/quickstarts/expo)
- [Convex + Clerk Integration](https://docs.convex.dev/auth/clerk)
- [Blog: User Authentication with Clerk and Convex](https://stack.convex.dev/user-authentication-with-clerk-and-convex)