import { PrismaClient } from "@prisma/client";

// Avoid exhausting Postgres connections from hot-reloaded Prisma Clients
// in dev. Standard Next.js + Prisma singleton pattern.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
