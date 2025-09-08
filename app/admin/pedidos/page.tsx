import prisma from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } }, // <-- trocado de fullName para name
      items: { select: { name: true, price: true, quantity: true } },
    },
    take: 100,
  });

  const td: React.CSSProperties = { padding: 8, border: "1px solid #ddd" };

  return (
    <div>
      <h1>Pedidos</h1>

      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 16 }}>
        <thead>
          <tr>
            <th style={td}>Data</th>
            <th style={td}>Cliente</th>
            <th style={td}>Email</th>
            <th style={td}>Itens</th>
            <th style={td}>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const total = o.items.reduce((sum, it) => {
              const price =
                it.price instanceof Decimal ? Number(it.price) : Number(it.price as unknown as number);
              return sum + price * it.quantity;
            }, 0);

            return (
              <tr key={o.id}>
                <td style={td}>
                  {new Date(o.createdAt).toLocaleString("pt-BR")}
                </td>
                <td style={td}>{o.user?.name ?? "-"}</td>
                <td style={td}>{o.user?.email ?? "-"}</td>
                <td style={td}>
                  {o.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                </td>
                <td style={td}>{`R$ ${total.toFixed(2)}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
