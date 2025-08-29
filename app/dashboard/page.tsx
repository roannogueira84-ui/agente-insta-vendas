
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Link2, TrendingUp, Settings2, CheckCircle } from 'lucide-react';
import OnboardingChecklist from '@/components/client/onboarding-checklist';
import RecentProducts from '@/components/client/recent-products';

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  // Buscar dados do usuário
  const [
    productsCount,
    activeProducts,
    paymentLinksCount,
    paymentConfig,
    recentProducts
  ] = await Promise.all([
    prisma.product.count({ where: { userId } }),
    prisma.product.count({ where: { userId, isActive: true } }),
    prisma.paymentLink.count({ where: { userId, isActive: true } }),
    prisma.paymentConfig.findUnique({ where: { userId } }),
    prisma.product.findMany({
      where: { userId },
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { paymentLinks: true }
        }
      }
    })
  ]);

  const metrics = [
    {
      title: 'Produtos Cadastrados',
      value: productsCount.toString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Produtos Ativos',
      value: activeProducts.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Links Ativos',
      value: paymentLinksCount.toString(),
      icon: Link2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Taxa de Conversão',
      value: '0%', // TODO: Implementar cálculo real
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const hasPaymentConfig = Boolean(paymentConfig?.isActive);
  const hasProducts = productsCount > 0;
  const hasActiveLinks = paymentLinksCount > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Olá, {session?.user?.name || 'Usuário'}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Acompanhe o desempenho das suas vendas automáticas
          </p>
        </div>
      </div>

      {/* Onboarding Checklist */}
      {(!hasPaymentConfig || !hasProducts || !hasActiveLinks) && (
        <OnboardingChecklist 
          hasPaymentConfig={hasPaymentConfig}
          hasProducts={hasProducts}
          hasActiveLinks={hasActiveLinks}
        />
      )}

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics?.map((metric, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
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
        {/* Produtos Recentes */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produtos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentProducts products={recentProducts} />
          </CardContent>
        </Card>

        {/* Status da Configuração */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              Status da Configuração
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Configuração de Pagamento</span>
              <div className={`flex items-center gap-2 ${hasPaymentConfig ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-2 h-2 rounded-full ${hasPaymentConfig ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {hasPaymentConfig ? 'Configurado' : 'Pendente'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Produtos Cadastrados</span>
              <div className={`flex items-center gap-2 ${hasProducts ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-2 h-2 rounded-full ${hasProducts ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {hasProducts ? 'Configurado' : 'Pendente'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Links de Pagamento</span>
              <div className={`flex items-center gap-2 ${hasActiveLinks ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-2 h-2 rounded-full ${hasActiveLinks ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {hasActiveLinks ? 'Configurado' : 'Pendente'}
                </span>
              </div>
            </div>

            {hasPaymentConfig && hasProducts && hasActiveLinks && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  🎉 Parabéns! Seu sistema está configurado e pronto para vender 24/7
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
