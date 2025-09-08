// src/lib/prisma.ts
import "server-only";
import { PrismaClient } from "@prisma/client";

// Evita múltiplas instâncias em dev (hot reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ["query"], // opcional para depuração
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ✅ Isso permite ambos:
// import { prisma } from "@/lib/prisma"
// import prisma from "@/lib/prisma"
export default prisma;
