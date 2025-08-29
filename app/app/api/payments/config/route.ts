
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const configs = await prisma.paymentConfig.findMany({ where: { userId } });
  return NextResponse.json({ configs });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;
  const data = await req.json();
  const { provider, email, token, publicKey, sandboxMode, isActive } = data || {};
  if (!provider) return NextResponse.json({ error: 'provider requerido' }, { status: 400 });

  const upsert = await prisma.paymentConfig.upsert({
    where: { userId_provider: { userId, provider } },
    create: { userId, provider, email, token, publicKey, sandboxMode: !!sandboxMode, isActive: !!isActive },
    update: { email, token, publicKey, sandboxMode: !!sandboxMode, isActive: !!isActive },
  });
  return NextResponse.json({ ok: true, config: upsert });
}
