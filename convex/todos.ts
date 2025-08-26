import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all todos for authenticated user
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

// Add a new todo
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

// Toggle todo completion status
export const toggle = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const todo = await ctx.db.get(id);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== identity.subject) throw new Error("Unauthorized");
    
    await ctx.db.patch(id, { completed: !todo.completed });
  },
});

// Delete a todo
export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const todo = await ctx.db.get(id);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== identity.subject) throw new Error("Unauthorized");
    
    await ctx.db.delete(id);
  },
});

// Update todo text
export const update = mutation({
  args: { 
    id: v.id("todos"),
    text: v.string()
  },
  handler: async (ctx, { id, text }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const todo = await ctx.db.get(id);
    if (!todo) throw new Error("Todo not found");
    if (todo.userId !== identity.subject) throw new Error("Unauthorized");
    
    await ctx.db.patch(id, { text });
  },
});