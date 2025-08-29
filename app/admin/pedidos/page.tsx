
import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, ShoppingBag } from 'lucide-react';
import ExportButton from '@/components/admin/export-button';

export const dynamic = "force-dynamic";

export default async function PedidosPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: { fullName: true, email: true }
      },
      orderItems: {
        select: { name: true, price: true, quantity: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Preparar dados para exportação
  const exportData = orders?.map(order => ({
    id: order?.id,
    cliente_email: order?.customerEmail,
    cliente_nome: order?.customerName || order?.user?.fullName || 'N/A',
    valor_total: Number(order?.total || 0),
    status: order?.status,
    provedor: order?.provider || 'N/A',
    data_criacao: order?.createdAt?.toLocaleDateString('pt-BR'),
    items: order?.orderItems?.map(item => `${item?.name} (${item?.quantity}x)`).join('; ') || ''
  }));

  const statusMap = {
    PENDING: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
    PAID: { label: 'Pago', color: 'bg-green-100 text-green-800' },
    CANCELLED: { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
    REFUNDED: { label: 'Reembolsado', color: 'bg-gray-100 text-gray-800' }
  };

  const totalRevenue = orders
    ?.filter(order => order?.status === 'PAID')
    ?.reduce((sum, order) => sum + Number(order?.total || 0), 0) || 0;

  const paidOrders = orders?.filter(order => order?.status === 'PAID')?.length || 0;
  const pendingOrders = orders?.filter(order => order?.status === 'PENDING')?.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
            <p className="text-gray-600">Acompanhe todos os pedidos da plataforma</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ExportButton 
            data={exportData} 
            filename="pedidos" 
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </ExportButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{orders?.length || 0}</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pedidos Pagos</p>
                <p className="text-2xl font-bold text-gray-900">{paidOrders}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pedidos Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0
                  }).format(totalRevenue)}
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Valor</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Provedor</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Data</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order?.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-mono text-sm text-gray-600">
                        {order?.id?.substring(0, 8)}...
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {order?.customerName || order?.user?.fullName || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order?.customerEmail}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(Number(order?.total || 0))}
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        className={statusMap[order?.status as keyof typeof statusMap]?.color}
                        variant="secondary"
                      >
                        {statusMap[order?.status as keyof typeof statusMap]?.label}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-sm">
                      {order?.provider || 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-sm">
                      {order?.createdAt?.toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!orders?.length && (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
                <p className="text-gray-500">Os pedidos aparecerão aqui quando forem realizados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
