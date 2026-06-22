"use server";

import { prisma } from "./db";
import { slugifyUsername } from "./utils";
import { nanoid } from "nanoid";
import { z } from "zod";

const hasDb = !!process.env.DATABASE_URL;

// ── Ask Zephyr ─────────────────────────────────────────────────────────
const questionSchema = z.object({
  name: z.string().max(120).optional(),
  department: z.string().max(120).optional(),
  question: z.string().min(5, "Question is too short").max(1000),
});

export async function submitQuestion(formData: FormData) {
  const parsed = questionSchema.safeParse({
    name: formData.get("name")?.toString() || undefined,
    department: formData.get("department")?.toString() || undefined,
    question: formData.get("question")?.toString() || "",
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  if (!hasDb) {
    return { ok: false, error: "Database not connected yet. Set DATABASE_URL to enable submissions." };
  }

  await prisma.question.create({ data: parsed.data });
  return { ok: true };
}

// ── Ambassadors ────────────────────────────────────────────────────────
const ambassadorSchema = z.object({
  name: z.string().min(2).max(120),
  nickname: z.string().max(60).optional(),
  department: z.string().min(2).max(120),
});

export async function createAmbassador(formData: FormData) {
  const parsed = ambassadorSchema.safeParse({
    name: formData.get("name")?.toString() || "",
    nickname: formData.get("nickname")?.toString() || undefined,
    department: formData.get("department")?.toString() || "",
  });

  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  if (!hasDb) {
    // Allow the card-generation UI to still work in demo mode without a DB.
    const username = `${slugifyUsername(parsed.data.name)}-${nanoid(4)}`;
    return { ok: true as const, username, demo: true };
  }

  const base = slugifyUsername(parsed.data.name);
  let username = base;
  let attempt = 0;
  // ensure uniqueness
  while (attempt < 5) {
    const existing = await prisma.ambassador.findUnique({ where: { username } });
    if (!existing) break;
    attempt += 1;
    username = `${base}-${nanoid(4)}`;
  }

  await prisma.ambassador.create({ data: { ...parsed.data, username } });
  return { ok: true as const, username, demo: false };
}

// ── QR scan tracking ───────────────────────────────────────────────────
export async function recordQrScan(source: string, fingerprint: string) {
  if (!hasDb || !source) return;
  try {
    await prisma.qrScan.create({ data: { source, visitorFingerprint: fingerprint } });
  } catch {
    // best-effort analytics; never block the page on failure
  }
}

// ── Referral visit tracking (ambassador's /support/{username} link) ─────
export async function recordReferralVisit(username: string, fingerprint: string) {
  if (!hasDb || !username) return;
  try {
    const ambassador = await prisma.ambassador.findUnique({ where: { username } });
    if (!ambassador) return;
    await prisma.referral.create({
      data: { ambassadorId: ambassador.id, visitorFingerprint: fingerprint },
    });
  } catch {}
}

export async function getLeaderboard() {
  if (!hasDb) return [];
  try {
    const ambassadors = await prisma.ambassador.findMany({
      select: {
        id: true,
        name: true,
        nickname: true,
        username: true,
        _count: { select: { referrals: true } },
      },
      orderBy: { referrals: { _count: "desc" } },
      take: 20,
    });
    return ambassadors.map((a) => ({
      id: a.id,
      name: a.name,
      nickname: a.nickname,
      username: a.username,
      referralCount: a._count.referrals,
    }));
  } catch {
    return [];
  }
}
