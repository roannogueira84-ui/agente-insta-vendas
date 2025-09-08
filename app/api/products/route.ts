import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/auth';

const prisma =
  (globalThis as any).prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prisma = prisma;
}

// GET /api/products  -> lista produtos
export async function GET(_req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json({ error: 'Erro ao listar produtos' }, { status: 500 });
  }
}

// POST /api/products -> cria produto
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // <<< ponto que dava o erro de tipo >>>
    // A tipagem padrão do NextAuth não inclui "id" no user,
    // então usamos "any" só para leitura do id.
    const userId: string | undefined = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();

    // Validação simples para evitar dependência do zod
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const price = typeof body?.price === 'number' ? body.price : Number(body?.price);
    const description =
      typeof body?.description === 'string' ? body.description.trim() : '';

    if (!name || !Number.isFinite(price)) {
      return NextResponse.json(
        { error: 'Campos inválidos: informe "name" (string) e "price" (número).' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        userId, // relaciona com o usuário logado
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error('POST /api/products error:', err);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}
