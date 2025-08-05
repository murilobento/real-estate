# Plano de Ação - Sistema Multi-tenant para Imobiliárias

Este documento descreve as tarefas necessárias para alinhar o desenvolvimento do sistema com os requisitos definidos no PRD.

---

### ✅ Concluído / 🚧 Em Andamento

- `[x]` Estrutura inicial do projeto com Next.js e Shadcn/UI.
- `[x]` Autenticação básica com Supabase (Login/Logout).
- `[x]` Middleware para proteção de rotas (`/admin`, `/super-admin`).
- `[x]` Layout básico para o painel do Super-Admin.
- `[x]` Layout básico para o painel do Admin.
- `[x]` Super-Admin pode visualizar a lista de imobiliárias.
- `[x]` Super-Admin pode criar imobiliárias (apenas com nome).
- `[x]` Super-Admin pode visualizar usuários e atribuí-los a imobiliárias.
- `[x]` Super-Admin pode criar novos usuários.

---

### 📋 Próximos Passos

#### Módulo Super-Admin

**1. Gerenciamento de Imobiliárias (Tenants)**
-   [ ] **Melhorar Criação:** Adicionar campos `email_contato` e `plano_id` (inicialmente opcional) ao formulário de criação de imobiliária.
-   [ ] **Automação:** Implementar a criação automática de um usuário **Admin** padrão quando uma nova imobiliária for criada. O sistema deve enviar um e-mail de boas-vindas com um link para definir a senha.
-   [ ] **Edição:** Criar funcionalidade para o Super-Admin editar as informações de uma imobiliária existente.
-   [ ] **Status da Conta:** Adicionar um campo `status` (`ativo`, `inativo`) na tabela `imobiliarias` e permitir que o Super-Admin altere esse status.
-   [ ] **Planos de Assinatura:**
    -   [ ] Criar uma nova tabela `planos` no banco de dados.
    -   [ ] Desenvolver uma interface para o Super-Admin criar, editar e visualizar os planos.

**2. Gerenciamento de Usuários**
-   [ ] Criar interface para o Super-Admin gerenciar outros usuários Super-Admin (criar, editar, remover).

---

#### Módulo Admin (Imobiliária)

**1. Dashboard**
-   [ ] Popular o dashboard com dados reais e relevantes para o tenant (ex: total de imóveis, clientes, etc.).

**2. Gerenciamento de Equipe**
-   [ ] **Expandir Papéis:** Atualizar o enum `user_role` para incluir papéis como `corretor` e `gerente`.
-   [ ] **Interface de Equipe:** Criar uma página em `/admin/users` onde o Admin possa convidar, visualizar, editar e remover usuários de sua própria imobiliária.
-   [ ] **Atribuição de Papéis:** Permitir que o Admin atribua os papéis (`corretor`, `gerente`) aos membros de sua equipe.

**3. Gerenciamento de Imóveis (`/admin/properties`)**
-   [ ] **Estrutura do Banco:** Criar a tabela `imoveis` com todos os campos necessários (endereço, tipo, quartos, status, etc.) e RLS para isolamento de tenant.
-   [ ] **Formulário de Cadastro:** Desenvolver um formulário completo para adicionar/editar imóveis.
-   [ ] **Upload de Mídia:** Integrar com o Supabase Storage para upload de múltiplas fotos e vídeos.
-   [ ] **Listagem de Imóveis:** Criar a página que lista todos os imóveis do tenant, com opções de filtro e busca.
-   [ ] **Vincular Corretor:** Permitir associar um ou mais corretores a um imóvel.

**4. Gerenciamento de Clientes (`/admin/clients`)**
-   [ ] **Estrutura do Banco:** Criar a tabela `clientes` com RLS.
-   [ ] **Interface de Cadastro:** Desenvolver formulário para adicionar/editar clientes.
-   [ ] **Listagem e Histórico:** Criar a página de listagem de clientes e uma visão detalhada com histórico de interações.

**5. Agendamento de Visitas (`/admin/rentals` ou `/admin/schedule`)**
-   [ ] **Estrutura do Banco:** Criar a tabela `agendamentos` com RLS.
-   [ ] **Componente de Calendário:** Integrar um componente de calendário para visualizar e criar agendamentos.
-   [ ] **Notificações:** Configurar o envio de e-mails de confirmação para agendamentos (pode ser uma Edge Function).

---

### ⚙️ Melhorias Gerais e Técnicas

-   [ ] **Segurança (RLS):** Revisar e garantir que TODAS as tabelas com dados de tenants (`imoveis`, `clientes`, `agendamentos`, etc.) tenham políticas de Row Level Security robustas.
-   [ ] **Componentes Reutilizáveis:** Criar componentes genéricos (ex: `DataTable`, `PageHeader`) para padronizar as interfaces dos painéis.

---
<br/>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.