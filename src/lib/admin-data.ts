import { prisma } from "./db";

const hasDb = !!process.env.DATABASE_URL;

export async function getAdminOverview() {
  if (!hasDb) {
    return {
      connected: false,
      totalScans: 0,
      uniqueScans: 0,
      whatsappJoins: 0,
      ambassadorSignups: 0,
      topSources: [] as { source: string; count: number }[],
      recentQuestions: [] as Awaited<ReturnType<typeof prisma.question.findMany>>,
      ambassadorCount: 0,
      referralCount: 0,
    };
  }

  try {
    const [totalScans, uniqueSources, whatsappJoins, ambassadorSignups, topSourcesRaw, recentQuestions, ambassadorCount, referralCount] =
      await Promise.all([
        prisma.qrScan.count(),
        prisma.qrScan.findMany({ distinct: ["visitorFingerprint"], select: { visitorFingerprint: true } }),
        prisma.qrScan.count({ where: { convertedToWhatsapp: true } }),
        prisma.qrScan.count({ where: { convertedToAmbassador: true } }),
        prisma.qrScan.groupBy({
          by: ["source"],
          _count: { source: true },
          orderBy: { _count: { source: "desc" } },
          take: 10,
        }),
        prisma.question.findMany({ orderBy: { createdAt: "desc" }, take: 15 }),
        prisma.ambassador.count(),
        prisma.referral.count(),
      ]);

    return {
      connected: true,
      totalScans,
      uniqueScans: uniqueSources.length,
      whatsappJoins,
      ambassadorSignups,
      topSources: topSourcesRaw.map((r) => ({ source: r.source, count: r._count.source })),
      recentQuestions,
      ambassadorCount,
      referralCount,
    };
  } catch {
    return {
      connected: false,
      totalScans: 0,
      uniqueScans: 0,
      whatsappJoins: 0,
      ambassadorSignups: 0,
      topSources: [],
      recentQuestions: [],
      ambassadorCount: 0,
      referralCount: 0,
    };
  }
}
