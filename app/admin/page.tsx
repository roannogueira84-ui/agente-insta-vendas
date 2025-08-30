// app/admin/clientes/page.tsx
import { prisma } from "@/lib/prisma";

function currencyBRL(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ClientesPage() {
  // Sem _count e sem "products"
  const users = await prisma.user.findMany({
    include: {
      orders: {
        select: { total: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const rows = users.map((u) => {
    const receita = u.orders.reduce((sum, o) => sum + Number(o.total ?? 0), 0);
    const ultimoPedido = u.orders[0]?.createdAt;

    return {
      id: u.id,
      nome: u.fullName ?? "-",
      email: u.email ?? "-",
      pedidos: u.orders.length,
      receita,
      criadoEm: u.createdAt
        ? new Date(u.createdAt).toLocaleDateString("pt-BR")
        : "-",
      ultimoPedido: ultimoPedido
        ? new Date(ultimoPedido).toLocaleDateString("pt-BR")
        : "-",
      ativo: u.isActive ? "Sim" : "Não",
    };
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Clientes</h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Nome</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Pedidos</th>
              <th className="text-left p-3">Receita</th>
              <th className="text-left p-3">Criado em</th>
              <th className="text-left p-3">Último pedido</th>
              <th className="text-left p-3">Ativo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.nome}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.pedidos}</td>
                <td className="p-3">{currencyBRL(r.receita)}</td>
                <td className="p-3">{r.criadoEm}</td>
                <td className="p-3">{r.ultimoPedido}</td>
                <td className="p-3">{r.ativo}</td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td className="p-6 text-center text-gray-500" colSpan={7}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
