import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AmbassadorCardCreator } from "@/components/ambassador-card-creator";
import { Leaderboard } from "@/components/leaderboard";

export const metadata = { title: "Become an Ambassador | Zephyr LSUG 2026" };

export default function AmbassadorPage() {
  return (
    <>
      <Nav />
      <section className="bg-bg py-16">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Campaign Ambassador</p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">
            Put your name behind the record
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            Generate your personalized card, get a referral link, and climb the Ambassador leaderboard
            every time someone joins through you.
          </p>
        </div>

        <div className="mt-10">
          <AmbassadorCardCreator />
        </div>

        <Leaderboard />
      </section>
      <Footer />
    </>
  );
}
