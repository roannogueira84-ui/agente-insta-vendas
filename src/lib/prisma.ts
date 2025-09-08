// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Impede recriar muitas instâncias em dev (Next.js hot reload)
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["error", "warn"], // pode trocar para ["query", "info", "warn", "error"] se quiser debugar mais
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
