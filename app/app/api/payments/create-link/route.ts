
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { createMercadoPagoPreference } from '@/lib/mercadopago';
import { createPagSeguroCharge } from '@/lib/pagseguro';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const body = await req.json();
  const { productId, provider } = body || {};
  if (!productId || !provider) return NextResponse.json({ error: 'productId e provider são obrigatórios' }, { status: 400 });

  const product = await prisma.product.findFirst({ where: { id: productId, userId } });
  if (!product) return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });

  const config = await prisma.paymentConfig.findUnique({ where: { userId_provider: { userId, provider } } });
  if (!config || !config.isActive) return NextResponse.json({ error: 'Gateway não configurado/ativo' }, { status: 400 });

  let linkUrl: string | null = null;
  let linkId: string | null = null;

  if (provider === 'MERCADOPAGO') {
    const pref = await createMercadoPagoPreference(config.token!, {
      items: [{
        title: product.name,
        description: product.description ?? '',
        quantity: 1,
        unit_price: Number(product.price),
        currency_id: 'BRL'
      }],
      back_urls: {
        success: process.env.NEXTAUTH_URL + '/obrigado',
        failure: process.env.NEXTAUTH_URL + '/obrigado?erro=1',
        pending: process.env.NEXTAUTH_URL + '/obrigado?pendente=1'
      },
      auto_return: 'approved',
      notification_url: (process.env.NEXTAUTH_URL || 'http://localhost:3000') + '/api/webhooks/mercadopago'
    });
    linkUrl = pref.init_point || pref.sandbox_init_point;
    linkId = pref.id;
  } else if (provider === 'PAGSEGURO') {
    const charge = await createPagSeguroCharge(config.token!, {
      reference_id: product.id,
      description: product.name,
      amount: { value: Math.round(Number(product.price) * 100), currency: 'BRL' },
      items: [{ name: product.name, quantity: 1, unit_amount: Math.round(Number(product.price) * 100) }],
      notification_urls: [ (process.env.NEXTAUTH_URL || 'http://localhost:3000') + '/api/webhooks/pagseguro' ]
    }, !!config.sandboxMode);
    linkUrl = charge?.links?.find((l: any) => l.rel === 'PAY')?.href ?? null;
    linkId = charge?.id ?? null;
  } else {
    return NextResponse.json({ error: 'Provider inválido' }, { status: 400 });
  }

  const saved = await prisma.paymentLink.create({
    data: {
      productId: product.id,
      userId,
      linkUrl: linkUrl || '',
      linkId,
      isActive: true
    }
  });

  return NextResponse.json({ ok: true, paymentLink: saved });
}
