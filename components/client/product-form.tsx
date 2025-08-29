"use client";
import { useState } from "react";

type Props = {
  initial?: { name?: string; price?: number | null; stock?: number | null; description?: string | null; imageUrl?: string | null };
  onSubmit?: (data: { name: string; price: number; stock: number; description?: string; imageUrl?: string }) => Promise<void> | void;
};

export default function ProductForm({ initial, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [stock, setStock] = useState<number>(initial?.stock ?? 0);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      await onSubmit?.({ name, price, stock, description, imageUrl });
      alert("Produto salvo (placeholder). Integre com sua API para persistir.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Nome</label>
        <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Preço (R$)</label>
          <input type="number" step="0.01" className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                 value={price} onChange={e => setPrice(Number(e.target.value))} required />
        </div>
        <div>
          <label className="block text-sm font-medium">Estoque</label>
          <input type="number" className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                 value={stock} onChange={e => setStock(Number(e.target.value))} required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Imagem (URL)</label>
        <input className="mt-1 w-full rounded-md border px-3 py-2 text-sm" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium">Descrição</label>
        <textarea className="mt-1 w-full rounded-md border px-3 py-2 text-sm" rows={4}
                  value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <button disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Salvando..." : "Salvar produto"}
      </button>
    </form>
  );
}
