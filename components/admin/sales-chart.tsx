"use client";
type Point = { label: string; value: number };
export default function SalesChart({ data = [] as Point[] }) {
  // Placeholder simples (sem lib de gráfico)
  const total = data.reduce((s, p) => s + p.value, 0);
  return (
    <div className="rounded-md border p-4">
      <div className="mb-2 text-sm text-gray-600">Vendas (placeholder)</div>
      <div className="text-2xl font-semibold">R$ {total.toFixed(2)}</div>
      <div className="mt-2 text-xs text-gray-500">
        Adicione um gráfico depois (Chart.js ou Recharts).
      </div>
    </div>
  );
}
