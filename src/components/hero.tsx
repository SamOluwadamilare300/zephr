import Image from "next/image";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dark text-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #1E8E5A 0%, transparent 45%), radial-gradient(circle at 80% 0%, #D4FF4F 0%, transparent 35%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <Reveal className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            LSUG 2026 · General Secretary
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Before You Vote,{" "}
            <span className="verify-underline text-dark bg-accent rounded px-1">Verify.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-white/70">
            Leadership is not about promises. It&apos;s about a proven record of service,
            accountability, and results.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#record"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-dark transition hover:brightness-95"
            >
              View My Record
            </a>
            <a
              href="#join"
              className="rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Join the Movement
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            <span>Sports Director</span>
            <span className="hidden sm:inline">·</span>
            <span>Student Leader</span>
            <span className="hidden sm:inline">·</span>
            <span>Advocate for Transparency</span>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative flex items-center justify-center">
          <div className="glass relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl2 border-white/10">
            <Image
              src="/portrait.jpg"
              alt="Zephyr, candidate for General Secretary"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
