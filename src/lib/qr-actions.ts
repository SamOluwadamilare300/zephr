"use server";

import { generateQrPngDataUrl, generateQrSvgString } from "./qr";

export async function generateQrCode(formData: FormData) {
  const raw = formData.get("source")?.toString() || "";
  const source = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);

  if (!source) {
    return { ok: false as const, error: "Enter a location name (e.g. library, hostel-a)." };
  }

  const [{ url, dataUrl }, { svg }] = await Promise.all([
    generateQrPngDataUrl(source),
    generateQrSvgString(source),
  ]);

  return { ok: true as const, source, url, pngDataUrl: dataUrl, svg };
}
