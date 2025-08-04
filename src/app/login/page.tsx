'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/integrations/supabase/client'
import { Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        // Redireciona para o painel de administração após o login
        router.push('/admin')
        // Recarrega a página para garantir que o estado do servidor seja atualizado
        router.refresh();
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <a href="/" className="flex items-center gap-2 font-semibold text-2xl">
            <Building2 className="h-8 w-8" />
            <span>Imobiliária</span>
          </a>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Login</h1>
              <p className="text-muted-foreground">Acesse o painel de administração</p>
            </div>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
              theme="light"
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Endereço de e-mail',
                    password_label: 'Senha',
                    email_input_placeholder: 'Seu endereço de e-mail',
                    password_input_placeholder: 'Sua senha',
                    button_label: 'Entrar',
                    loading_button_label: 'Entrando...',
                    social_provider_text: 'Entrar com {{provider}}',
                    link_text: 'Já tem uma conta? Entre',
                  },
                  sign_up: {
                    email_label: 'Endereço de e-mail',
                    password_label: 'Crie uma senha',
                    button_label: 'Registrar',
                    loading_button_label: 'Registrando...',
                    link_text: 'Não tem uma conta? Registre-se',
                    confirmation_text: 'Verifique seu e-mail para o link de confirmação'
                  },
                  forgotten_password: {
                    email_label: 'Endereço de e-mail',
                    button_label: 'Enviar instruções de recuperação',
                    link_text: 'Esqueceu sua senha?',
                    confirmation_text: 'Verifique seu e-mail para o link de recuperação de senha'
                  },
                  update_password: {
                    password_label: 'Nova senha',
                    password_input_placeholder: 'Sua nova senha',
                    button_label: 'Atualizar senha',
                    loading_button_label: 'Atualizando senha...',
                    confirmation_text: 'Sua senha foi atualizada'
                  }
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}