import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Venda 24/7 com links de pagamento em 1 clique
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Cadastre seus produtos no painel e compartilhe links para receber no Pix ou cartão.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/loja" className="px-5 py-3 rounded bg-black text-white">
            Ver produtos
          </Link>
          <Link href="/dashboard" className="px-5 py-3 rounded border">
            Acessar painel
          </Link>
        </div>
      </div>
      <div className="rounded-lg border p-6">
        <p className="text-sm text-muted-foreground">
          Dica: cadastre um produto no painel e gere um link de pagamento. Ele aparecerá na página do produto.
        </p>
      </div>
    </section>
  );
}
