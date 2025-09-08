// app/dashboard/produtos/page.tsx
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic"; // evita cache em prod/preview

export default async function ProdutosPage() {
  // ⚠️ ESTE ARQUIVO NÃO DEVE TER "use client"
  // Busque somente campos serializáveis
  const products = await prisma.product.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      price: true, // Decimal | number
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        {/* Link simples (sem onClick) para manter server-only aqui */}
        <Link
          href="/dashboard/produtos/novo"
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Novo produto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum produto cadastrado ainda.</p>
      ) : (
        <ul className="divide-y rounded-md border">
          {products.map((p) => {
            const priceNum =
              typeof p.price === "number"
                ? p.price
                : Number(p.price as unknown as string);

            return (
              <li key={p.id} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.name ?? "Sem nome"}</div>
                  <div className="text-sm text-gray-500">
                    Preço: R$ {Number.isFinite(priceNum) ? priceNum.toFixed(2) : "-"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/produtos/${p.id}`}
                    className="text-sm underline"
                  >
                    Detalhes
                  </Link>
                  <Link
                    href={`/dashboard/produtos/${p.id}/editar`}
                    className="text-sm underline"
                  >
                    Editar
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
