
import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import RecentOrders from '@/components/admin/recent-orders';
import SalesChart from '@/components/admin/sales-chart';

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Buscar métricas do dashboard
  const [
    totalRevenue,
    totalUsers,
    totalOrders,
    activeProducts,
    recentOrders,
    salesData
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { status: 'PAID' },
      _sum: { total: true }
    }),
    prisma.user.count({
      where: { role: 'USER' }
    }),
    prisma.order.count(),
    prisma.product.count({
      where: { isActive: true }
    }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { fullName: true, email: true }
        },
        orderItems: {
          select: { name: true, price: true, quantity: true }
        }
      }
    }),
    // Dados para gráfico de vendas dos últimos 30 dias
    prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as orders,
        COALESCE(SUM(total), 0) as revenue
      FROM orders 
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
        AND status = 'PAID'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `
  ]);

  const metrics = [
    {
      title: 'Receita Total',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(Number(totalRevenue._sum.total || 0)),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total de Clientes',
      value: totalUsers.toString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total de Pedidos',
      value: totalOrders.toString(),
      icon: ShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Produtos Ativos',
      value: activeProducts.toString(),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics?.map((metric, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric?.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric?.value}</p>
                </div>
                <div className={`p-3 rounded-full ${metric?.bgColor}`}>
                  <metric.icon className={`h-6 w-6 ${metric?.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Vendas dos Últimos 30 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={salesData as any[]} />
          </CardContent>
        </Card>

        {/* Pedidos Recentes */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentOrders orders={recentOrders} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
