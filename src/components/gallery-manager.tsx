"use client";

import { useRef, useState, useTransition } from "react";
import { uploadGalleryItem, deleteGalleryItem } from "@/lib/gallery-actions";
import { Trash2, Upload } from "lucide-react";
import type { GalleryItem } from "@prisma/client";

const TYPES = ["photo", "poster", "certificate", "award", "letter", "video"] as const;

export function GalleryManager({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleUpload(formData: FormData) {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await uploadGalleryItem(formData);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setSuccess(true);
      formRef.current?.reset();
      // Re-fetch isn't wired to a server component refresh here, so just
      // reload to show the new item in the grid below.
      window.location.reload();
    });
  }

  function handleDelete(id: number) {
    if (!confirm("Delete this gallery item? This can't be undone.")) return;
    startTransition(async () => {
      const res = await deleteGalleryItem(id);
      if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
    });
  }

  return (
    <div className="space-y-8">
      <form
        ref={formRef}
        action={handleUpload}
        className="rounded-xl2 border border-primary/10 bg-white p-6"
      >
        <h2 className="flex items-center gap-2 font-bold text-ink">
          <Upload className="h-5 w-5 text-primary" /> Add Evidence
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-ink/70" htmlFor="title">Title</label>
            <input id="title" name="title" required className="mt-1 w-full rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none focus-visible:border-primary" placeholder="e.g. Inter-Faculty Games 2025" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/70" htmlFor="type">Category</label>
            <select id="type" name="type" className="mt-1 w-full rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none focus-visible:border-primary">
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-ink/70" htmlFor="description">Description (optional)</label>
          <input id="description" name="description" className="mt-1 w-full rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none focus-visible:border-primary" />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium text-ink/70" htmlFor="file">Upload a file</label>
          <input id="file" name="file" type="file" accept="image/*,video/mp4" className="mt-1 w-full rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none" />
          <p className="mt-1 text-xs text-ink/40">Saved into the project's /public/gallery folder.</p>
        </div>

        <div className="my-3 flex items-center gap-2 text-xs text-ink/40">
          <span className="h-px flex-1 bg-primary/10" /> OR <span className="h-px flex-1 bg-primary/10" />
        </div>

        <div>
          <label className="text-sm font-medium text-ink/70" htmlFor="externalUrl">
            Paste an image/video URL instead
          </label>
          <input id="externalUrl" name="externalUrl" type="url" placeholder="https://..." className="mt-1 w-full rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none focus-visible:border-primary" />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-3 text-sm text-success">Uploaded. Reloading…</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary disabled:opacity-60"
        >
          {pending ? "Uploading..." : "Add to Gallery"}
        </button>
      </form>

      <div>
        <h2 className="font-bold text-ink">Current Gallery ({items.length})</h2>
        {items.length === 0 ? (
          <p className="mt-2 text-sm text-ink/50">No items yet — add one above.</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl2 bg-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.thumbnailUrl ?? item.url} alt={item.title} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/85 to-transparent p-2">
                  <p className="truncate text-xs font-medium text-white">{item.title}</p>
                  <p className="text-[10px] text-white/60">{item.type}</p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute right-2 top-2 rounded-full bg-dark/70 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}