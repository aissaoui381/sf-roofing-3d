import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  leads: defineTable({
    email:    v.string(),
    service:  v.string(),
    size:     v.string(),
    material: v.string(),
    timeline: v.string(),
    estMin:   v.number(),
    estMax:   v.number(),
  }),
});
