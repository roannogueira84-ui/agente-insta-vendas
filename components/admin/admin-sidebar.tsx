import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-56 shrink-0 border-r bg-white">
      <nav className="p-4 space-y-2 text-sm">
        <Link className="block hover:underline" href="/admin">Resumo</Link>
        <Link className="block hover:underline" href="/admin/pedidos">Pedidos</Link>
        <Link className="block hover:underline" href="/admin/clientes">Clientes</Link>
        <Link className="block hover:underline" href="/dashboard">Dashboard do Cliente</Link>
      </nav>
    </aside>
  );
}
