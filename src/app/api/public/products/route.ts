import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    select: { id: true, name: true, price: true, imageUrl: true, description: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(products);
}
