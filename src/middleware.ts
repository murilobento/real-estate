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

  // Se não há sessão, redireciona para o login se tentar acessar qualquer painel protegido
  if (!session && (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/super-admin'))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // Se há sessão, mas o usuário tenta acessar a página de login, redireciona para o painel apropriado
  if (session && req.nextUrl.pathname === '/login') {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
    const redirectTo = profile?.role === 'super-admin' ? '/super-admin' : '/admin';
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // Se há sessão, verifica a rota e a função do usuário
  if (session) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
    const userRole = profile?.role;

    // Se um tenant tenta acessar o painel super-admin, redireciona para /admin
    if (userRole !== 'super-admin' && req.nextUrl.pathname.startsWith('/super-admin')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    // Se um super-admin tenta acessar o painel /admin, redireciona para /super-admin
    if (userRole === 'super-admin' && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/super-admin', req.url));
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/super-admin/:path*', '/login'],
}