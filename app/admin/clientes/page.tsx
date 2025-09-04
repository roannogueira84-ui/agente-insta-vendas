// app/admin/page.tsx
import { prisma } from '@/lib/prisma';

export default async function AdminHome() {
  // Ex.: lista de usuários com o último pedido (e itens) para calcular total
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { orders: true } },
      orders: {
        select: {
          id: true,
          createdAt: true,
          // NÃO existe "total" no Order; buscamos os itens e calculamos:
          items: { select: { price: true, quantity: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Dashboard</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Cliente</th>
            <th style={th}>E-mail</th>
            <th style={th}>Qtd. Pedidos</th>
            <th style={th}>Último Total</th>
            <th style={th}>Última Compra</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const last = u.orders[0];
            // Calcula total do último pedido (se houver)
            const lastTotal = last
              ? last.items.reduce((sum, it) => {
                  // se price for Prisma.Decimal, convertemos:
                  const price =
                    typeof it.price === 'number' ? it.price : Number(it.price);
                  return sum + price * it.quantity;
                }, 0)
              : null;

            return (
              <tr key={u.id}>
                <td style={td}>{u.fullName ?? '-'}</td>
                <td style={td}>{u.email ?? '-'}</td>
                <td style={td}>{u._count.orders}</td>
                <td style={td}>
                  {lastTotal !== null ? `R$ ${lastTotal.toFixed(2)}` : '-'}
                </td>
                <td style={td}>
                  {last?.createdAt
                    ? new Date(last.createdAt).toLocaleString('pt-BR')
                    : '-'}
                </td>
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
