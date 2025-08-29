// app/admin/pedidos/page.tsx
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const dynamic = "force-dynamic";

function brl(n: number | null | undefined) {
  return (n ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

async function getOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { fullName: true, email: true },
      },
      // <- a relação correta no teu schema é "items", não "orderItems"
      items: {
        select: {
          quantity: true,
          price: true, // preço salvo no OrderItem (Decimal)
          product: {
            select: { name: true, price: true }, // nome/preço do produto
          },
        },
      },
    },
  });
}

export default async function Page() {
  const pedidos = await getOrders();

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Pedidos</h2>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">Data</th>
                  <th className="p-2">Cliente</th>
                  <th className="p-2">E-mail</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Itens</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>

              <tbody>
                {pedidos.map((p) => {
                  // total: se existir campo total no Order, usa; senão soma itens
                  const totalByItems =
                    p.items?.reduce((acc, it) => acc + Number(it.price ?? it.product?.price ?? 0) * (it.quantity ?? 0), 0) ?? 0;
                  const total = Number((p as any).total ?? totalByItems);

                  return (
                    <tr key={p.id} className="border-t">
                      <td className="p-2">{p.id}</td>
                      <td className="p-2">
                        {p.createdAt ? new Date(p.createdAt as any).toLocaleString("pt-BR") : "--"}
                      </td>
                      <td className="p-2">{p.user?.fullName ?? "--"}</td>
                      <td className="p-2">{p.user?.email ?? "--"}</td>
                      <td className="p-2">{(p as any).status ?? "--"}</td>
                      <td className="p-2">
                        {p.items?.length
                          ? p.items
                              .map((it) => {
                                const nome = it.product?.name ?? "Item";
                                const qtd = it.quantity ?? 0;
                                return `${nome} (x${qtd})`;
                              })
                              .join(", ")
                          : "--"}
                      </td>
                      <td className="p-2">{brl(total)}</td>
                    </tr>
                  );
                })}

                {(!pedidos || pedidos.length === 0) && (
                  <tr>
                    <td className="p-2 text-gray-500" colSpan={7}>
                      Nenhum pedido encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
