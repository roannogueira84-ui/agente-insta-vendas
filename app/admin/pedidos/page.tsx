/* app/admin/pedidos/page.tsx */
import { Decimal } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";

function toNumber(d: unknown) {
  if (d instanceof Decimal) return d.toNumber();
  if (typeof d === "number") return d;
  if (typeof d === "string") return Number(d);
  return 0;
}

function formatPrice(v: unknown) {
  const n = toNumber(v);
  return `R$ ${n.toFixed(2)}`;
}

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } }, // ✅ existe no schema
      // ⚠️ Em OrderItem não usamos "name" (não existe). Só price e quantity.
      items: { select: { price: true, quantity: true } },
    },
    take: 100,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

      {orders.length === 0 ? (
        <p className="text-muted-foreground">Nenhum pedido encontrado.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-[720px] w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left px-4 py-3">Data</th>
                <th className="text-left px-4 py-3">Cliente</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Itens</th>
                <th className="text-left px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const total = o.items.reduce((acc, it) => {
                  return acc + toNumber(it.price) * (it.quantity ?? 0);
                }, 0);

                return (
                  <tr key={o.id} className="border-t">
                    <td className="px-4 py-3">
                      {new Date(o.createdAt).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">{o.user?.name ?? "-"}</td>
                    <td className="px-4 py-3">{o.user?.email ?? "-"}</td>
                    <td className="px-4 py-3">{o.items.length}</td>
                    <td className="px-4 py-3 font-medium">
                      {formatPrice(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
