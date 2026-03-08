"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"

const SEASONS = ["current", "2026", "2025", "2024", "2023"] as const

type Season = (typeof SEASONS)[number]

export function SeasonSelect({ currentSeason }: { currentSeason: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const value: Season | string = SEASONS.includes(currentSeason as Season)
    ? (currentSeason as Season)
    : currentSeason

  function onChange(nextSeason: string) {
    const parts = pathname.split("/").filter(Boolean)

    if (parts.length === 0) {
      router.push(`/${nextSeason}`)
      return
    }

    parts[0] = nextSeason
    router.push(`/${parts.join("/")}`)
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-30 h-8 text-sm bg-transparent border-border/50 hover:border-border transition-colors">
        <SelectValue placeholder="Temporada" />
      </SelectTrigger>
      <SelectContent>
        {SEASONS.map((season) => (
          <SelectItem key={season} value={season} className="text-sm">
            {season === "current" ? "Actual" : season}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
