// app/dashboard/produtos/[id]/editar/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function EditarProdutoPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  const { id } = params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/produtos">
          {/* Corrigido: removido size="sm" */}
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Editar produto</h1>
      </div>

      {/* Formulário básico para edição */}
      <form
        className="grid gap-4 rounded border p-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Aqui você vai salvar as alterações do produto ID: ${id}`);
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
            placeholder="Nome do produto"
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
            placeholder="Preço do produto"
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
          <Button type="submit">Salvar alterações</Button>
          <Link href="/dashboard/produtos">
            <Button variant="ghost">Cancelar</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
