
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  await prisma.webhookLog.create({
    data: { provider: 'MERCADOPAGO', payload }
  });
  // TODO: opcional: consultar detalhes do pagamento pelo id notificado
  return NextResponse.json({ ok: true });
}
