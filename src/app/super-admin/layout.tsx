"use client";

import * as React from "react";
import { ShieldCheck, Menu, LogOut } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { SuperAdminNav } from "./nav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);
  const [open, setOpen] = React.useState(false);
  const supabase = createClient();
  const router = useRouter();

  React.useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  async function handleLogout() {
    setOpen(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const nav = (
    <>
      <div className="flex h-[52px] items-center justify-center px-2">
        <Link href="/super-admin" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
          <ShieldCheck className="h-6 w-6" />
          <span className={isCollapsed ? "sr-only" : ""}>Super Admin</span>
        </Link>
      </div>
      <Separator />
      <div onClick={() => setOpen(false)} className="flex-1">
        <SuperAdminNav />
      </div>
      <div className="mt-auto p-3">
        <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden" onClick={() => setOpen(true)}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu de navegação do Super Admin</SheetTitle>
                <SheetDescription>Links e opções do painel do Super Admin</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full">
                {nav}
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Super Admin</h1>
          </div>
        </header>
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
      }}
      className="h-full max-h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={20}
        collapsedSize={4}
        collapsible
        minSize={15}
        maxSize={25}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        className="min-w-[50px] transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col h-full">
          <div className="flex h-[52px] items-center justify-center px-2">
            <a href="/super-admin" className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-6 w-6" />
              <span className={isCollapsed ? "sr-only" : ""}>Super Admin</span>
            </a>
          </div>
          <Separator />
          <div className="flex-1">
            <SuperAdminNav />
          </div>
          <div className="mt-auto p-3">
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <div className="flex flex-col h-full">
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}