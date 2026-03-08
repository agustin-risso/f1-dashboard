"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname()

  const segments = pathname.split("/").filter(Boolean)
  const hrefSegments = href.split("/").filter(Boolean)

  // Active if href matches pathname, or if both are at season root (length 1)
  const isActive =
    pathname === href ||
    (hrefSegments.length === 1 && segments.length === 1) ||
    (hrefSegments.length > 1 && segments.length > 1 && hrefSegments[1] === segments[1])

  return (
    <Link
      href={href}
      className={cn(
        "relative px-1 py-1 text-sm transition-colors duration-200",
        isActive
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  )
}
