"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Calendario", href: (season: string) => `/${season}` },
  { label: "Pilotos", href: (season: string) => `/${season}/drivers` },
  { label: "Equipos", href: (season: string) => `/${season}/teams` },
]

export function MobileMenu({ season }: { season: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Menú"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border/50 py-2 flex flex-col">
          {navItems.map(({ label, href }) => {
            const url = href(season)
            const isActive = pathname === url
            return (
              <Link
                key={label}
                href={url}
                className={cn(
                  "px-6 py-3 text-sm transition-colors hover:bg-accent/30",
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
