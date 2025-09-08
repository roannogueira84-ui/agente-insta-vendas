// app/dashboard/produtos/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

type PageProps = { params: { id: string } };

export default async function ProdutoDetalhePage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return null;

  const { id } = params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/produtos">
          {/* Corrigido: sem prop `size` */}
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Detalhes do produto #{id}</h1>
      </div>

      <div className="rounded border p-4">
        <p className="text-sm text-muted-foreground">
          Aqui vão os detalhes do produto. (Depois você pode conectar ao banco e
          renderizar os dados reais.)
        </p>
      </div>
    </div>
  );
}
