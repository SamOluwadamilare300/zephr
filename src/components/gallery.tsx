"use client";

import { useState } from "react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type GalleryDisplayItem = {
  id: number | string;
  type: "photo" | "poster" | "certificate" | "award" | "letter" | "video";
  title: string;
  url: string;
  thumbnailUrl: string | null;
};

const filters = [
  { key: "all", label: "All" },
  { key: "photo", label: "Photos" },
  { key: "poster", label: "Posters" },
  { key: "certificate", label: "Certificates" },
  { key: "award", label: "Awards" },
  { key: "letter", label: "Letters" },
  { key: "video", label: "Videos" },
] as const;

export function Gallery({ items }: { items: GalleryDisplayItem[] }) {
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? items : items.filter((i) => i.type === active);

  return (
    <section id="gallery" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Evidence Gallery</p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">See it for yourself</h2>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                active === f.key
                  ? "border-primary bg-primary text-white"
                  : "border-primary/15 text-ink/70 hover:border-primary/40"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 rounded-xl2 border border-dashed border-primary/20 p-10 text-center text-sm text-ink/50">
            No evidence uploaded for this category yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {visible.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl2 bg-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnailUrl ?? item.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 to-transparent p-3">
                  <p className="text-xs font-medium text-white">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}