// app/admin/pedidos/page.tsx
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function PedidosAdminPage() {
  const pedidos = await prisma.order.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { fullName: true, email: true } },
    },
  }).catch(() => [] as any[]);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>Pedidos</CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">ID</th>
                  <th className="p-2">Data</th>
                  <th className="p-2">Cliente</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {(pedidos as any[]).map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">
                      {p?.createdAt
                        ? new Date(p.createdAt as any).toLocaleString("pt-BR")
                        : "-"}
                    </td>
                    <td className="p-2">{p?.user?.fullName ?? "-"}</td>
                    <td className="p-2">{p?.user?.email ?? "-"}</td>
                    <td className="p-2">{p?.status ?? "-"}</td>
                    <td className="p-2">R$ {Number(p?.total ?? 0).toFixed(2)}</td>
                  </tr>
                ))}
                {(pedidos as any[]).length === 0 && (
                  <tr>
                    <td className="p-2 text-gray-500" colSpan={6}>
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
