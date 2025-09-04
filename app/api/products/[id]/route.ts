// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type RouteParams = { params: { id: string } };

// GET /api/products/[id]
export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao carregar produto' }, { status: 500 });
  }
}

// PATCH /api/products/[id]
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    // 🔧 Correção: não use session.user.id; cheque apenas se há usuário logado
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Se você precisar do ID do usuário, busque pelo e-mail (quando existir):
    let userId: string | null = null;
    if (session.user.email) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      userId = dbUser?.id ?? null;
    }

    const body = await req.json();

    // Atualiza o produto (se quiser restringir por userId, use um AND no where)
    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        // opcional: se seu schema tiver ownerId/userId no product:
        ...(userId ? { userId } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(_req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Se quiser validar dono, busque userId como no PATCH e inclua na condição
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 });
  }
}
