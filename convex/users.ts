import { query, mutation, internalMutation, QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";

// Helper to get user (read-only)
async function getUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", q => q.eq("clerkId", identity.subject))
    .first();
}

// Helper to ensure user exists (for mutations only)
export async function ensureUser(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  let user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", q => q.eq("clerkId", identity.subject))
    .first();

  // Auto-create user if doesn't exist
  if (!user) {
    const userId = await ctx.db.insert("users", {
      clerkId: identity.subject,
      email: identity.email,
      name: identity.name,
    });
    user = await ctx.db.get(userId);
  }

  return user;
}

// Get current user
export const getCurrent = query({
  handler: async (ctx) => {
    return await getUser(ctx);
  },
});

// Create or update user from Clerk webhook (internal only - for webhook setup if desired)
export const upsertFromClerk = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, { clerkId, email, name }) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", q => q.eq("clerkId", clerkId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { email, name });
      return existing._id;
    } else {
      return await ctx.db.insert("users", { clerkId, email, name });
    }
  },
});

// Delete user and their todos (internal only)
export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", q => q.eq("clerkId", clerkId))
      .first();

    if (!user) return;

    // Delete all user's todos
    const todos = await ctx.db
      .query("todos")
      .withIndex("by_user", q => q.eq("userId", clerkId))
      .collect();

    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    // Delete user
    await ctx.db.delete(user._id);
  },
});