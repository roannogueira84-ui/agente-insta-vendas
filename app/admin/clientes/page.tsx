import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

type ClientRow = {
  id: string;
  email: string;
  nome: string;
  produtos: number;
  pedidos: number;
  receita_total: number;
  data_cadastro: string | undefined;
  ultimo_acesso: string | undefined;
};

async function getClients(): Promise<ClientRow[]> {
  // Busca clientes com contadores e pedidos (para somar total e pegar último pedido)
  const clients = await prisma.user.findMany({
    where: {
      // se você usa role, ajuste o valor conforme seu schema
      // role: "CLIENT",
    },
    include: {
      _count: {
        select: { products: true, orders: true },
      },
      orders: {
        select: { total: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return clients.map((c: any) => {
    const pedidos = Array.isArray(c.orders) ? c.orders : [];
    const receita = pedidos.reduce(
      (sum: number, o: any) => sum + Number(o?.total ?? 0),
      0
    );

    const ultimoMov =
      pedidos.length > 0
        ? new Date(pedidos[0].createdAt)
        : c.createdAt
        ? new Date(c.createdAt)
        : undefined;

    return {
      id: String(c.id),
      email: String(c.email ?? ""),
      nome: String(c.fullName ?? ""),
      produtos: Number(c?._count?.products ?? 0),
      pedidos: Number(c?._count?.orders ?? 0),
      receita_total: receita,
      data_cadastro: c?.createdAt
        ? new Date(c.createdAt).toLocaleDateString("pt-BR")
        : undefined,
      ultimo_acesso: ultimoMov
        ? ultimoMov.toLocaleDateString("pt-BR")
        : undefined,
    };
  });
}

export default async function ClientesPage() {
  const rows = await getClients();

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <div className="text-sm text-gray-500">Nenhum cliente cadastrado ainda.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 text-xs uppercase text-gray-500">
                    <th className="px-3 py-2">Cliente</th>
                    <th className="px-3 py-2">E-mail</th>
                    <th className="px-3 py-2">Produtos</th>
                    <th className="px-3 py-2">Pedidos</th>
                    <th className="px-3 py-2">Receita</th>
                    <th className="px-3 py-2">Cadastro</th>
                    <th className="px-3 py-2">Último acesso</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{r.nome || "—"}</span>
                          <Badge variant={r.pedidos > 0 ? "success" : "default"}>
                            {r.pedidos > 0 ? "Ativo" : "Novo"}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-3 py-2">{r.email || "—"}</td>
                      <td className="px-3 py-2">{r.produtos}</td>
                      <td className="px-3 py-2">{r.pedidos}</td>
                      <td className="px-3 py-2">
                        {r.receita_total.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td className="px-3 py-2">{r.data_cadastro || "—"}</td>
                      <td className="px-3 py-2">{r.ultimo_acesso || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
