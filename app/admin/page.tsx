// app/admin/pedidos/page.tsx
import { prisma } from "@/lib/prisma";

function currencyBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function PedidosPage() {
  // Busca pedidos + usuário + itens (nome, preço, quantidade)
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
        },
      },
      // 👇 TEM QUE SER "items" (minúsculo, plural), igual ao schema.prisma
      items: {
        select: {
          name: true,
          price: true,
          quantity: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Pedidos</h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Itens</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const total = order.items.reduce(
                (sum, it) => sum + Number(it.price) * it.quantity,
                0
              );

              return (
                <tr key={order.id} className="border-t">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.user?.fullName ?? "-"}</td>
                  <td className="p-3">{order.user?.email ?? "-"}</td>
                  <td className="p-3">
                    <ul className="list-disc list-inside space-y-1">
                      {order.items.map((it, i) => (
                        <li key={i}>
                          {it.name} — {it.quantity} × {currencyBRL(Number(it.price))}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 font-medium">{currencyBRL(total)}</td>
                  <td className="p-3">{order.status}</td>
                  <td className="p-3">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString("pt-BR")
                      : "-"}
                  </td>
                </tr>
              );
            })}

            {orders.length === 0 && (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={7}>
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
