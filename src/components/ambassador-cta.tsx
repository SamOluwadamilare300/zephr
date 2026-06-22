import { Reveal } from "./reveal";
import Link from "next/link";
import { Megaphone } from "lucide-react";

export function AmbassadorCta() {
  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Megaphone className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold text-ink md:text-4xl">Become a Campaign Ambassador</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            Get your own personalized &ldquo;I Stand With Zephyr&rdquo; card, a referral link, and a spot
            on the Ambassador leaderboard.
          </p>
          <Link
            href="/ambassador"
            className="mt-7 inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-white transition hover:bg-secondary"
          >
            Create My Ambassador Card
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
