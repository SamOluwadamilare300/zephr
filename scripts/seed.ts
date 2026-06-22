import "dotenv/config";
import { prisma } from "../src/lib/db";
import { trustMetrics, trackRecord, testimonialsSeed, timeline } from "../src/lib/content";

async function main() {
  console.log("Seeding campaign content...");

  for (const m of trustMetrics) {
    await prisma.campaignMetric.upsert({
      where: { key: m.key },
      update: { value: m.value, label: m.label, suffix: m.suffix },
      create: m,
    });
  }

  for (const t of testimonialsSeed) {
    await prisma.testimonial.create({ data: t });
  }

  for (const card of trackRecord) {
    await prisma.achievement.create({
      data: {
        category: card.category,
        title: card.title,
        description: card.description,
        metricLabel: card.stats[0]?.label,
      },
    });
  }

  for (const [i, item] of timeline.entries()) {
    await prisma.achievement.create({
      data: {
        category: "student_service",
        title: item.title,
        description: item.description,
        isTimelineEvent: true,
        eventDate: new Date(`${item.date}-01-01`),
        sortOrder: i,
      },
    });
  }

  console.log("Done.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
