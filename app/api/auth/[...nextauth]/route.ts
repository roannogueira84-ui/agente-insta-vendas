import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// adicione outros providers se quiser

import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
