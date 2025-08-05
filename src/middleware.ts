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
  
  // Usa getUser() para autenticar a identidade junto ao servidor de Auth
  const { data: { user } } = await supabase.auth.getUser()

  // Sem usuário autenticado → proteger rotas
  if (!user && (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/super-admin'))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  // Usuário autenticado não deve acessar /login
  if (user && req.nextUrl.pathname === '/login') {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    const redirectTo = profile?.role === 'super-admin' ? '/super-admin' : '/admin';
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  // Com usuário, checa role para controlar acesso entre painéis
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    const userRole = profile?.role;

    if (userRole !== 'super-admin' && req.nextUrl.pathname.startsWith('/super-admin')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    if (userRole === 'super-admin' && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/super-admin', req.url));
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/super-admin/:path*', '/login'],
}