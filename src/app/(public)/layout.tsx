export const metadata = {
  title: "Agente Insta Vendas",
  description: "Venda seus produtos com checkout rápido",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-semibold">Agente Insta Vendas 🚀</a>
          <nav className="flex gap-6 text-sm">
            <a href="/loja">Loja</a>
            <a href="/dashboard" className="rounded px-3 py-1 border">Entrar</a>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Agente Insta Vendas
        </div>
      </footer>
    </div>
  );
}
