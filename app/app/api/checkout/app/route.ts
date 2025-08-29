
import { NextRequest, NextResponse } from 'next/server';
import { createPagSeguroCharge } from '@/lib/pagseguro';

export async function POST(req: NextRequest) {
  const { email, name } = await req.json().catch(() => ({}));
  const token = process.env.PAGSEGURO_TOKEN;
  const sandbox = String(process.env.PAGSEGURO_SANDBOX || 'true') === 'true';
  if (!token) return NextResponse.json({ error: 'PAGSEGURO_TOKEN não configurado' }, { status: 500 });

  const amount = 47.00;
  const charge = await createPagSeguroCharge(token, {
    reference_id: 'APP-SETUP-47',
    description: 'Agente Insta Vendas 24/7 - Acesso',
    amount: { value: Math.round(amount * 100), currency: 'BRL' },
    items: [{ name: 'Acesso ao App', quantity: 1, unit_amount: Math.round(amount * 100) }],
    customer: { email, name },
    notification_urls: [ (process.env.NEXTAUTH_URL || 'http://localhost:3000') + '/api/webhooks/pagseguro-sys' ]
  }, sandbox);

  const payUrl = charge?.links?.find((l: any) => l.rel === 'PAY')?.href;
  return NextResponse.json({ ok: true, payUrl });
}
