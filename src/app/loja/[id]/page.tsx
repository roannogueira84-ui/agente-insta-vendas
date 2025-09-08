import { prisma } from "@/lib/prisma";
import Link from "next/link";

type Props = { params: { id: string } };

export default async function ProdutoPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { paymentLinks: { where: { isActive: true }, orderBy: { createdAt: "desc" }, take: 1 } },
  });

  if (!product) {
    return <div className="mx-auto max-w-3xl px-4 py-16">Produto não encontrado.</div>;
  }

  const link = product.paymentLinks?.[0]?.url ?? null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/loja" className="text-sm underline">← Voltar para a loja</Link>
      <div className="mt-6 grid md:grid-cols-2 gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl ?? "https://via.placeholder.com/600x400"} alt={product.name} className="w-full rounded border" />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mt-2 text-muted-foreground">{product.description}</div>
          <div className="mt-4 text-2xl font-semibold">R$ {(product.price/100).toFixed(2)}</div>

          {link ? (
            <a href={link} target="_blank" className="mt-6 inline-block px-5 py-3 rounded bg-black text-white">
              Comprar agora
            </a>
          ) : (
            <p className="mt-6 text-sm text-amber-600">
              Este produto ainda não tem link de pagamento ativo. Gere no painel em **Produtos** → **Ações** → **Gerar link**.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
