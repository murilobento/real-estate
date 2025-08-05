# Imob-System – Multi-tenant para Imobiliárias

Este projeto é um sistema multi-tenant para imobiliárias, construído com Next.js (App Router), TypeScript, Tailwind e componentes Shadcn/UI. Autenticação, banco de dados e RLS via Supabase.

## Principais Tecnologias
- Next.js (App Router) + TypeScript
- Tailwind CSS + Shadcn/UI (Radix)
- React Hook Form + Zod
- Sonner (toasts)
- Supabase (auth, DB, RLS)
- Recharts (gráficos)

## Novidades: Sidebar no estilo shadcn-ui-sidebar
A navegação lateral foi reescrita para seguir fielmente o layout do repositório de referência:
https://github.com/salimi-my/shadcn-ui-sidebar

Componentes-base (mantendo os mesmos nomes e API):
- src/components/ui/sidebar.tsx
  - SidebarProvider
  - Sidebar
  - SidebarHeader / SidebarContent / SidebarFooter
  - SidebarGroup / SidebarGroupLabel / SidebarGroupContent
  - SidebarMenu / SidebarMenuItem / SidebarMenuButton
  - SidebarTrigger / SidebarInset / SidebarRail
  - Utilitários: SidebarSeparator, SidebarMenuBadge, SidebarMenuSkeleton

Sidebars específicas:
- src/components/app-sidebar-admin.tsx
- src/components/app-sidebar-super-admin.tsx

Comportamento:
- Larguras: 256px expandido, 64px colapsado, 288px no mobile (off-canvas).
- Colapso/Expansão: compatível com SidebarTrigger e atalho de teclado (Ctrl/Cmd + B).
- No mobile, a Sidebar vira off-canvas.
- Footer com “card” de perfil e opção de sair (logout via Supabase).
- Labels ocultam quando colapsado; rail de interação presente.

Páginas que usam o layout com Sidebar
- Painel do Super Admin: src/app/super-admin/layout.tsx
- Painel do Admin: src/app/admin/layout.tsx
Ambos já utilizam SidebarProvider, Sidebar, SidebarTrigger e SidebarInset conforme o padrão do layout.

## Rotas principais
- /                 (Landing)
- /template-site     (Site público da imobiliária exemplo)
- /login             (Autenticação Supabase)
- /admin/...         (Painel do tenant)
- /super-admin/...   (Painel global)

## Supabase
- Cliente browser: src/integrations/supabase/client.ts
- Cliente server: src/integrations/supabase/server.ts
- Cliente admin (service role – somente server): src/integrations/supabase/admin.ts
- Middleware de proteção de rotas: src/middleware.ts
- Tabelas/PAPs: ver seção “Supabase Context” e AI_RULES.md

## Planos (Billing simples)
- CRUD de planos em /super-admin/planos
- Server actions em: src/app/super-admin/planos/actions.ts
- Schema (zod): src/app/super-admin/planos/schema.ts
- Listagem e visualização: src/app/super-admin/planos/page.tsx

## Imobiliárias (Tenants)
- CRUD em /super-admin/imobiliarias
- Server actions: src/app/super-admin/imobiliarias/actions.ts
- Convite automático de Admin do tenant via Supabase Admin API.

## Usuários
- Super Admin: /super-admin/users
- Atribuição de usuários a imobiliárias e criação de usuários.

## Convenções de UI
- Priorizar componentes em src/components/ui/ (Shadcn).
- Ícones: lucide-react.
- Notificações: Sonner (Toaster já incluído em src/app/layout.tsx).

## Desenvolvimento
- Tailwind config: tailwind.config.ts
- Estilos globais: src/app/globals.css
- Utilitários: src/lib/utils.ts
- Hooks: src/hooks/

## Dicas de Uso da Sidebar
- Use <SidebarProvider> ao redor do layout.
- Em layouts, utilize <Sidebar> e <SidebarInset> para estruturar a página.
- SidebarTrigger nos headers para colapsar/expandir.
- Ajuste de rótulos/ícones nos arquivos app-sidebar-*.tsx; a lógica de navegação e logout já está pronta.

## Segurança (RLS)
- Políticas de RLS ativas e funções auxiliares no Supabase.
- Veja AI_RULES.md e as políticas listadas no Supabase Context.

## Próximos Passos (resumo)
- Popular dashboards com dados reais do tenant.
- CRUD de imóveis/clientes/agendamentos com RLS.
- Upload de mídia via Supabase Storage.
- Refinar gestão de equipe (papéis: corretor/gerente) e permissões.