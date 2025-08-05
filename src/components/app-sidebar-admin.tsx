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
        <div className="rounded-lg border px-3 py-2 hover:bg-accent/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <Laptop2 className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 group-data-[collapsible=icon]/sidebar:hidden">
                <p className="text-sm font-medium truncate">Imobiliária</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]/sidebar:hidden" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => {
                const active = pathname === link.href
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
      </SidebarContent>

      <SidebarFooter>
        <div className="rounded-lg border p-2">
          <div className="flex items-center gap-3 px-1">
            <span className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image src="/vercel.svg" alt="avatar" fill sizes="32px" className="object-cover" />
            </span>
            <div className="min-w-0 group-data-[collapsible=icon]/sidebar:hidden">
              <p className="text-sm font-medium leading-tight truncate">Usuário</p>
              <p className="text-xs text-muted-foreground truncate">m@example.com</p>
            </div>
          </div>
          <div className="mt-2 group-data-[collapsible=icon]/sidebar:hidden">
            <button
              className="w-full rounded-md border px-2 py-1.5 text-sm hover:bg-accent"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}