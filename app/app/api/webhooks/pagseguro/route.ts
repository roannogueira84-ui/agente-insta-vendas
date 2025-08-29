
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload) return NextResponse.json({ ok: true });

  // Salvar log cru
  await prisma.webhookLog.create({
    data: { provider: 'PAGSEGURO', payload }
  });

  // Ajuste conforme a estrutura real do PagSeguro
  const status = payload?.charges?.[0]?.status || payload?.status;
  const reference = payload?.reference_id || payload?.charges?.[0]?.reference_id;

  if (reference && status) {
    const paid = ['PAID', 'PAID_OUT', 'SUCCEEDED', 'AUTHORIZED'].includes(String(status).toUpperCase());
    await prisma.order.upsert({
      where: { paymentId: String(payload?.id || reference) },
      create: {
        paymentId: String(payload?.id || reference),
        provider: 'PAGSEGURO',
        status: paid ? 'PAID' : 'PENDING',
        customerEmail: payload?.customer?.email || 'cliente@desconhecido.com',
        customerName: payload?.customer?.name || '',
        total: 0,
        metadata: payload
      },
      update: {
        status: paid ? 'PAID' : 'PENDING',
        metadata: payload
      }
    });
  }

  return NextResponse.json({ ok: true });
}
