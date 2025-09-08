// src/app/(public)/loja/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { Decimal } from "@prisma/client/runtime/library";

export const dynamic = "force-dynamic";

function toNumber(d: unknown) {
  return d instanceof Decimal ? d.toNumber() : (d as number);
}

type PageProps = { params: { id: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const link = await prisma.paymentLink.findUnique({
    where: { id: params.id },
    include: { product: true },
  });

  if (!link || !link.product) {
    return { title: "Produto não encontrado" };
  }

  return {
    title: link.product.name ?? "Produto",
    description: link.product.description ?? undefined,
    openGraph: {
      title: link.product.name ?? "Produto",
      description: link.product.description ?? undefined,
      images: link.product.imageUrl ? [link.product.imageUrl] : undefined,
    },
  };
}

export default async function LojaPage({ params }: PageProps) {
  const { id } = params;

  // Busca o PaymentLink pelo slug/id da URL e inclui o produto
  const link = await prisma.paymentLink.findUnique({
    where: { id },
    include: {
      product: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!link || !link.product) {
    // Se não achar, 404
    notFound();
  }

  const p = link.product;
  const priceNumber = toNumber(p.price); // lida com Decimal

  return (
    <main style={{ maxWidth: 840, margin: "0 auto", padding: "32px 16px" }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>
          {p.name ?? "Produto"}
        </h1>
        {link.user?.name && (
          <p style={{ color: "#666", marginTop: 8 }}>
            por {link.user.name}
          </p>
        )}
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
        }}
      >
        {p.imageUrl ? (
          // Next/Image precisa de width/height
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
            <Image
              src={p.imageUrl}
              alt={p.name ?? "Imagem do produto"}
              fill
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          </div>
        ) : null}

        {p.description && (
          <p style={{ color: "#444", lineHeight: 1.6 }}>{p.description}</p>
        )}

        <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
          R$ {Number.isFinite(priceNumber) ? priceNumber.toFixed(2) : "—"}
        </div>

        {/* Botão de compra – ajuste o href quando integrar o checkout */}
        <a
          href={`/api/public/checkout?paymentLinkId=${encodeURIComponent(id)}`}
          style={{
            display: "inline-block",
            padding: "12px 20px",
            borderRadius: 8,
            background: "black",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
            marginTop: 12,
            width: "fit-content",
          }}
        >
          Comprar agora
        </a>
      </section>
    </main>
  );
}
