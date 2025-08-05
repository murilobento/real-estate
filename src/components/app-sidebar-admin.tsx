"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building, KeyRound, Users, MapPin, Settings, LayoutDashboard, LogOut } from "lucide-react";
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
        <div className="flex items-center gap-2 px-2.5 py-1.5 text-sm font-semibold">
          <span className="rounded bg-primary/10 px-1.5 py-0.5">ADM</span>
          <span className="truncate">Imobiliária</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild isActive={pathname === link.href}>
                    <Link href={link.href}>
                      <link.icon className="h-4 w-4" />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}