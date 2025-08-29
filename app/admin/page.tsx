// app/admin/pedidos/page.tsx
import { prisma } from '@/lib/db';
import { Card, CardContent } from '@/components/ui/card';

export default async function PedidosPage() {
  // Busca pedidos mais recentes, com usuário e itens (inclui nome do produto)
  const pedidos = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { fullName: true, email: true } },
      items: {
        include: {
          product: { select: { name: true } },
        },
      },
    },
  });

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-0">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Data</th>
                <th className="p-2">Cliente</th>
                <th className="p-2">E-mail</th>
                <th className="p-2">Status</th>
                <th className="p-2">Total</th>
                <th className="p-2">Itens</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">
                    {new Date(p.createdAt as any).toLocaleString('pt-BR')}
                  </td>
                  <td className="p-2">{p.user?.fullName ?? '—'}</td>
                  <td className="p-2">{p.user?.email ?? '—'}</td>
                  <td className="p-2">{p.status ?? '—'}</td>
                  <td className="p-2">
                    R$ {Number(p.total ?? 0).toFixed(2)}
                  </td>
                  <td className="p-2">
                    {p.items.length > 0
                      ? p.items
                          .map(
                            (item) =>
                              `${item.quantity}× ${(item.product?.name ?? 'Produto')} - R$ ${Number(item.price ?? 0).toFixed(2)}`
                          )
                          .join(' | ')
                      : '—'}
                  </td>
                </tr>
              ))}

              {pedidos.length === 0 && (
                <tr>
                  <td className="p-2 text-gray-500" colSpan={7}>
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
