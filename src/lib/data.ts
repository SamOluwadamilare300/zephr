import { prisma } from "./db";
import { trustMetrics, trackRecord, testimonialsSeed } from "./content";

// These helpers try the live database first (once DATABASE_URL is set and
// `npx prisma db push` + seed has been run) and fall back to static seed
// content otherwise, so the site is always viewable.

const hasDb = !!process.env.DATABASE_URL;

export async function getMetrics() {
  if (hasDb) {
    try {
      const rows = await prisma.campaignMetric.findMany();
      if (rows.length) return rows;
    } catch {
      // fall through to static content
    }
  }
  return trustMetrics.map((m, i) => ({ id: i, ...m, updatedAt: new Date() }));
}

export async function getAchievements() {
  if (hasDb) {
    try {
      const rows = await prisma.achievement.findMany({ orderBy: { sortOrder: "asc" } });
      if (rows.length) return rows;
    } catch {}
  }
  return null; // signal to caller to use trackRecord from content.ts
}

export async function getTestimonials() {
  if (hasDb) {
    try {
      const rows = await prisma.testimonial.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
      });
      if (rows.length) return rows;
    } catch {}
  }
  return testimonialsSeed.map((t, i) => ({
    id: i,
    name: t.name,
    roleLabel: t.roleLabel,
    photoUrl: null,
    quote: t.quote,
    isPublished: true,
    sortOrder: i,
    createdAt: new Date(),
  }));
}

export async function getGallery() {
  if (hasDb) {
    try {
      return await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
    } catch {}
  }
  return [];
}

export { trackRecord };
