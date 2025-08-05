"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Network, Users, Layers, ShieldCheck, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/integrations/supabase/client";

export function AppSidebarSuperAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const links = [
    { title: "Imobiliárias", href: "/super-admin/imobiliarias", icon: Network },
    { title: "Usuários", href: "/super-admin/users", icon: Users },
    { title: "Planos", href: "/super-admin/planos", icon: Layers },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarHeader>
        <div className="px-3 py-2">
          <div className="min-w-0 group-data-[state=open]/sidebar:block group-data-[state=closed]/sidebar:hidden">
            <p className="text-sm font-semibold leading-none">Super Admin</p>
            <p className="text-xs text-muted-foreground">Painel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => {
                const active = pathname.startsWith(link.href)
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={link.href}>
                        <link.icon className="h-4 w-4" />
                        <span>{link.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground/70 group-data-[collapsible=icon]/sidebar:hidden" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4 group-data-[collapsible=icon]/sidebar:hidden">
          <SidebarGroupLabel>Atalhos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/super-admin/planos">
                    <Layers className="h-4 w-4" />
                    <span>Planos & Billing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/super-admin/users">
                    <Users className="h-4 w-4" />
                    <span>Equipe</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-md border px-2 py-2 hover:bg-accent">
                <span className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image src="/vercel.svg" alt="avatar" fill sizes="32px" className="object-cover" />
                </span>
                <div className="min-w-0 text-left group-data-[state=closed]/sidebar:hidden">
                  <p className="truncate text-sm font-medium leading-tight">Super Admin</p>
                  <p className="truncate text-xs text-muted-foreground">admin@example.com</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/super-admin/users">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/super-admin/planos">Configurações</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}