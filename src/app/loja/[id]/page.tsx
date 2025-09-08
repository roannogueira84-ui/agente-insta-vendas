// src/app/loja/[id]/page.tsx
import React from "react";
import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import Link from "next/link";

type PageProps = { params: { id: string } };

// Converte Decimal | string | number -> number
function toNumber(d: unknown): number {
  if (d instanceof Decimal) return d.toNumber();
  if (typeof d === "number") return d;
  if (typeof d === "string") {
    const n = Number(d.replace(",", "."));
    return Number.isFinite(n) ? n : NaN;
  }
  return NaN;
}

// Formata em BRL. Se detectar que está em centavos (valor grande e inteiro), divide por 100.
function formatCurrencyBRL(value: unknown): string {
  let n = toNumber(value);
  if (!Number.isFinite(n)) n = 0;

  // heurística simples p/ centavos: número inteiro e grande
  if (Number.isInteger(n) && Math.abs(n) >= 1000) {
    n = n / 100;
  }

  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ProductPublicPage({ params }: PageProps) {
  const id = params.id;

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,         // Decimal | number | string
      imageUrl: true,      // caso exista no schema
      userId: true,
    },
  });

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          Verifique o link ou volte para a{" "}
          <Link href="/" className="underline">página inicial</Link>.
        </p>
      </div>
    );
  }

  // Se você já gera link de pagamento em outro endpoint, pode buscar aqui.
  // Mantive como null para exibir só os dados do produto.
  const link: string | null = null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded border"
            />
          ) : (
            <div className="w-full aspect-video rounded border flex items-center justify-center text-muted-foreground">
              Sem imagem
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mt-2 text-muted-foreground">{product.description}</div>
          <div className="mt-4 text-2xl font-semibold">
            {formatCurrencyBRL(product.price)}
          </div>

          {link ? (
            <a
              href={link}
              target="_blank"
              className="mt-6 inline-block px-5 py-3 rounded bg-black text-white"
            >
              Comprar agora
            </a>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              Link de pagamento ainda não configurado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
