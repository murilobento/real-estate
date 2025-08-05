import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )
  
  const { data: { session } } = await supabase.auth.getSession()

  // Se não há sessão, redireciona para login se tentar acessar rotas protegidas
  if (!session && (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/super-admin'))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Se há sessão, mas o usuário tenta acessar a página de login, redireciona para o painel apropriado
  if (session && req.nextUrl.pathname === '/login') {
    const { data: profile } = await supabase.from('profiles').select('role').single();
    const redirectTo = profile?.role === 'super-admin' ? '/super-admin' : '/admin';
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // Se há sessão, verifica o papel e protege as rotas
  if (session) {
    const { data: profile } = await supabase.from('profiles').select('role').single();
    const userRole = profile?.role;

    // Super admin tentando acessar o painel do tenant
    if (userRole === 'super-admin' && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/super-admin', req.url));
    }

    // Tenant tentando acessar o painel do super admin
    if (userRole !== 'super-admin' && req.nextUrl.pathname.startsWith('/super-admin')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/super-admin/:path*', '/login'],
}