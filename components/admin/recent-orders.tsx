type Order = {
  id: string;
  customerName?: string | null;
  total?: number | null;
  status?: string | null;
  createdAt?: string | Date | null;
};

export default function RecentOrders({ orders = [] as Order[] }) {
  if (!orders.length) {
    return <div className="text-sm text-gray-500">Sem pedidos ainda.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Cliente</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id.slice(0, 8)}</td>
              <td className="p-2">{o.customerName ?? "-"}</td>
              <td className="p-2">R$ {(o.total ?? 0).toFixed(2)}</td>
              <td className="p-2">{o.status ?? "—"}</td>
              <td className="p-2">
                {o.createdAt ? new Date(o.createdAt).toLocaleString("pt-BR") : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
