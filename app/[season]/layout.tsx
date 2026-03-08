import { ReactNode } from "react"
import Link from "next/link"
import { SeasonSelect } from "@/components/season-select"
import { NavLink } from "@/components/nav-link"

type LayoutProps = {
  children: ReactNode
  params: Promise<{ season: string }>
}

export default async function SeasonLayout({ children, params }: LayoutProps) {
  const { season } = await params

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={`/${season}`} className="font-bold text-xl tracking-tight text-gradient-f1">
              F1 DASH
            </Link>

            <nav className="flex items-center gap-5">
              <NavLink href={`/${season}`}>Calendario</NavLink>
              <NavLink href={`/${season}/drivers`}>Pilotos</NavLink>
              <NavLink href={`/${season}/teams`}>Equipos</NavLink>
            </nav>
          </div>

          <SeasonSelect currentSeason={season} />
        </div>
        <div className="h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      <footer className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground">
        F1 Dashboard · Data from Ergast API
      </footer>
    </div>
  )
}
