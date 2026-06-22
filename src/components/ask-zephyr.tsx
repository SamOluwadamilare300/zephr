"use client";

import { useRef, useState, useTransition } from "react";
import { submitQuestion } from "@/lib/actions";
import { Reveal } from "./reveal";
import { Send, CheckCircle2 } from "lucide-react";

export function AskZephyr() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; error?: string } | null>(null);

  return (
    <section id="ask" className="bg-white py-20">
      <div className="mx-auto max-w-2xl px-5">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-secondary">Ask Zephyr</p>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-ink md:text-4xl">
            Got a question? Ask directly.
          </h2>
          <p className="mt-2 text-center text-sm text-ink/60">
            Questions are reviewed and answered publicly where possible.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form
            ref={formRef}
            action={(formData) => {
              startTransition(async () => {
                const res = await submitQuestion(formData);
                setStatus(res);
                if (res.ok) formRef.current?.reset();
              });
            }}
            className="mt-8 space-y-4 rounded-xl2 border border-primary/10 bg-bg p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-ink/70" htmlFor="name">Name (optional)</label>
                <input id="name" name="name" className="mt-1 w-full rounded-lg border border-primary/15 bg-white px-3 py-2 text-sm outline-none focus-visible:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-ink/70" htmlFor="department">Department</label>
                <input id="department" name="department" className="mt-1 w-full rounded-lg border border-primary/15 bg-white px-3 py-2 text-sm outline-none focus-visible:border-primary" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70" htmlFor="question">Your question</label>
              <textarea id="question" name="question" required rows={4} className="mt-1 w-full rounded-lg border border-primary/15 bg-white px-3 py-2 text-sm outline-none focus-visible:border-primary" />
            </div>

            {status?.error && <p className="text-sm text-red-600">{status.error}</p>}
            {status?.ok && (
              <p className="flex items-center gap-2 text-sm font-medium text-success">
                <CheckCircle2 className="h-4 w-4" /> Question submitted. Thank you.
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> {pending ? "Sending..." : "Send Question"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
