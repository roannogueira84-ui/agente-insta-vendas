
import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Users, Search } from 'lucide-react';
import Link from 'next/link';
import ExportButton from '@/components/admin/export-button';

export const dynamic = "force-dynamic";

export default async function ClientesPage() {
  const clients = await prisma.user.findMany({
    where: { role: 'USER' },
    include: {
      _count: {
        select: {
          products: true,
          orders: { where: { status: 'PAID' } }
        }
      },
      orders: {
        where: { status: 'PAID' },
        select: {
          total: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Preparar dados para exportação
  const exportData = clients?.map(client => ({
    nome: client?.fullName || 'N/A',
    email: client?.email,
    status: client?.isActive ? 'Ativo' : 'Inativo',
    produtos: client?._count?.products || 0,
    pedidos: client?._count?.orders || 0,
    receita_total: client?.orders?.reduce((sum, order) => sum + Number(order?.total || 0), 0) || 0,
    data_cadastro: client?.createdAt?.toLocaleDateString('pt-BR'),
    ultimo_acesso: client?.updatedAt?.toLocaleDateString('pt-BR')
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
            <p className="text-gray-600">Gerencie todos os clientes da plataforma</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ExportButton 
            data={exportData} 
            filename="clientes" 
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </ExportButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{clients?.length || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clientes Ativos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clients?.filter(c => c?.isActive)?.length || 0}
                </p>
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
                <p className="text-sm text-gray-600">Novos (30 dias)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clients?.filter(c => {
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return c?.createdAt >= thirtyDaysAgo;
                  })?.length || 0}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Produtos</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Pedidos</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Receita</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => (
                  <tr key={client?.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {client?.fullName || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {client?.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={client?.isActive ? 'default' : 'secondary'}>
                        {client?.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {client?._count?.products || 0}
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {client?._count?.orders || 0}
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(
                        client?.orders?.reduce((sum, order) => sum + Number(order?.total || 0), 0) || 0
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-sm">
                      {client?.createdAt?.toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!clients?.length && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
                <p className="text-gray-500">Os clientes aparecerão aqui após se registrarem na plataforma.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
