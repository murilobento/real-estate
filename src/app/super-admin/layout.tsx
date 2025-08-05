"use client";

import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { SuperAdminNav } from "./nav";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={20}
        collapsible={true}
        minSize={15}
        maxSize={25}
        className="min-w-[200px]"
      >
        <div className="flex h-[52px] items-center justify-center px-2">
          <a href="/super-admin" className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-6 w-6" />
            <span>Super Admin</span>
          </a>
        </div>
        <Separator />
        <SuperAdminNav />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <main className="flex-1 p-6">{children}</main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}