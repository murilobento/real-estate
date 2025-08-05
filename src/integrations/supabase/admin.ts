import { createClient } from '@supabase/supabase-js'

// Este cliente é apenas para uso no lado do servidor, com privilégios de administrador.
// ATENÇÃO: Nunca exponha a SERVICE_ROLE_KEY no lado do cliente.
export const createAdminClient = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Variáveis de ambiente Supabase ausentes para o cliente administrador.')
  }

  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}