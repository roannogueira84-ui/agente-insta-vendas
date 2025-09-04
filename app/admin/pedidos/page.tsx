// app/admin/pedidos/page.tsx
import { prisma } from '@/lib/prisma';

export default async function PedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { fullName: true, email: true } },
      items: { select: { name: true, price: true, quantity: true } }, // <- aqui é "items"
    },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Pedidos</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Pedido</th>
            <th style={th}>Cliente</th>
            <th style={th}>E-mail</th>
            <th style={th}>Itens</th>
            <th style={th}>Total</th>
            <th style={th}>Status</th>
            <th style={th}>Criado em</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const total = o.items.reduce((sum, it) => {
              const price = typeof it.price === 'number' ? it.price : Number(it.price);
              return sum + price * it.quantity;
            }, 0);

            return (
              <tr key={o.id}>
                <td style={td}>{o.id.slice(0, 8)}</td>
                <td style={td}>{o.user?.fullName ?? '-'}</td>
                <td style={td}>{o.user?.email ?? '-'}</td>
                <td style={td}>
                  {o.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}
                </td>
                <td style={td}>{`R$ ${total.toFixed(2)}`}</td>
                <td style={td}>{o.status}</td>
                <td style={td}>{new Date(o.createdAt).toLocaleString('pt-BR')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

const th: React.CSSProperties = {
  textAlign: 'left',
  borderBottom: '1px solid #e5e7eb',
  padding: '8px 12px',
  fontWeight: 600,
};

const td: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  padding: '8px 12px',
};
