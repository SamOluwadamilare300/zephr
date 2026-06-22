import { Reveal } from "./reveal";
import Link from "next/link";

export function JoinMovement() {
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK || "#";

  return (
    <section id="join" className="bg-dark py-24 text-white">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <h2 className="text-3xl font-extrabold md:text-5xl">
            Don&apos;t Just Vote.<br />Build The Future With Us.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-white/70">
            Join hundreds of students already verifying the record and organizing for LSUG 2026.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-7 py-3 font-semibold text-dark transition hover:brightness-95"
            >
              Join WhatsApp Community
            </a>
            <Link
              href="/ambassador"
              className="rounded-full border border-white/25 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Become Ambassador
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
