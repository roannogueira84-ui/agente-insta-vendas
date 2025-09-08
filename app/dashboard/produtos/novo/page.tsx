// app/dashboard/produtos/novo/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function NovoProdutoPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // Sem usuário logado, não renderiza nada (ou troque por um redirect, se preferir)
  if (!userId) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/produtos">
          {/* Removido size="sm" porque o seu Button não tem essa prop tipada */}
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Novo produto</h1>
      </div>

      {/* Formulário simples (HTML nativo) só para compilar sem dependências externas */}
      <form
        className="grid gap-4 rounded border p-4"
        // Substitua por sua rota de criação via ação/route handler quando quiser
        onSubmit={(e) => {
          e.preventDefault();
          alert("Aqui entrará a lógica de criação do produto.");
        }}
      >
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm text-muted-foreground">
            Nome
          </label>
          <input
            id="name"
            name="name"
            className="border rounded px-3 py-2"
            placeholder="Ex.: Curso de Instagram"
            required
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="price" className="text-sm text-muted-foreground">
            Preço (R$)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className="border rounded px-3 py-2"
            placeholder="Ex.: 97.00"
            required
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="description" className="text-sm text-muted-foreground">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded px-3 py-2"
            placeholder="Detalhes do produto"
            rows={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit">Salvar</Button>
          <Link href="/dashboard/produtos">
            <Button variant="ghost">Cancelar</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
