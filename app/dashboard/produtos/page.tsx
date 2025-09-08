"use client";

import { useEffect, useState } from "react";
import { Decimal } from "@prisma/client/runtime/library";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string | number | Decimal;
  imageUrl: string | null;
  createdAt: string;
};

function formatPrice(price: unknown) {
  if (price instanceof Decimal) return `R$ ${price.toNumber().toFixed(2)}`;
  if (typeof price === "number") return `R$ ${price.toFixed(2)}`;
  if (typeof price === "string") {
    const n = Number(price);
    return isNaN(n) ? price : `R$ ${n.toFixed(2)}`;
  }
  return "";
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/public/products");
        if (!res.ok) throw new Error("Erro ao carregar produtos");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      {products.length === 0 ? (
        <p className="text-muted-foreground">Nenhum produto cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg shadow p-4 flex flex-col gap-2"
            >
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <h2 className="text-lg font-semibold">{p.name}</h2>

              <p className="text-sm text-muted-foreground">
                {p.description ?? "Sem descrição"}
              </p>

              <div className="text-sm text-muted-foreground">
                Preço: {formatPrice(p.price)}
              </div>

              <div className="text-xs text-gray-400 mt-2">
                Criado em: {new Date(p.createdAt).toLocaleDateString("pt-BR")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
