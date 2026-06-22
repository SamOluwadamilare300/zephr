"use client";

import { useRef, useState, useTransition } from "react";
import { toPng } from "html-to-image";
import { createAmbassador } from "@/lib/actions";
import { Download, Share2 } from "lucide-react";

export function AmbassadorCardCreator() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ username: string; name: string; nickname?: string; department: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const referralLink = result ? `${siteUrl}/support/${result.username}` : "";

  async function handleSubmit(formData: FormData) {
    setError(null);
    const name = formData.get("name")?.toString() || "";
    const nickname = formData.get("nickname")?.toString() || undefined;
    const department = formData.get("department")?.toString() || "";

    const res = await createAmbassador(formData);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setResult({ username: res.username, name, nickname, department });
  }

  async function downloadCard() {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `zephyr-ambassador-${result?.username}.png`;
    link.href = dataUrl;
    link.click();
  }

  function shareTo(channel: "whatsapp" | "x" | "instagram") {
    const text = `I'm standing with Zephyr for LSUG 2026 General Secretary. Verify the record yourself: ${referralLink}`;
    if (channel === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    } else if (channel === "x") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
    } else {
      // Instagram has no direct web share intent; copy the link/caption instead.
      navigator.clipboard.writeText(text);
      alert("Caption copied! Paste it into your Instagram Story along with the downloaded card image.");
    }
  }

  if (result) {
    const displayName = result.nickname || result.name;
    return (
      <div className="flex flex-col items-center gap-6">
        <div
          ref={cardRef}
          className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl2 bg-dark p-8 text-white"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 15%, #1E8E5A 0%, transparent 45%), radial-gradient(circle at 85% 95%, #D4FF4F 0%, transparent 35%)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">LSUG 2026</p>
          <h3 className="mt-6 text-3xl font-extrabold leading-tight">
            I Stand With<br />Zephyr
          </h3>
          <div className="mt-auto absolute bottom-8 left-8 right-8">
            <p className="text-xl font-bold">{displayName}</p>
            <p className="text-sm text-white/70">{result.department}</p>
            <p className="mt-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-dark">
              Official Campaign Ambassador
            </p>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <button onClick={downloadCard} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary">
            <Download className="h-4 w-4" /> Download Card
          </button>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => shareTo("whatsapp")} className="rounded-full border border-primary/20 py-2 text-sm font-medium">WhatsApp</button>
            <button onClick={() => shareTo("x")} className="rounded-full border border-primary/20 py-2 text-sm font-medium">X</button>
            <button onClick={() => shareTo("instagram")} className="rounded-full border border-primary/20 py-2 text-sm font-medium">Instagram</button>
          </div>
          <div className="rounded-lg bg-bg p-3 text-center text-xs text-ink/60">
            Your referral link: <span className="font-mono text-primary">{referralLink}</span>
          </div>
          <button onClick={() => navigator.clipboard.writeText(referralLink)} className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 px-6 py-2 text-sm font-medium text-primary">
            <Share2 className="h-4 w-4" /> Copy Referral Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={(formData) => startTransition(() => handleSubmit(formData))}
      className="mx-auto w-full max-w-md space-y-4 rounded-xl2 border border-primary/10 bg-white p-6"
    >
      <div>
        <label className="text-sm font-medium text-ink/70" htmlFor="name">Full name</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none focus-visible:border-primary" />
      </div>
      <div>
        <label className="text-sm font-medium text-ink/70" htmlFor="nickname">Nickname (optional)</label>
        <input id="nickname" name="nickname" className="mt-1 w-full rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none focus-visible:border-primary" />
      </div>
      <div>
        <label className="text-sm font-medium text-ink/70" htmlFor="department">Department</label>
        <input id="department" name="department" required className="mt-1 w-full rounded-lg border border-primary/15 px-3 py-2 text-sm outline-none focus-visible:border-primary" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={pending} className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary disabled:opacity-60">
        {pending ? "Creating..." : "Generate My Ambassador Card"}
      </button>
    </form>
  );
}
