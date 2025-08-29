
import { prisma } from '@/lib/db';

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Pedidos (últimos 100)</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Data</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Gateway</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-b">
              <td className="py-2">{new Date(o.createdAt).toLocaleString()}</td>
              <td>{o.customerName}</td>
              <td>{o.customerEmail}</td>
              <td>R$ {Number(o.total).toFixed(2)}</td>
              <td>{o.status}</td>
              <td>{o.provider}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
