import { AnimatedCounter } from "./animated-counter";
import { Reveal } from "./reveal";
import { getMetrics } from "@/lib/data";

export async function TrustMetrics() {
  const metrics = await getMetrics();

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-secondary">
            Verified, not claimed
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold text-ink md:text-3xl">
            The record, in numbers
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-5">
          {metrics.map((m, i) => (
            <Reveal key={m.key} delay={i * 80} className="rounded-xl2 border border-primary/10 bg-bg p-5 text-center">
              <div className="text-2xl font-extrabold text-primary md:text-3xl">
                <AnimatedCounter value={m.value} suffix={m.suffix ?? ""} />
              </div>
              <p className="mt-1 text-xs font-medium text-ink/60 md:text-sm">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
