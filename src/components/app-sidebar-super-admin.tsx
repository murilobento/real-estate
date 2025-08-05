"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Network, Users, Layers, ShieldCheck, LogOut, ChevronDown, ChevronRight } from "lucide-react";
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
    <Sidebar collapsible="icon" side="left" variant="sidebar" className="rounded-xl m-2">
      {/* Header estilo workspace card */}
      <SidebarHeader>
        <div className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-sidebar-accent">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]/sidebar:hidden">
              <p className="text-sm font-medium truncate">Acme Inc</p>
              <p className="text-xs text-muted-foreground">Enterprise</p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]/sidebar:hidden" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(link.href)}>
                    <Link href={link.href}>
                      <link.icon className="h-4 w-4" />
                      <span>{link.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4 opacity-50 group-data-[collapsible=icon]/sidebar:hidden" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer com perfil card + logout */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="gap-3">
              <span className="relative h-7 w-7 overflow-hidden rounded-full">
                <Image
                  src="/vercel.svg"
                  alt="avatar"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 group-data-[collapsible=icon]/sidebar:hidden">
                <span className="block text-sm font-medium leading-tight truncate">shadcn</span>
                <span className="block text-xs text-muted-foreground truncate">m@example.com</span>
              </span>
              <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground group-data-[collapsible=icon]/sidebar:hidden" />
            </SidebarMenuButton>
          </SidebarMenuItem>
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