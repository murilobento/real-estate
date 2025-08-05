"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CircleHelp } from "lucide-react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarSuperAdmin } from "@/components/app-sidebar-super-admin";
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

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segment = React.useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    // parts: ["super-admin", "imobiliarias"| "users" | "planos" | ...]
    const second = parts[1];
    if (!second) return "Dashboard";
    switch (second) {
      case "imobiliarias":
        return "Imobiliárias";
      case "users":
        return "Usuários";
      case "planos":
        return "Planos";
      default:
        return second.charAt(0).toUpperCase() + second.slice(1);
    }
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebarSuperAdmin />
      <SidebarInset className="min-h-screen">
        <header className="flex h-16 items-center border-b bg-background">
          <div className="flex w-full items-center gap-3 px-4">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/super-admin">Home</Link>
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
              <Link href="/super-admin/users" className="ml-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/vercel.svg" alt="Avatar" />
                  <AvatarFallback>SA</AvatarFallback>
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