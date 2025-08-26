import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get current user
export const getCurrent = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", q => q.eq("clerkId", identity.subject))
      .first();
    
    return user;
  },
});

// Create or update user from Clerk webhook
export const upsert = mutation({
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

// Delete user and their todos
export const deleteUser = mutation({
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