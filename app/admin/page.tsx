// app/admin/pedidos/page.tsx
import { prisma } from '@/lib/db';

function formatBRL(value: number) {
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `R$ ${value.toFixed(2)}`;
  }
}

export const revalidate = 0; // evita cache para listar sempre os últimos pedidos

export default async function PedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { fullName: true, email: true } },
      items: { select: { name: true, price: true, quantity: true } }, // <-- relation correto
    },
    take: 50,
  });

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Pedidos</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Itens</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              const total = order.items.reduce((sum, it) => {
                // Prisma Decimal -> garantir number
                const price =
                  typeof it.price === 'number'
                    ? it.price
                    : // @ts-ignore (Decimal tem toNumber em runtime)
                      (it.price?.toNumber?.() as number) ?? Number(it.price as any) ?? 0;

                return sum + price * it.quantity;
              }, 0);

              return (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{order.user?.fullName ?? '—'}</div>
                    <div className="text-gray-500">{order.user?.email ?? '—'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <ul className="space-y-1">
                      {order.items.map((it, i) => (
                        <li key={i} className="text-gray-700">
                          {it.quantity}× {it.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatBRL(total)}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleString('pt-BR')}
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
