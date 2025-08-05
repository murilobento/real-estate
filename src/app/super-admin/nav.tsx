"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Network, Users } from "lucide-react" // Import Users icon
import { cn } from "@/lib/utils"

export function SuperAdminNav() {
  const pathname = usePathname()

  const links = [
    {
      title: "Imobiliárias",
      href: "/super-admin/imobiliarias",
      icon: Network,
    },
    {
      title: "Usuários",
      href: "/super-admin/users",
      icon: Users,
    },
  ]

  return (
    <div className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname.startsWith(link.href) && "bg-accent text-accent-foreground hover:text-accent-foreground"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}