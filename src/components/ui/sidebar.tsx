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

  // Evitar divergência SSR/CSR: não ler cookie durante SSR.
  // Inicializa fechado e sincroniza no client após montar.
  // Evitar divergência SSR/CSR: inicie undefined e derive depois do mount
  const [uncontrolledOpen, _setUncontrolledOpen] = React.useState<boolean | undefined>(undefined)

  // Enquanto undefined (SSR), trate como fechado. Após mount, sincroniza.
  const open = typeof controlledOpen === "boolean" ? controlledOpen : (uncontrolledOpen ?? false)

  React.useEffect(() => {
    // Sincroniza estado inicial no client para evitar hydration mismatch
    try {
      const cookie = document.cookie
        .split("; ")
        .find((c) => c.startsWith(`${SIDEBAR_COOKIE}=`))
        ?.split("=")[1]
      const initial = cookie === undefined ? true : cookie === "true"
      _setUncontrolledOpen(initial)
    } catch {
      _setUncontrolledOpen(true)
    }

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
          "group/sidebar fixed inset-y-0 z-40 m-2 rounded-xl border bg-sidebar text-sidebar-foreground shadow-sm",
          "transition-[width,transform] ease-in-out will-change-transform",
          // layout em coluna para permitir footer no final
          "flex flex-col",
          side === "left" ? "left-0" : "right-0",
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
    <div
      className={cn(
        "px-2 py-2 bg-sidebar/95",
        className
      )}
      {...props}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Garantir que o footer sempre apareça no final da sidebar
  return (
    <div
      className={cn(
        "mt-auto px-2 py-2 bg-sidebar/95",
        className
      )}
      {...props}
    />
  )
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Tornar o conteúdo rolável sem encobrir o Footer: use min-h-0 e flex coluna.
  return (
    <div
      className={cn(
        // ocupa o espaço disponível e permite que o footer fique visível
        "flex min-h-0 flex-1 flex-col px-2 py-2",
        // a área rolável fica interna, não no container raiz
        className
      )}
      {...props}
    />
  )
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
        // Removido o hide para que labels/títulos não sumam quando 'state=open'
        // Só escondemos labels quando a sidebar estiver realmente fechada.
        "px-2 py-1 text-xs font-medium text-muted-foreground",
        "group-data-[state=closed]/sidebar:hidden",
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
        "group/menu-item inline-flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm leading-none",
        "whitespace-nowrap overflow-hidden",
        "[&>*]:inline-flex [&>*]:items-center [&>*]:gap-2 [&>*]:min-w-0 [&>*]:whitespace-nowrap",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        "[&_svg]:h-4 [&_svg]:w-4 shrink-0",
        // Mostrar o título quando a sidebar estiver aberta;
        // esconder apenas quando realmente fechada.
        "group-data-[state=open]/sidebar:[&_span]:inline",
        "group-data-[state=closed]/sidebar:[&_span]:hidden",
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
        "bg-transparent", // melhora responsividade do hit area sem visual
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
        // Em mobile sempre ocupa 100% de largura e não aplica margem
        isMobile ? "ml-0" : isOpen ? "ml-[--sidebar-width]" : "ml-[--sidebar-width-collapsed]",
        "pt-0", // evita saltos no topo
        className
      )}
      {...props}
    />
  )
}