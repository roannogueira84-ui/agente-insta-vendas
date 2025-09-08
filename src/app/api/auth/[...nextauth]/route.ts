import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Como ainda não estamos usando adapter, manter JWT é mais simples
  session: { strategy: "jwt" },

  pages: {
    signIn: "/login", // sua tela de login
  },

  callbacks: {
    // coloca o id do usuário (sub do token) dentro de session.user.id
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.sub ?? "";
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
