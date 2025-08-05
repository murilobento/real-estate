"use client";

import * as React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarSuperAdmin } from "@/components/app-sidebar-super-admin";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarSuperAdmin />
      <SidebarInset className="min-h-screen">
        <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Super Admin</h1>
        </header>
        <main className="p-4 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}