// app/dashboard/produtos/[id]/editar/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: { id: string };
};

export default async function EditarProdutoPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    // não renderiza nada se não estiver logado (ou redirecione se quiser)
    return null;
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    select: { id: true, name: true, price: true, createdAt: true, userId: true },
  });

  // evita expor produto de outro usuário
  if (!product || product.userId !== userId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/produtos">
            {/* sem size, para bater com a tipagem do seu Button */}
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

        <h1 className="text-xl font-semibold">Produto não encontrado</h1>
        <p className="text-sm text-muted-foreground">
          Verifique o link ou selecione um produto válido na lista.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/produtos">
          {/* removido size="sm" para não quebrar */}
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Editar produto</h1>
      </div>

      {/* Conteúdo mínimo para compilar sem depender de outros componentes */}
      <div className="rounded border p-4">
        <div className="mb-2">
          <div className="text-sm text-muted-foreground">ID</div>
          <div className="font-mono text-sm">{product.id}</div>
        </div>
        <div className="mb-2">
          <div className="text-sm text-muted-foreground">Nome</div>
          <div className="font-medium">{product.name ?? "-"}</div>
        </div>
        <div className="mb-2">
          <div className="text-sm text-muted-foreground">Preço</div>
          <div className="font-medium">
            {product.price != null ? `R$ ${Number(product.price).toFixed(2)}` : "-"}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Criado em</div>
          <div className="font-medium">
            {new Date(product.createdAt).toLocaleString("pt-BR")}
          </div>
        </div>
      </div>
    </div>
  );
}
