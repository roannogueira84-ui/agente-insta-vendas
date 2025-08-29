// app/admin/page.tsx
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  // Busca contadores e últimos pedidos sem depender de campos opcionais
  const [totalOrders, totalProducts, recentOrders] = await Promise.all([
    prisma.order.count().catch(() => 0),
    prisma.product.count().catch(() => 0), // sem filtro isActive
    prisma.order
      .findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        // Seleciona apenas campos comuns; se algum não existir, o "as any" abaixo protege
        select: {
          id: true,
          createdAt: true,
          total: true,
          status: true,
        },
      })
      .catch(() => [] as any[]),
  ]);

  const receitaUltimos10 = Number(
    (recentOrders as any[]).reduce(
      (s, o) => s + Number(o?.total ?? 0),
      0
    )
  );

  return (
    <div className="p-6 space-y-6">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>Pedidos</CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{totalOrders}</div>
            <p className="text-sm text-gray-500">Total de pedidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Produtos</CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{totalProducts}</div>
            <p className="text-sm text-gray-500">Produtos cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Receita (últimos 10)</CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              R$ {receitaUltimos10.toFixed(2)}
            </div>
            <p className="text-sm text-gray-500">Soma dos 10 pedidos mais recentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de pedidos recentes */}
      <Card>
        <CardHeader>Pedidos recentes</CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">ID</th>
                  <th className="p-2">Data</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {(recentOrders as any[]).map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="p-2">{o.id}</td>
                    <td className="p-2">
                      {o?.createdAt
                        ? new Date(o.createdAt as any).toLocaleString("pt-BR")
                        : "-"}
                    </td>
                    <td className="p-2">R$ {Number(o?.total ?? 0).toFixed(2)}</td>
                    <td className="p-2">{o?.status ?? "-"}</td>
                  </tr>
                ))}
                {(recentOrders as any[]).length === 0 && (
                  <tr>
                    <td className="p-2 text-gray-500" colSpan={4}>
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
