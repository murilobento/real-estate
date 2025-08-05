"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Building,
  KeyRound,
  Settings,
  MapPin,
  LayoutDashboard,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Nav() {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  const links = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Imóveis",
      href: "/admin/properties",
      icon: Building,
    },
    {
      title: "Aluguéis",
      href: "/admin/rentals",
      icon: KeyRound,
    },
    {
      title: "Clientes",
      href: "/admin/clients",
      icon: Users,
    },
    {
      title: "Usuários",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Cidades",
      href: "/admin/cities",
      icon: MapPin,
    },
    {
      title: "Configurações",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <TooltipProvider>
      <div
        data-collapsed={!isMobile}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isMobile ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                      pathname === link.href && "bg-accent text-accent-foreground"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === link.href && "bg-accent text-accent-foreground hover:text-accent-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.title}
              </Link>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  )
}