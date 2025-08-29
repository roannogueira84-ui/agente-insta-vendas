"use client";
import Link from "next/link";

export default function ProductActions({ id }: { id: string }) {
  async function handleDelete() {
    // placeholder – aqui você chamaria sua API DELETE /api/products/:id
    alert(`Excluir produto ${id} (placeholder)`);
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/produtos/${id}/editar`}
        className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        Editar
      </Link>
      <button
        onClick={handleDelete}
        className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
      >
        Excluir
      </button>
    </div>
  );
}
