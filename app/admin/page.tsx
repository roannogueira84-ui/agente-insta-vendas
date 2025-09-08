import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export default async function AdminHomePage() {
  // Busca usuários com contagem e pedidos
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,            // <-- usamos "name" em vez de fullName
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { orders: true } },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 1, // só o último pedido
        select: {
          id: true,
          createdAt: true,
          items: {
            select: {
              price: true,      // Decimal
              quantity: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const td: React.CSSProperties = {
    padding: "8px",
    border: "1px solid #ddd",
  };

  return (
    <div>
      <h1>Admin</h1>
      <h2 style={{ margin: "16px 0" }}>Últimos clientes</h2>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={td}>Nome</th>
            <th style={td}>Email</th>
            <th style={td}>Pedidos</th>
            <th style={td}>Último pedido</th>
            <th style={td}>Valor do último</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const lastOrder = u.orders[0];

            const lastTotal =
              lastOrder?.items.reduce((sum, it) => {
                const price = it.price instanceof Decimal ? Number(it.price) : Number(it.price as unknown as number);
                return sum + price * it.quantity;
              }, 0) ?? null;

            return (
              <tr key={u.id}>
                <td style={td}>{u.name ?? "-"}</td>
                <td style={td}>{u.email ?? "-"}</td>
                <td style={td}>{u._count.orders}</td>
                <td style={td}>
                  {lastOrder
                    ? new Date(lastOrder.createdAt).toLocaleDateString("pt-BR")
                    : "-"}
                </td>
                <td style={td}>
                  {lastTotal !== null ? `R$ ${lastTotal.toFixed(2)}` : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
