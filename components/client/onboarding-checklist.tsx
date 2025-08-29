type Item = { id: string; label: string; done?: boolean };

export default function OnboardingChecklist({
  items = [
    { id: "pagamento", label: "Conectar forma de pagamento" },
    { id: "produto", label: "Cadastrar primeiro produto" },
    { id: "instagram", label: "Conectar Instagram (opcional)" }
  ]
}: { items?: Item[] }) {
  return (
    <div className="rounded-md border p-4">
      <h3 className="font-medium mb-2">Checklist inicial</h3>
      <ul className="space-y-2 text-sm">
        {items.map(it => (
          <li key={it.id} className="flex items-center gap-2">
            <span className={`h-4 w-4 rounded border ${it.done ? "bg-green-500 border-green-500" : "bg-white"}`} />
            <span className={it.done ? "line-through text-gray-400" : ""}>{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
