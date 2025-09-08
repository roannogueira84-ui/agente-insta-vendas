// src/lib/auth.ts
import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Se você estiver usando Prisma, deixe a linha abaixo ativa e certifique-se de ter src/lib/prisma.ts
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma), // habilite se estiver usando Prisma Adapter
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Se acabou de logar, garante que o token tenha o sub/id
      if (account && user) {
        token.sub = token.sub || (user as any).id || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // adiciona id no session.user sem precisar de @ts-expect-error
        (session.user as any).id = (token.sub as string) ?? "";
      }
      return session;
    },
  },
  pages: {
    // se você tiver páginas personalizadas, configure aqui (opcional)
    // signIn: "/login",
  },
};

export async function auth() {
  return getServerSession(authOptions);
}
