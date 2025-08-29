import prisma from "@/lib/prisma";

export default async function PedidosPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: { fullName: true, email: true },
      },
      items: {
        select: { name: true, price: true, quantity: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">Nenhum pedido encontrado.</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="mb-2">
              <p className="font-semibold">
                Cliente: {order.user?.fullName ?? "Sem nome"}
              </p>
              <p className="text-sm text-gray-500">{order.user?.email}</p>
            </div>

            <div>
              <h2 className="font-medium mb-1">Itens:</h2>
              <ul className="list-disc list-inside space-y-1">
                {order.items.map((it, idx) => (
                  <li key={idx}>
                    {it.name} — {it.quantity} × R${Number(it.price).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
