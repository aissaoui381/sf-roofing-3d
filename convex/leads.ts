import { mutation } from './_generated/server';
import { internal } from './_generated/api';
import { v } from 'convex/values';

export const submitLead = mutation({
  args: {
    email:    v.string(),
    service:  v.string(),
    size:     v.string(),
    material: v.string(),
    timeline: v.string(),
    estMin:   v.number(),
    estMax:   v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('leads', args);
    await ctx.scheduler.runAfter(0, internal.email.sendLeadNotification, args);
  },
});
