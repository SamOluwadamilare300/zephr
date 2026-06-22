import { Reveal } from "./reveal";
import { visionPillars } from "@/lib/content";

export function Vision() {
  return (
    <section id="vision" className="bg-dark py-20 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Vision For The Secretariat</p>
          <h2 className="mt-2 max-w-xl text-3xl font-extrabold md:text-4xl">
            What changes if Zephyr leads the Secretariat
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {visionPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="flex h-full flex-col rounded-xl2 border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-bold text-accent">{p.title}</h3>
                <div className="mt-4 space-y-3 text-sm text-white/75">
                  <p><span className="font-semibold text-white">Problem: </span>{p.problem}</p>
                  <p><span className="font-semibold text-white">Solution: </span>{p.solution}</p>
                  <p><span className="font-semibold text-white">Outcome: </span>{p.outcome}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
