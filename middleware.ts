
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Rotas administrativas - apenas ADMIN
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // Rotas do dashboard - usuários autenticados
    if (pathname.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // API routes protegidas
    if (pathname.startsWith('/api/protected')) {
      if (!token) {
        return new NextResponse(
          JSON.stringify({ error: 'Unauthorized' }),
          { 
            status: 401,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Permitir acesso às páginas públicas
        if (
          pathname === '/' ||
          pathname === '/login' ||
          pathname === '/registro' ||
          pathname === '/termos' ||
          pathname === '/privacidade' ||
          pathname.startsWith('/api/auth') ||
          pathname.startsWith('/api/signup')
        ) {
          return true;
        }

        // Para outras rotas, verificar se tem token
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/protected/:path*',
  ],
};
