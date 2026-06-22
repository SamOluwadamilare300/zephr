import { Trophy, Wallet, Users } from "lucide-react";
import { Reveal } from "./reveal";
import { trackRecord } from "@/lib/content";

const icons = { sports: Trophy, finance: Wallet, student_service: Users };

export function TrackRecord() {
  return (
    <section id="record" className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">My Track Record</p>
          <h2 className="mt-2 max-w-xl text-3xl font-extrabold text-ink md:text-4xl">
            Evidence first. Always.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {trackRecord.map((card, i) => {
            const Icon = icons[card.category];
            return (
              <Reveal key={card.title} delay={i * 120}>
                <div className="glass flex h-full flex-col rounded-xl2 p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{card.description}</p>
                  <dl className="mt-5 grid grid-cols-1 gap-2 border-t border-primary/10 pt-4">
                    {card.stats.map((s) => (
                      <div key={s.label} className="flex items-center justify-between text-sm">
                        <dt className="text-ink/60">{s.label}</dt>
                        <dd className="font-semibold text-primary">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
