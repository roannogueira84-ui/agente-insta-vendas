// src/app/api/public/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true, // mantenha apenas os campos que EXISTEM no model Product
      // se no seu schema existir `image` (e não `imageUrl`), pode habilitar:
      // image: true,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(products);
}
