"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Building,
  KeyRound,
  Users,
  MapPin,
  Settings,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Laptop2,
  LogOut,
} from "lucide-react";
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

export function AppSidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const links = [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Imóveis", href: "/admin/properties", icon: Building },
    { title: "Aluguéis", href: "/admin/rentals", icon: KeyRound },
    { title: "Clientes", href: "/admin/clients", icon: Users },
    { title: "Usuários", href: "/admin/users", icon: Users },
    { title: "Cidades", href: "/admin/cities", icon: MapPin },
    { title: "Configurações", href: "/admin/settings", icon: Settings },
  ];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/template-site");
    router.refresh();
  }

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarHeader>
        <div className="px-3 py-2">
          <div className="min-w-0 group-data-[state=open]/sidebar:block group-data-[state=closed]/sidebar:hidden">
            <p className="text-sm font-semibold leading-none">Admin</p>
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
                  <Link href="/admin">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Visão geral</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/admin/settings">
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
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
                  <p className="truncate text-sm font-medium leading-tight">Admin</p>
                  <p className="truncate text-xs text-muted-foreground">admin@example.com</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/users">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings">Configurações</Link>
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