import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Rotas públicas
  const publicPaths = ["/", "/loja", "/loja/", "/api/public"];
  if (publicPaths.some(p => url.pathname === p || url.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Deixe o NextAuth cuidar do resto (dashboard continua protegido)
  return NextResponse.next();
}
