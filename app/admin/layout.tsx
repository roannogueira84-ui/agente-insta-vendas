// app/admin/layout.tsx
import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

type Props = { children: ReactNode };

export default async function AdminLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  // Lista de admins definida por variável de ambiente (separar por vírgula se tiver mais de um)
  const allowed =
    process.env.ADMIN_EMAILS?.split(",").map((s) => s.trim().toLowerCase()) ??
    [];

  const userEmail = session?.user?.email?.toLowerCase();

  // Se a lista estiver vazia, libera somente se houver sessão.
  // Se tiver emails na lista, exige que o email do usuário esteja nela.
  const isAllowed =
    !!userEmail && (allowed.length === 0 ? !!session : allowed.includes(userEmail));

  if (!isAllowed) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Se você tiver um sidebar de admin, importe e coloque aqui */}
      <main className="mx-auto max-w-6xl p-4 md:p-8">{children}</main>
    </div>
  );
}
