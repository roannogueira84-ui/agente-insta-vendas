// app/dashboard/produtos/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

export default async function ProdutosPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  // Em vez de include: { _count: { ... } }, buscamos os paymentLinks e contamos no JSX
  const products = await prisma.product.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      price: true,
      isActive: true,
      paymentLinks: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Produtos</h1>
        <Link href="/dashboard/produtos/novo">
          {/* sem prop `size` pra evitar erro de types */}
          <Button variant="outline">Novo produto</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded border p-4 text-sm text-muted-foreground">
          Você ainda não tem produtos. Clique em “Novo produto” para criar.
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded border p-4"
            >
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-muted-foreground">
                  Ativo: {p.isActive ? "sim" : "não"} •
                  {" "}
                  Links de pagamento: {p.paymentLinks.length} •
                  {" "}
                  Preço: {typeof p.price === "number" ? `R$ ${p.price.toFixed(2)}` : p.price}
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/dashboard/produtos/${p.id}`}>
                  <Button variant="outline">Detalhes</Button>
                </Link>
                <Link href={`/dashboard/produtos/${p.id}/editar`}>
                  <Button variant="outline">Editar</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
