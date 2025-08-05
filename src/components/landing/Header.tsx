"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export const LandingHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Building2 className="h-6 w-6 text-teal-500" />
          <span>Imob-System</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Recursos
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Preços
          </Link>
          <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Contato
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600">
            Comece Agora
          </Button>
        </div>
      </div>
    </header>
  );
};