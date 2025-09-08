// src/app/(public)/loja/[id]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

type PageProps = { params: { id: string } };

// Converte Prisma Decimal | number | string -> number
function toNumber(v: unknown): number | null {
  // @ts-ignore
  if (v && typeof v === "object" && typeof (v as any).toNumber === "function") {
    try {
      return (v as any).toNumber();
    } catch {
      return null;
    }
  }
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

async function getLinkByAny(id: string) {
  // 1) tenta PaymentLink.id
  let link = await prisma.paymentLink.findUnique({
    where: { id },
    include: { product: true, user: true },
  });
  if (link) return { link, from: "paymentLink.id" };

  // 2) fallback: tenta pelo productId (se colou o ID do produto por engano)
  link = await prisma.paymentLink.findFirst({
    where: { productId: id },
    include: { product: true, user: true },
  });
  if (link) return { link, from: "paymentLink.productId" };

  return { link: null as const, from: null as const };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { link } = await getLinkByAny(params.id);

  if (!link || !link.product) {
    return { title: "Produto não encontrado" };
  }

  const title = link.product.name ?? "Produto";
  const description = link.product.description ?? undefined;
  const image = link.product.imageUrl ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function LojaPage({ params }: PageProps) {
  const { id } = params;

  const { link, from } = await getLinkByAny(id);

  console.log("[/loja/[id]]", { id, found: !!link, from });

  if (!link || !link.product) {
    notFound();
  }

  const p = link.product;
  const priceNumber = toNumber(p.price);
  const priceLabel =
    priceNumber !== null ? `R$ ${priceNumber.toFixed(2)}` : String(p.price ?? "");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{p.name ?? "Produto"}</h1>
        {p.description ? (
          <p className="mt-2 text-muted-foreground">{p.description}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-start">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
          <Image
            src={p.imageUrl ?? "https://via.placeholder.com/800x800?text=Produto"}
            alt={p.name ?? "Produto"}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-sm text-muted-foreground">Preço</span>
            <div className="text-2xl font-semibold">{priceLabel}</div>
          </div>

          <a
            href={`#comprar-${link.id}`}
            className="inline-block rounded bg-black px-5 py-3 text-white hover:opacity-90"
          >
            Comprar agora
          </a>

          {/* Debug opcional — pode remover depois */}
          <pre className="mt-6 overflow-auto rounded bg-neutral-100 p-3 text-xs">
            {JSON.stringify(
              {
                usedParam: id,
                matchedBy: from,
                paymentLinkId: link.id,
                productId: link.productId,
                userId: link.userId,
                product: {
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  imageUrl: p.imageUrl,
                },
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </main>
  );
}
