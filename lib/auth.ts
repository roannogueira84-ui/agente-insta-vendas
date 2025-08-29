import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";

// Configuração mínima só para o build compilar.
// Depois você pode adicionar provedores (e-mail, etc.) se quiser.
export const authOptions: NextAuthOptions = {
  providers: [],
  session: { strategy: "jwt" }
};

export async function auth() {
  // @ts-expect-error - opções mínimas para compilar
  return getServerSession(authOptions);
}

export default auth;
