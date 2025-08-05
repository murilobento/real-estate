"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CircleHelp } from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarAdmin } from "@/components/app-sidebar-admin";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segment = React.useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    // parts: ["admin", "properties" | "rentals" | "clients" | "users" | "cities" | "settings" | ...]
    const second = parts[1];
    if (!second) return "Dashboard";
    const map: Record<string, string> = {
      properties: "Imóveis",
      rentals: "Aluguéis",
      clients: "Clientes",
      users: "Usuários",
      cities: "Cidades",
      settings: "Configurações",
    };
    return map[second] ?? second.charAt(0).toUpperCase() + second.slice(1);
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <SidebarInset className="min-h-screen">
        <header className="flex h-16 items-center border-b bg-background">
          <div className="flex w-full items-center gap-3 px-4">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="mx-2 hidden h-6 w-px bg-border md:block" />
            <div className="relative ml-auto flex min-w-0 flex-1 items-center gap-2 md:max-w-md">
              <Input placeholder="Buscar..." className="h-9 w-full" />
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" aria-label="Ajuda">
                <CircleHelp className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Notificações">
                <Bell className="h-4 w-4" />
              </Button>
              <Link href="/admin/settings" className="ml-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/vercel.svg" alt="Avatar" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </header>
        <main className="overflow-auto px-6 py-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}