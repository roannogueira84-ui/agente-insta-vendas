import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export default async function ClientesPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,         // usamos "name" (não existe fullName no schema)
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { orders: true } },
      orders: {
        select: {
          id: true,
          createdAt: true,
          items: {
            select: {
              price: true,
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
      <h1>Clientes</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={td}>Nome</th>
            <th style={td}>Email</th>
            <th style={td}>Pedidos</th>
            <th style={td}>Último pedido</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const lastOrder = u.orders[0];
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
