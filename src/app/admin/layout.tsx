"use client";

import * as React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarAdmin } from "@/components/app-sidebar-admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <SidebarInset className="min-h-screen">
        <header className="flex h-14 items-center gap-2 border-b bg-muted/40 px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Admin</h1>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}