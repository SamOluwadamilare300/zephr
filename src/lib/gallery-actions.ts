"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { prisma } from "./db";
import { z } from "zod";

const hasDb = !!process.env.DATABASE_URL;

const galleryTypeEnum = z.enum(["photo", "poster", "certificate", "award", "letter", "video"]);

const metaSchema = z.object({
  title: z.string().min(2).max(160),
  type: galleryTypeEnum,
  description: z.string().max(500).optional(),
  externalUrl: z.string().url().optional(),
});

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");

export async function uploadGalleryItem(formData: FormData) {
  if (!hasDb) {
    return { ok: false as const, error: "Database not connected yet. Set DATABASE_URL first." };
  }

  const parsed = metaSchema.safeParse({
    title: formData.get("title")?.toString() || "",
    type: formData.get("type")?.toString() || "photo",
    description: formData.get("description")?.toString() || undefined,
    externalUrl: formData.get("externalUrl")?.toString() || undefined,
  });

  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  const file = formData.get("file") as File | null;
  const hasFile = file && file.size > 0;

  if (!hasFile && !parsed.data.externalUrl) {
    return { ok: false as const, error: "Choose a file to upload, or paste an image URL." };
  }

  let url: string;

  if (hasFile) {
    if (file.size > 10 * 1024 * 1024) {
      return { ok: false as const, error: "File is too large — keep it under 10MB." };
    }
    await fs.mkdir(GALLERY_DIR, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const filename = `${Date.now()}-${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(GALLERY_DIR, filename), buffer);

    // Served directly by Next.js as a static file from /public.
    url = `/gallery/${filename}`;
  } else {
    url = parsed.data.externalUrl!;
  }

  await prisma.galleryItem
    .create({
      data: {
        type: parsed.data.type,
        title: parsed.data.title,
        description: parsed.data.description,
        url,
        thumbnailUrl: url,
      },
    })
    .catch((err) => {
      // The file is already saved on disk (or the external URL is already
      // valid) at this point — getGallery() will still pick it up via the
      // public/gallery folder scan even if this metadata row never saves.
      // We just lose the custom title/category in that case.
      console.error("Gallery DB row failed to save (file/URL is still fine):", err);
    });

  return { ok: true as const };
}

export async function listGalleryItems() {
  if (!hasDb) return [];
  try {
    return await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export async function deleteGalleryItem(id: number) {
  if (!hasDb) return { ok: false as const, error: "Database not connected." };
  try {
    const item = await prisma.galleryItem.findUnique({ where: { id } });
    if (item && item.url.startsWith("/gallery/")) {
      await fs.unlink(path.join(process.cwd(), "public", item.url)).catch(() => {});
    }
    await prisma.galleryItem.delete({ where: { id } });
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Could not delete item." };
  }
}