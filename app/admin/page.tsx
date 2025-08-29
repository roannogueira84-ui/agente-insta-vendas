// app/admin/pedidos/page.tsx
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminPedidosPage() {
  // Busca pedidos com o usuário; sem incluir "orderItems" (que não existe nesse schema)
  const orders = await prisma.order
    .findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        user: {
          select: { fullName: true, email: true },
        },
      },
    })
    .catch(() => [] as any[]);

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
                  <th className="p-2">E-mail</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o: any) => (
                  <tr key={o.id} className="border-t">
                    <td className="p-2">{o.id}</td>
                    <td className="p-2">
                      {o?.createdAt
                        ? new Date(o.createdAt).toLocaleString("pt-BR")
                        : "-"}
                    </td>
                    <td className="p-2">{o?.user?.fullName ?? "-"}</td>
                    <td className="p-2">{o?.user?.email ?? "-"}</td>
                    <td className="p-2">R$ {Number(o?.total ?? 0).toFixed(2)}</td>
                    <td className="p-2">{o?.status ?? "-"}</td>
                  </tr>
                ))}
                {orders.length === 0 && (
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
