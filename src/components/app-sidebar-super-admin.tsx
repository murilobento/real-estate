"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Network, Users, Layers, ShieldCheck, LogOut } from "lucide-react";
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
        <div className="flex items-center gap-2 px-2.5 py-1.5 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4" />
          <span className="truncate">Super Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(link.href)}>
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