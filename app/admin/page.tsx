// app/admin/pedidos/page.tsx
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default async function PedidosPage() {
  const pedidos = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { fullName: true, email: true } },
      items: {
        select: {
          quantity: true,
          price: true,
          product: { select: { name: true } },
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader>Pedidos</CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Data</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">E-mail</th>
              <th className="p-2">Itens</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => {
              const total =
                p.items?.reduce((sum, it) => sum + Number(it.price) * it.quantity, 0) ?? 0;

              return (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">
                    {new Date(p.createdAt as any).toLocaleString("pt-BR")}
                  </td>
                  <td className="p-2">{p.user?.fullName ?? "—"}</td>
                  <td className="p-2">{p.user?.email ?? "—"}</td>
                  <td className="p-2">
                    {p.items?.map((it) => `${it.product?.name} x${it.quantity}`).join(", ") ?? "—"}
                  </td>
                  <td className="p-2">R$ {total.toFixed(2)}</td>
                </tr>
              );
            })}

            {(!pedidos || pedidos.length === 0) && (
              <tr>
                <td className="p-2 text-gray-500" colSpan={6}>
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
