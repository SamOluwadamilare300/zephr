import fs from "node:fs/promises";
import path from "node:path";
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

type GalleryDisplayItem = {
  id: number | string;
  type: "photo" | "poster" | "certificate" | "award" | "letter" | "video";
  title: string;
  url: string;
  thumbnailUrl: string | null;
};

const VIDEO_EXT = new Set([".mp4", ".webm", ".mov"]);

function prettifyFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+-/, "") // strip the timestamp prefix added by the admin uploader
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Scans public/gallery directly so dropping a file in there is enough to make
// it appear — no admin step or database row required. Files that DO have a
// matching database row (added via /admin/gallery) use that row's title/type
// instead of the auto-generated guess.
export async function getGallery(): Promise<GalleryDisplayItem[]> {
  let dbItems: Awaited<ReturnType<typeof prisma.galleryItem.findMany>> = [];
  if (hasDb) {
    try {
      dbItems = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
    } catch {}
  }

  const dbByUrl = new Map(dbItems.map((item) => [item.url, item]));

  const galleryDir = path.join(process.cwd(), "public", "gallery");
  let filenames: string[] = [];
  try {
    filenames = (await fs.readdir(galleryDir)).filter((f) => !f.startsWith("."));
  } catch {
    // folder doesn't exist yet — fine, just no local files to show
  }

  const fromFolder: GalleryDisplayItem[] = filenames.map((filename) => {
    const url = `/gallery/${filename}`;
    const existing = dbByUrl.get(url);
    if (existing) {
      return {
        id: existing.id,
        type: existing.type,
        title: existing.title,
        url: existing.url,
        thumbnailUrl: existing.thumbnailUrl ?? existing.url,
      };
    }
    const ext = path.extname(filename).toLowerCase();
    return {
      id: url,
      type: VIDEO_EXT.has(ext) ? "video" : "photo",
      title: prettifyFilename(filename),
      url,
      thumbnailUrl: url,
    };
  });

  // Any database rows pointing at an external URL (not in public/gallery) still show up too.
  const externalDbItems: GalleryDisplayItem[] = dbItems
    .filter((item) => !item.url.startsWith("/gallery/"))
    .map((item) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      url: item.url,
      thumbnailUrl: item.thumbnailUrl ?? item.url,
    }));

  return [...fromFolder, ...externalDbItems];
}

export { trackRecord };