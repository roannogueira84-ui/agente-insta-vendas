// app/dashboard/produtos/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: { id: string };
};

export default async function ProdutoPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    // Sem usuário logado, não renderiza nada (ou troque por um redirect se preferir)
    return null;
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!product || product.userId !== userId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/produtos">
            {/* sem size="sm" para bater com a tipagem do seu Button */}
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
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Produto</h1>
      </div>

      <div className="rounded border p-4 space-y-3">
        <div>
          <div className="text-sm text-muted-foreground">ID</div>
          <div className="font-mono text-sm">{product.id}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Nome</div>
          <div className="font-medium">{product.name ?? "-"}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Preço</div>
          <div className="font-medium">
            {product.price != null ? `R$ ${Number(product.price).toFixed(2)}` : "-"}
          </div>
        </div>

        {product.description && (
          <div>
            <div className="text-sm text-muted-foreground">Descrição</div>
            <div className="text-sm">{product.description}</div>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          Criado em: {new Date(product.createdAt).toLocaleString("pt-BR")}
          {product.updatedAt && (
            <> • Atualizado em: {new Date(product.updatedAt).toLocaleString("pt-BR")}</>
          )}
        </div>
      </div>

      {/* Placeholder de geração de link de pagamento (compila sem dependências externas) */}
      <div className="rounded border p-4">
        <h2 className="font-semibold mb-2">Gerar link de pagamento</h2>
        <p className="text-sm text-muted-foreground mb-3">
          (Placeholder) Aqui você poderá gerar um link de pagamento para o produto:
          <span className="font-mono ml-1">{params.id}</span>
        </p>
        <Button
          variant="default"
          // onClick={() => {/* implemente aqui quando tiver o componente real */}}
        >
          Gerar link
        </Button>
      </div>
    </div>
  );
}
