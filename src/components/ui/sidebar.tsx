"use client"

import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type SidebarContextType = {
  open: boolean
  setOpen: (open: boolean | ((val: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

const SIDEBAR_COOKIE = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const SHORTCUT_KEY = "b"

const WIDTH_EXPANDED = "16rem" // 256px
const WIDTH_COLLAPSED = "4rem" // 64px
const WIDTH_MOBILE = "18rem" // 288px

export function SidebarProvider({
  children,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
  style,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: React.CSSProperties & {
    ["--sidebar-width"]?: string
    ["--sidebar-width-collapsed"]?: string
    ["--sidebar-width-mobile"]?: string
  }
}) {
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  const [uncontrolledOpen, _setUncontrolledOpen] = React.useState<boolean>(() => {
    if (typeof document === "undefined") return true
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${SIDEBAR_COOKIE}=`))
      ?.split("=")[1]
    if (cookie === undefined) return true
    return cookie === "true"
  })

  const open = typeof controlledOpen === "boolean" ? controlledOpen : uncontrolledOpen

  React.useEffect(() => {
    const onResize = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof value === "function" ? value(open) : value
      if (onOpenChange) onOpenChange(next)
      else _setUncontrolledOpen(next)
      document.cookie = `${SIDEBAR_COOKIE}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [onOpenChange, open]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((v) => !v)
    else setOpen((v) => !v)
  }, [isMobile, setOpen])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
      const mod = isMac ? e.metaKey : e.ctrlKey
      if (mod && e.key.toLowerCase() === SHORTCUT_KEY) {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [toggleSidebar])

  const ctx: SidebarContextType = {
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={ctx}>
      <div
        data-sidebar-provider
        style={
          {
            "--sidebar-width": style?.["--sidebar-width"] ?? WIDTH_EXPANDED,
            "--sidebar-width-collapsed":
              style?.["--sidebar-width-collapsed"] ?? WIDTH_COLLAPSED,
            "--sidebar-width-mobile":
              style?.["--sidebar-width-mobile"] ?? WIDTH_MOBILE,
          } as React.CSSProperties
        }
        className="relative"
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider.")
  return ctx
}

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "icon" | "none"
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  function Sidebar(
    { className, side = "left", variant = "sidebar", collapsible = "icon", ...props },
    ref
  ) {
    const { open, openMobile, isMobile } = useSidebar()
    const isOpen = isMobile ? openMobile : open

    return (
      <div
        ref={ref}
        data-side={side}
        data-variant={variant}
        data-collapsible={collapsible}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          // Base do container (tema claro)
          "group/sidebar fixed inset-y-0 z-40 m-2 rounded-xl border bg-white text-foreground shadow-sm",
          "transition-[width,transform] ease-in-out will-change-transform",
          side === "left" ? "left-0" : "right-0",
          // Largura e offcanvas
          isMobile
            ? [
                "w-[--sidebar-width-mobile]",
                isOpen ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full",
              ]
            : [
                collapsible === "icon"
                  ? isOpen
                    ? "w-[--sidebar-width]"
                    : "w-[--sidebar-width-collapsed]"
                  : "w-[--sidebar-width]",
              ],
          className
        )}
        {...props}
      />
    )
  }
)

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("sticky top-0 z-10 bg-white/95 px-2 py-2", className)} {...props} />
  )
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("sticky bottom-0 z-10 bg-white/95 px-2 py-2", className)} {...props} />
  )
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-full overflow-y-auto px-2 py-2", className)} {...props} />
}

export function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-2 h-px bg-border/70", className)} {...props} />
}

export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-1", className)} {...props} />
}

export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-2 py-1 text-xs font-medium text-muted-foreground group-data-[collapsible=icon]/sidebar:hidden",
        className
      )}
      {...props}
    />
  )
}

export function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-1 space-y-1", className)} {...props} />
}

export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("space-y-1", className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />
}

export function SidebarMenuButton({
  className,
  isActive,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean
  asChild?: boolean
}) {
  const Comp: any = asChild ? "span" : "button"
  return (
    <Comp
      data-active={isActive ? "true" : "false"}
      className={cn(
        "group/menu-item flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm",
        "hover:bg-accent hover:text-accent-foreground",
        "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export function SidebarMenuBadge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto inline-flex h-5 items-center justify-center rounded-md bg-primary/10 px-1.5 text-[10px] font-medium text-primary",
        className
      )}
      {...props}
    />
  )
}

export function SidebarMenuSkeleton({ showIcon }: { showIcon?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-2">
      {showIcon ? <div className="h-4 w-4 animate-pulse rounded bg-muted" /> : null}
      <div className="h-4 flex-1 animate-pulse rounded bg-muted group-data-[collapsible=icon]/sidebar:hidden" />
    </div>
  )
}

export function SidebarTrigger({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white text-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

export function SidebarRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { toggleSidebar } = useSidebar()
  return (
    <div
      role="button"
      onClick={toggleSidebar}
      className={cn(
        "absolute inset-y-0 -right-2 z-50 hidden w-2 cursor-col-resize rounded-r-md group-data-[collapsible=icon]/sidebar:block",
        className
      )}
      {...props}
    />
  )
}

export function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, openMobile, isMobile } = useSidebar()
  const isOpen = isMobile ? openMobile : open
  return (
    <div
      className={cn(
        "transition-[margin] ease-in-out",
        isMobile ? "ml-0" : isOpen ? "ml-[--sidebar-width]" : "ml-[--sidebar-width-collapsed]",
        className
      )}
      {...props}
    />
  )
}