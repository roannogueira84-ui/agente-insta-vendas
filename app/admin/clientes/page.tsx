import { prisma } from '@/lib/prisma';

export default async function ClientesPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      // Contagem de pedidos por usuário
      _count: { select: { orders: true } },

      // Último pedido (se existir) + itens para calcular o total
      orders: {
        select: {
          id: true,
          createdAt: true,
          orderItems: {
            select: { price: true, quantity: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Clientes</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Nome</th>
            <th style={th}>E-mail</th>
            <th style={th}>Qtde. Pedidos</th>
            <th style={th}>Último Total</th>
            <th style={th}>Última Compra</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const last = u.orders[0];

            // Calcula o total do último pedido somando (price * quantity)
            const lastTotal = last
              ? last.orderItems.reduce((sum, it) => {
                  const price = typeof it.price === 'number' ? it.price : Number(it.price);
                  return sum + price * it.quantity;
                }, 0).toFixed(2)
              : '-';

            const lastDate = last?.createdAt
              ? new Date(last.createdAt).toLocaleString('pt-BR')
              : '-';

            return (
              <tr key={u.id}>
                <td style={td}>{u.fullName ?? '-'}</td>
                <td style={td}>{u.email ?? '-'}</td>
                <td style={td}>{u._count.orders}</td>
                <td style={td}>
                  {last ? `R$ ${lastTotal}` : '-'}
                </td>
                <td style={td}>{lastDate}</td>
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
