"use client";

import { useState, useTransition } from "react";
import { generateQrCode } from "@/lib/qr-actions";
import { qrSources } from "@/lib/content";
import { Download, QrCode } from "lucide-react";

export function QrGenerator() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ source: string; url: string; pngDataUrl: string; svg: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function generate(source: string) {
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("source", source);
      const res = await generateQrCode(fd);
      if (!res.ok) {
        setError(res.error);
        setResult(null);
        return;
      }
      setResult(res);
    });
  }

  function downloadSvg() {
    if (!result) return;
    const blob = new Blob([result.svg], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `qr-${result.source}.svg`;
    link.click();
  }

  return (
    <div className="rounded-xl2 border border-primary/10 bg-white p-6">
      <h2 className="flex items-center gap-2 font-bold text-ink">
        <QrCode className="h-5 w-5 text-primary" /> Generate a Poster QR Code
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        Type a location name, or pick one of the common spots below. Each QR links to the
        site with <code className="font-mono">?source=...</code> attached, so scans from
        that poster show up in the dashboard.
      </p>

      <form
        action={(formData) => startTransition(() => generate(formData.get("source")?.toString() || ""))}
        className="mt-4 flex gap-2"
      >
        <input
          name="source"
          placeholder="e.g. hostel-c, sub-stadium-gate"
          className="flex-1 rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none focus-visible:border-primary"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-secondary disabled:opacity-60"
        >
          {pending ? "Generating..." : "Generate"}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {qrSources.map((s) => (
          <button
            key={s}
            onClick={() => generate(s)}
            className="rounded-full border border-primary/15 px-3 py-1 text-xs font-medium text-ink/70 hover:border-primary/40"
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {result && (
        <div className="mt-6 flex flex-col items-center gap-3 border-t border-primary/10 pt-6 sm:flex-row sm:items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.pngDataUrl} alt={`QR code for ${result.source}`} className="h-40 w-40 rounded-lg border border-primary/10" />
          <div className="flex-1 text-sm">
            <p className="font-semibold text-ink">{result.source}</p>
            <p className="mt-1 break-all font-mono text-xs text-ink/50">{result.url}</p>
            <div className="mt-3 flex gap-2">
              <a
                href={result.pngDataUrl}
                download={`qr-${result.source}.png`}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-secondary"
              >
                <Download className="h-3.5 w-3.5" /> PNG
              </a>
              <button
                onClick={downloadSvg}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 px-4 py-1.5 text-xs font-semibold text-primary"
              >
                <Download className="h-3.5 w-3.5" /> SVG (best for print)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
