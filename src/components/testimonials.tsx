import { Quote } from "lucide-react";
import { Reveal } from "./reveal";
import { getTestimonials } from "@/lib/data";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section id="testimonials" className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">In Their Words</p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">
            Students, athletes, and lecturers who&apos;ve worked with him
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 100}>
              <div className="flex h-full flex-col rounded-xl2 bg-white p-6 shadow-sm">
                <Quote className="h-6 w-6 text-accent" />
                <p className="mt-4 flex-1 text-sm text-ink/80">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-primary/10 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink/60">{t.roleLabel}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
