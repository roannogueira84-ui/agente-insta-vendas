type Product = { id: string; name: string; price?: number | null; stock?: number | null };

export default function RecentProducts({ items = [] as Product[] }) {
  if (!items.length) {
    return <div className="text-sm text-gray-500">Nenhum produto ainda.</div>;
  }
  return (
    <div className="rounded-md border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Produto</th>
            <th className="p-2 text-left">Preço</th>
            <th className="p-2 text-left">Estoque</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">R$ {(p.price ?? 0).toFixed(2)}</td>
              <td className="p-2">{p.stock ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
