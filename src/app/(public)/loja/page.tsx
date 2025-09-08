type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  description?: string | null;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/public/products`, { cache: "no-store" });
  // Em Vercel, BASE_URL não é necessária; o fetch relativo também funciona:
  // const res = await fetch("/api/public/products", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function LojaPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">Produtos</h2>
      {products.length === 0 && <p className="text-muted-foreground">Nenhum produto cadastrado ainda.</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <a key={p.id} href={`/loja/${p.id}`} className="border rounded-lg overflow-hidden hover:shadow">
            {p.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover" />
            ) : <div className="w-full h-40 bg-gray-100" />}
            <div className="p-4">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{p.description?.slice(0, 80)}</div>
              <div className="mt-3 font-semibold">R$ {(p.price/100).toFixed(2)}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
