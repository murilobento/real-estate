"use client";

import { useState } from "react";
import { Menu, MessageCircle, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { createClient } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const navLinks = [
    { href: "#home", label: "Início" },
    { href: "#about", label: "Sobre" },
    { href: "#services", label: "Serviços" },
    { href: "#properties", label: "Imóveis" },
    { href: "#contact", label: "Contato" },
  ];

  async function handleLogout() {
    setOpen(false);
    await supabase.auth.signOut();
    // Como estamos no site público, após sair levamos para a landing
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">JR Imóveis</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 pt-4">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu de navegação do site</SheetTitle>
                  <SheetDescription>Links do site e contato</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 pl-6 pt-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-foreground/80"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <Button
                    className="w-fit flex items-center gap-2 mt-2 bg-green-500 hover:bg-green-600"
                    onClick={() => setOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="w-fit flex items-center gap-2 mt-6"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};