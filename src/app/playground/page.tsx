"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  CircleHelp,
  Home,
  Settings,
  Users,
  LayoutDashboard,
  FolderOpen,
  Tag,
  LogOut,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function NavMain() {
  const items = [
    { title: "Dashboard", href: "/playground", icon: LayoutDashboard },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive>
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

function NavSecondary() {
  const items = [
    { title: "Posts", href: "/playground/posts", icon: FolderOpen },
    { title: "Categories", href: "/playground/categories", icon: Home },
    { title: "Tags", href: "/playground/tags", icon: Tag },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Contents</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
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

function NavSettings() {
  const items = [
    { title: "Users", href: "/playground/users", icon: Users },
    { title: "Account", href: "/playground/account", icon: Settings },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
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

export default function PlaygroundPage() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]/sidebar:hidden">
              <p className="truncate text-sm font-semibold">Brand</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
          <NavSecondary />
          <NavSettings />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]/sidebar:hidden">Sign out</span>
          </Button>
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
                    <Link href="/">Home</Link>
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
              <h3 className="mb-2 text-lg font-semibold">Hover Open</h3>
              <p className="text-sm text-muted-foreground">
                This is a playground replicating the official shadcn Sidebar docs.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Disable Sidebar</h3>
              <p className="text-sm text-muted-foreground">
                Use this route to compare spacing and behavior before applying across the app.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold">Navigation</h3>
              <p className="text-sm text-muted-foreground">
                NavMain, NavSecondary and Footer Sign out mirror the doc structure.
              </p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}