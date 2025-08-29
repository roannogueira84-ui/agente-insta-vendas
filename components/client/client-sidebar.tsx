import Link from "next/link";

export default function ClientSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r bg-white">
      <nav className="p-4 space-y-2 text-sm">
        <Link className="block hover:underline" href="/dashboard">Resumo</Link>
        <Link className="block hover:underline" href="/dashboard/produtos">Produtos</Link>
        <Link className="block hover:underline" href="/dashboard/configuracoes">Configurações</Link>
      </nav>
    </aside>
  );
}
