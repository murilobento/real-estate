"use client"

import * as React from "react"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type SidebarContextType = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean | ((val: boolean) => boolean)) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const SIDEBAR_KEYBOARD_SHORTCUT = "b"
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"

export function SidebarProvider({
  children,
  defaultOpen,
  open: openProp,
  onOpenChange,
  style,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  style?: React.CSSProperties & {
    ["--sidebar-width"]?: string
    ["--sidebar-width-mobile"]?: string
  }
}) {
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  const [openInternal, _setOpen] = React.useState<boolean>(
    typeof defaultOpen === "boolean"
      ? defaultOpen
      : (() => {
          if (typeof document === "undefined") return true
          const fromCookie =
            document.cookie
              .split("; ")
              .find((c) => c.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
              ?.split("=")[1] ?? ""
          return fromCookie === "true" || fromCookie === ""
        })()
  )

  const open = typeof openProp === "boolean" ? openProp : openInternal

  React.useEffect(() => {
    const onResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
      const mod = isMac ? e.metaKey : e.ctrlKey
      if (mod && e.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, openMobile, isMobile])

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (onOpenChange) {
        onOpenChange(openState)
      } else {
        _setOpen(openState)
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [onOpenChange, open]
  )

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((v) => !v)
    } else {
      setOpen((v) => !v)
    }
  }, [isMobile, setOpen])

  const state: SidebarContextType = {
    state: open ? "expanded" : "collapsed",
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={state}>
      <div
        data-sidebar-provider
        style={
          {
            "--sidebar-width": style?.["--sidebar-width"] ?? SIDEBAR_WIDTH,
            "--sidebar-width-mobile":
              style?.["--sidebar-width-mobile"] ?? SIDEBAR_WIDTH_MOBILE,
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
  collapsible?: "offcanvas" | "icon" | "none"
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
        data-collapsible={collapsible}
        data-variant={variant}
        data-side={side}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "group/sidebar fixed inset-y-0 z-40 border-r bg-sidebar text-sidebar-foreground transition-[width,transform] ease-in-out",
          side === "left" ? "left-0" : "right-0",
          variant === "floating" && "m-2 rounded-xl border shadow-lg",
          variant === "inset" && "m-4 rounded-xl border shadow",
          isMobile
            ? [
                "w-[--sidebar-width-mobile] translate-x-0",
                isOpen ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full",
              ]
            : [
                collapsible === "icon"
                  ? isOpen
                    ? "w-[--sidebar-width]"
                    : "w-14"
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
  return <div className={cn("sticky top-0 z-10 bg-sidebar px-3 py-2", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sticky bottom-0 z-10 bg-sidebar px-3 py-2", className)} {...props} />
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-full overflow-y-auto px-2 py-2", className)} {...props} />
}

export function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-2 h-px bg-sidebar-border", className)} {...props} />
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
        "group/menu-button flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        "transition-colors",
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
        "ml-auto inline-flex h-5 items-center justify-center rounded-md bg-sidebar-primary px-1.5 text-[10px] font-medium text-sidebar-primary-foreground",
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
        "inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
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
        "absolute inset-y-0 -right-2 z-50 hidden w-2 cursor-col-resize rounded-r-md bg-transparent group-data-[collapsible=icon]/sidebar:block",
        className
      )}
      {...props}
    />
  )
}

export function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, isMobile, openMobile } = useSidebar()
  const isOpen = isMobile ? openMobile : open
  return (
    <div
      className={cn(
        "transition-[margin] ease-in-out",
        isMobile
          ? "ml-0"
          : isOpen
          ? "ml-[--sidebar-width]"
          : "ml-14",
        className
      )}
      {...props}
    />
  )
}