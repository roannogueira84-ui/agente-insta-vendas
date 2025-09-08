// src/lib/prisma.ts
import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ["query"], // opcional
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
