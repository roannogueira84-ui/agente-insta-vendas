
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  await prisma.webhookLog.create({ data: { provider: 'PAGSEGURO_SYS', payload } });

  const status = payload?.charges?.[0]?.status || payload?.status;
  const reference = payload?.reference_id || payload?.charges?.[0]?.reference_id;

  const paid = ['PAID', 'PAID_OUT', 'SUCCEEDED', 'AUTHORIZED'].includes(String(status).toUpperCase());
  if (reference === 'APP-SETUP-47' && paid) {
    const email = payload?.customer?.email || null;
    const name = payload?.customer?.name || 'Cliente';
    if (email) {
      // upsert user
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        const tempPass = crypto.randomBytes(8).toString('hex');
        user = await prisma.user.create({
          data: { email, fullName: name, isActive: true, password: tempPass }
        });
        // enviar e-mail com acesso
        const appUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
        await sendEmail({
          to: email,
          subject: 'Seu acesso - Agente Insta Vendas 24/7',
          html: `<p>Olá, ${name}!</p>
          <p>Seu acesso foi liberado. Entre em <a href="${appUrl}/login">${appUrl}/login</a><br/>Email: ${email}<br/>Senha temporária: <b>${tempPass}</b></p>
          <p>Por segurança, altere sua senha após o login.</p>`
        });
      }
      await prisma.order.create({
        data: {
          userId: user?.id,
          customerEmail: email,
          customerName: name,
          total: 47,
          status: 'PAID',
          provider: 'PAGSEGURO',
          paymentId: String(payload?.id || 'SYS-' + Date.now()),
          metadata: payload
        }
      });
    }
  }

  return NextResponse.json({ ok: true });
}
