"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-5">
      <form
        action={(formData) =>
          startTransition(async () => {
            const res = await login(formData);
            if (!res.ok) setError(res.error ?? "Login failed");
            else router.push("/admin");
          })
        }
        className="w-full max-w-sm rounded-xl2 border border-white/10 bg-white/5 p-6 text-white"
      >
        <h1 className="text-xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-white/60">Zephyr Campaign Dashboard</p>
        <input
          type="password"
          name="password"
          placeholder="Admin password"
          required
          className="mt-5 w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-accent"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-dark"
        >
          {pending ? "Checking..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
