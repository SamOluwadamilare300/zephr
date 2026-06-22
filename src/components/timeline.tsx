import { Reveal } from "./reveal";
import { timeline } from "@/lib/content";

export function Timeline() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Achievement Timeline</p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">How the record was built</h2>
        </Reveal>

        <ol className="mt-12 border-l-2 border-primary/15 pl-8">
          {timeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 100} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-2 border-bg bg-primary" />
              <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{item.date}</p>
              <h3 className="mt-1 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{item.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
