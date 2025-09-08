/* -----------------------------------------------------------
 * Página de Landing da Loja por PaymentLink
 * Caminho: src/app/(public)/loja/[id]/page.tsx
 * Requisitos:
 *  - DATABASE_URL válido na Vercel
 *  - Prisma Client acessível em "@/lib/prisma" com export nomeado { prisma }
 *  - Tabela PaymentLink com productId apontando para um Product existente
 * ----------------------------------------------------------- */

import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

/** Força runtime Node na Vercel (evita alguns problemas em edge) */
export const runtime = "nodejs";
/** Mantém página dinâmica (não estática) */
export const dynamic = "force-dynamic";

/** Tipos dos params */
type PageProps = { params: { id: string } };

/** Helpers simples */
function moneyBR(v: unknown) {
  if (typeof v === "number") return `R$ ${v.toFixed(2)}`;
  try {
    // Prisma Decimal vira objeto com toNumber()
    // @ts-ignore
    if (v && typeof v.toNumber === "function") return `R$ ${v.toNumber().toFixed(2)}`;
  } catch {}
  return v ? String(v) : "-";
}

/** SEO dinâmico da página */
export async function generateMetadata({ params }: PageProps) {
  const link = await prisma.paymentLink.findUnique({
    where: { id: params.id },
    include: { product: true, user: { select: { name: true } } },
  });

  const title =
    link?.product?.name ??
    (link ? `Produto de ${link.user?.name ?? "vendedor"}` : "Produto não encontrado");

  const description =
    link?.product?.description ??
    "Página de pagamento do seu produto.";

  const images = link?.product?.imageUrl ? [link.product.imageUrl] : undefined;

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

/** Componente da página */
export default async function LojaPage({ params }: PageProps) {
  const { id } = params;

  // Debug útil nos logs da Vercel
  console.log("[/loja/[id]] id recebido:", id, "DATABASE_URL?", !!process.env.DATABASE_URL);

  // Busca o PaymentLink + Product relacionado
  const link = await prisma.paymentLink.findUnique({
    where: { id },
    include: {
      product: true,
      user: { select: { id: true, name: true, email: true } },
    },
  });

  // Não achou o link
  if (!link) {
    return (
      <main style={s.main}>
        <div style={s.card}>
          <h1 style={s.title}>Link não encontrado</h1>
          <p style={s.muted}>
            O ID <code>{id}</code> não existe na tabela <b>PaymentLink</b>.
          </p>
          <p style={s.mutedSmall}>
            Verifique se você criou o registro na <b>mesma base</b> que a Vercel usa
            (Settings → Environment Variables → <code>DATABASE_URL</code>).
          </p>
          <Link href="/" style={s.btnSec}>Voltar</Link>
        </div>
      </main>
    );
  }

  // Link sem produto relacionado
  if (!link.product) {
    return (
      <main style={s.main}>
        <div style={s.card}>
          <h1 style={s.title}>Produto não associado</h1>
          <p style={s.muted}>
            O PaymentLink existe, mas o <code>productId</code> não aponta para um produto válido.
          </p>
          <p style={s.mutedSmall}>
            Edite esse link no banco e conecte um <b>Product</b> válido.
          </p>
          <Link href="/" style={s.btnSec}>Voltar</Link>
        </div>
      </main>
    );
  }

  const p = link.product;

  return (
    <main style={s.main}>
      <div style={s.card}>
        {/* Imagem do produto */}
        {p.imageUrl ? (
          <div style={{ marginBottom: 16 }}>
            <Image
              src={p.imageUrl}
              alt={p.name ?? "Produto"}
              width={1200}
              height={630}
              style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }}
              priority
            />
          </div>
        ) : null}

        {/* Título e vendedor */}
        <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap" }}>
          <h1 style={s.title}>{p.name ?? "Produto"}</h1>
          {link.user?.name ? <span style={s.mutedSmall}>por {link.user.name}</span> : null}
        </div>

        {/* Descrição */}
        {p.description ? <p style={s.desc}>{p.description}</p> : null}

        {/* Preço */}
        <div style={s.price}>{moneyBR(p.price)}</div>

        {/* Ação (placeholder) */}
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={s.btnPrim}
            aria-disabled
          >
            Comprar (em breve)
          </a>
          <Link href="/" style={s.btnSec}>Ver outros</Link>
        </div>

        {/* Rodapé de debug (pode remover depois) */}
        <div style={{ marginTop: 24 }}>
          <details>
            <summary style={s.mutedSmall}>Debug</summary>
            <pre style={s.pre}>
{JSON.stringify(
  {
    pageId: id,
    paymentLink: { id: link.id, productId: link.productId, userId: link.userId },
    product: {
      id: p.id,
      name: p.name,
      price: String(p.price),
      imageUrl: p.imageUrl,
    },
    databaseURLDefined: !!process.env.DATABASE_URL,
  },
  null,
  2
)}
            </pre>
          </details>
        </div>
      </div>
    </main>
  );
}

/* ------------------- estilos inline simples ------------------- */
const s: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "#0b0b0c",
  },
  card: {
    width: "min(960px, 100%)",
    background: "white",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
  },
  title: { fontSize: 28, fontWeight: 800, lineHeight: 1.15 },
  desc: { marginTop: 8, color: "#4b5563", fontSize: 16 },
  price: { marginTop: 12, fontSize: 24, fontWeight: 700 },
  btnPrim: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 10,
    background: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
  },
  btnSec: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 10,
    background: "#f3f4f6",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 600,
  },
  muted: { color: "#4b5563", marginTop: 6 },
  mutedSmall: { color: "#6b7280", fontSize: 14 },
  pre: {
    marginTop: 8,
    padding: 12,
    background: "#f8fafc",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    fontSize: 12,
    overflowX: "auto",
  },
};
