// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // Se não estiver logado, não renderiza nada (ou você pode redirecionar)
  if (!userId) return null;

  // Sem usar isActive, porque não existe no schema de Product
  const [totalProducts, recentProducts] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, price: true, createdAt: true },
    }),
  ]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>Total cadastrados</CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {totalProducts}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recentes</CardTitle>
          <CardDescription>Últimos 5 produtos</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentProducts.map((p) => (
              <li key={p.id} className="flex justify-between">
                <span>{p.name}</span>
                <span>R$ {Number(p.price ?? 0).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
