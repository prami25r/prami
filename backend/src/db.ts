import { PrismaClient } from "@prisma/client";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

export function tryGetPrisma(): PrismaClient | null {
  if (typeof window !== "undefined") return null;
  if (global.prisma) return global.prisma;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
  if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
  }
  return prisma;
}

export function getPrisma(): PrismaClient {
  const client = tryGetPrisma();
  if (!client) {
    throw new Error("DATABASE_URL is not configured");
  }
  return client;
}
