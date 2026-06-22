import QRCode from "qrcode";

const QR_OPTIONS = {
  errorCorrectionLevel: "H" as const, // highest correction — still scans if a poster gets creased/dirty
  margin: 2,
  color: { dark: "#101412", light: "#FFFFFF" },
};

export function buildSourceUrl(source: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://zephyr2026.vercel.app";
  return `${base.replace(/\/$/, "")}/?source=${encodeURIComponent(source)}`;
}

// PNG as a data URL — good for instant preview + click-to-download in the browser.
export async function generateQrPngDataUrl(source: string, sizePx = 1024) {
  const url = buildSourceUrl(source);
  const dataUrl = await QRCode.toDataURL(url, { ...QR_OPTIONS, width: sizePx });
  return { url, dataUrl };
}

// SVG string — scales to any poster size with zero quality loss, best for print.
export async function generateQrSvgString(source: string) {
  const url = buildSourceUrl(source);
  const svg = await QRCode.toString(url, { ...QR_OPTIONS, type: "svg" });
  return { url, svg };
}
