import { mutation } from './_generated/server';
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
  },
});
