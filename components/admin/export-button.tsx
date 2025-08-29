"use client";
import * as React from "react";

type Props = { data?: unknown[] };

export default function ExportButton({ data = [] }: Props) {
  const onClick = () => {
    const csv = ["id,name,email"].concat(
      (data as any[]).map(r => [r.id ?? "", r.name ?? "", r.email ?? ""].join(","))
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "clientes.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={onClick}
      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm"
    >
      Exportar CSV
    </button>
  );
}
