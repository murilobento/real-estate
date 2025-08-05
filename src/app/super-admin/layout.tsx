"use client";

import * as React from "react";
import { Building2 } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { SuperAdminNav } from "./nav"; // Navegação específica do Super Admin
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

  React.useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const nav = (
    <>
      <div className="flex h-[52px] items-center justify-center px-2">
        <a href="/super-admin" className="flex items-center gap-2 font-semibold">
          <Building2 className="h-6 w-6" />
          <span className={isCollapsed ? "sr-only" : ""}>Super Admin</span>
        </a>
      </div>
      <Separator />
      <SuperAdminNav />
    </>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              {nav}
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Super Admin</h1>
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={20}
        collapsedSize={4}
        collapsible={true}
        minSize={15}
        maxSize={25}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        className="min-w-[50px] transition-all duration-300 ease-in-out"
      >
        <div className="flex flex-col h-full">{nav}</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <div className="flex flex-col h-full">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}