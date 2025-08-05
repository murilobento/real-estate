"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  CircleHelp,
  ChevronRight,
  LayoutGrid,
  LifeBuoy,
  LogOut,
  Package,
  Settings,
  Users2,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

function Brand() {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
        <LayoutGrid className="h-4 w-4" />
      </div>
      <div className="min-w-0 group-data-[state=open]/sidebar:block group-data-[state=closed]/sidebar:hidden">
        <p className="truncate text-sm font-semibold">Brand</p>
      </div>
    </div>
  );
}

function NavMain() {
  const items = [
    { title: "Dashboard", href: "/examples/dashboard", icon: LayoutGrid, active: true },
    { title: "Orders", href: "#", icon: Package },
    { title: "Customers", href: "#", icon: Users2 },
    { title: "Settings", href: "#", icon: Settings },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.active}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground/70 group-data-[state=closed]/sidebar:hidden" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function NavProjects() {
  const items = [
    { title: "Project A", href: "#", icon: LayoutGrid },
    { title: "Project B", href: "#", icon: LayoutGrid },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function NavHelp() {
  return (
    <SidebarGroup className="group-data-[state=closed]/sidebar:hidden">
      <SidebarGroupLabel>Help</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <LifeBuoy />
                <span>Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function FooterUser() {
  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-3 rounded-md border px-2 py-2 hover:bg-accent">
            <Avatar className="h-7 w-7">
              <AvatarImage src="/vercel.svg" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-left group-data-[state=closed]/sidebar:hidden">
              <p className="truncate text-sm font-medium leading-tight">John Doe</p>
              <p className="truncate text-xs text-muted-foreground">john@example.com</p>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-56">
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="#" className="w-full">Perfil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="#" className="w-full">Configurações</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default function ShadcnExampleDashboard() {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Brand />
        </SidebarHeader>
        {/* Remover overflow do content apenas nesta rota para debug */}
        <SidebarContent className="px-2 py-2 overflow-visible">
          <NavMain />
          <NavProjects />
          <NavHelp />
        </SidebarContent>
        {/* Footer temporário simples para validar renderização */}
        <SidebarFooter className="sticky bottom-0 pb-2 pt-2 bg-red-100">
          <div className="flex h-12 items-center justify-between rounded-md border border-red-300 px-2">
            <span className="text-xs text-red-700">Footer test</span>
            <span className="text-xs text-red-700">OK</span>
          </div>
          <div className="mt-2">
            <FooterUser />
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="min-h-screen">
        <header className="flex h-16 items-center border-b bg-background">
          <div className="flex w-full items-center gap-3 px-4">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/examples/dashboard">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="mx-2 hidden h-6 w-px bg-border md:block" />
            <div className="relative ml-auto flex min-w-0 flex-1 items-center gap-2 md:max-w-md">
              <Input placeholder="Search..." className="h-9 w-full" />
            </div>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" aria-label="Help">
                <CircleHelp className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="ml-1 h-8 w-8">
                <AvatarImage src="/vercel.svg" alt="Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="overflow-auto px-6 py-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Sales</h3>
              <p className="text-sm text-muted-foreground">Overview of your sales performance.</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Visitors</h3>
              <p className="text-sm text-muted-foreground">Website visitors in the last 7 days.</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Tasks</h3>
              <p className="text-sm text-muted-foreground">Pending tasks for your team.</p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}