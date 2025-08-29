
'use client'
import { useState } from 'react';

function PaymentLinkGenerator({ productId }: { productId: string }) {
  const [provider, setProvider] = useState<'PAGSEGURO'|'MERCADOPAGO'>('PAGSEGURO');
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function gerar() {
    setLoading(true);
    setLink('');
    try {
      const res = await fetch('/api/payments/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, provider })
      });
      const data = await res.json();
      if (data?.paymentLink?.linkUrl) setLink(data.paymentLink.linkUrl);
      else alert(data?.error || 'Falha ao gerar link');
    } finally { setLoading(false); }
  }

  return (
    <div className="border rounded p-4 my-6">
      <h3 className="font-medium mb-2">Gerar link de pagamento</h3>
      <div className="flex items-center gap-3 mb-3">
        <select className="border p-2 rounded" value={provider} onChange={(e) => setProvider(e.target.value as any)}>
          <option value="PAGSEGURO">PagSeguro</option>
          <option value="MERCADOPAGO">Mercado Pago</option>
        </select>
        <button disabled={loading} onClick={gerar} className="bg-black text-white px-4 py-2 rounded">
          {loading ? 'Gerando...' : 'Gerar link'}
        </button>
      {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
      {link && <div className="text-sm">Link gerado: <a className="text-blue-600 underline" href={link} target="_blank">{link}</a>{/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>}
    {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
  );
}


import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Package, Link2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductDetailPageProps {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const product = await prisma.product.findFirst({
    where: {
      id: params?.id,
      userId: session.user.id
    },
    include: {
      paymentLinks: {
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: { paymentLinks: true }
      }
    }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/produtos">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
          <p className="text-gray-600">Detalhes e estatísticas do produto</p>
        {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
        <Link href={`/dashboard/produtos/${product?.id}/editar`}>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </Link>
      {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Principais */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Informações do Produto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product?.image && (
                <div className="w-full h-64 relative bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product?.image}
                    alt={product?.name || 'Produto'}
                    fill
                    className="object-cover"
                  />
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge variant={product?.isActive ? 'default' : 'secondary'}>
                    {product?.isActive ? 'Ativo' : 'Inativo'}
                  </Badge>
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Preço:</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(Number(product?.price || 0))}
                  </span>
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estoque:</span>
                  <span className="text-gray-900">{product?.stock}</span>
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Criado em:</span>
                  <span className="text-gray-500 text-sm">
                    {product?.createdAt?.toLocaleDateString('pt-BR')}
                  </span>
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Última atualização:</span>
                  <span className="text-gray-500 text-sm">
                    {product?.updatedAt?.toLocaleDateString('pt-BR')}
                  </span>
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
              {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

              {product?.description && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Descrição</h4>
                  <p className="text-gray-600">{product?.description}</p>
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
              )}
            </CardContent>
          </Card>
        {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

        {/* Estatísticas */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Estatísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {product?._count?.paymentLinks || 0}
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
                <div className="text-sm text-blue-700">Links Criados{/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
              {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {product?.paymentLinks?.filter(link => link?.isActive)?.length || 0}
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
                <div className="text-sm text-green-700">Links Ativos{/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
              {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {product?.paymentLinks?.reduce((sum, link) => sum + (link?.clicks || 0), 0) || 0}
                {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
                <div className="text-sm text-purple-700">Total de Cliques{/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
              {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
            </CardContent>
          </Card>

          {/* Ação Rápida */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/links">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Criar Link de Pagamento
                </Button>
              </Link>
            </CardContent>
          </Card>
        {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
      {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
    {/* Ferramenta de link de pagamento */}\n<PaymentLinkGenerator productId={params.id} />\n</div>
  );
}
