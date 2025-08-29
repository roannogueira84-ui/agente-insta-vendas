// app/admin/pedidos/page.tsx
import { prisma } from "@/lib/db"; // mantém seu import centralizado
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const dynamic = "force-dynamic";

export default async function PedidosPage() {
  // Se no seu schema o campo for "orderItems", troque "items" -> "orderItems" aqui ↓↓↓
  const pedidos = await prisma.order.findMany({
    include: {
      user: {
        select: { fullName: true, email: true },
      },
      items: { // <-- troque para "orderItems" se esse for o nome no seu schema
        select: { name: true, price: true, quantity: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 25,
  });

  return (
    <main className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pedidos</h1>
        <span className="text-sm text-gray-500">
          {pedidos.length} últimos pedidos
        </span>
      </header>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Data</th>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">E-mail</th>
              <th className="px-4 py-3 font-medium">Itens</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => {
              // Se trocou para "orderItems", ajuste aqui também ↓↓↓
              const itens = p.items ?? []; // p.orderItems
              const total =
                itens.reduce((s, it) => s + Number(it.price) * it.quantity, 0) || 0;

              return (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3">
                    {p.createdAt
                      ? format(new Date(p.createdAt), "dd/MM/yyyy HH:mm", {
                          locale: ptBR,
                        })
                      : "-"}
                  </td>
                  <td className="px-4 py-3">{p.user?.fullName ?? "-"}</td>
                  <td className="px-4 py-3">{p.user?.email ?? "-"}</td>
                  <td className="px-4 py-3">
                    {itens.length
                      ? itens
                          .map((it) => `${it.name} x${it.quantity}`)
                          .join(", ")
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {p.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
