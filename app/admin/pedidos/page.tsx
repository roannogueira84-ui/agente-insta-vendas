import { prisma } from "@/lib/prisma";

export default async function PedidosPage() {
  const pedidos = await prisma.order.findMany({
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
        },
      },
      // Corrigido: relacionando com OrderItem via include
      OrderItem: {
        select: {
          name: true,
          price: true,
          quantity: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Pedidos</h1>
      <ul className="space-y-4">
        {pedidos.map((pedido) => (
          <li key={pedido.id} className="p-4 border rounded">
            <p>
              <strong>Cliente:</strong> {pedido.user?.fullName} (
              {pedido.user?.email})
            </p>
            <p>
              <strong>Data:</strong>{" "}
              {new Date(pedido.createdAt).toLocaleDateString("pt-BR")}
            </p>
            <p>
              <strong>Itens:</strong>
            </p>
            <ul className="ml-4 list-disc">
              {pedido.OrderItem.map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.quantity} x R${item.price}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
