import { RaceResultRowModel } from "@/lib/f1-types"
import { getRaceResults, getRaceInfo } from "@/lib/f1-api"
import { formatRaceDate } from "@/lib/date-helpers"
import { PageHeader } from "@/components/page-header"
import { AnimatedLayout } from "@/components/animated-layout"
import { StandingsTable } from "@/components/standings-table"
import { PositionBadge } from "@/components/position-badge"
import { EmptyState } from "@/components/empty-state"
import { Card, CardContent } from "@/components/shadcn/card"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { getFlag } from "@/lib/flags"

type PageProps = {
  params: Promise<{ season: string; round: number }>
}

// P1 center, P2 left, P3 right — with height offset like a real podium
const podiumConfig = [
  { order: "order-2", mt: "mt-0", border: "border-t-f1-gold" },
  { order: "order-1", mt: "mt-6", border: "border-t-f1-silver" },
  { order: "order-3", mt: "mt-10", border: "border-t-f1-bronze" },
]

const resultColumns = [
  { key: "position", label: "Pos", align: "center" as const },
  { key: "driver", label: "Piloto", align: "left" as const },
  { key: "constructor", label: "Equipo", align: "left" as const },
  { key: "grid", label: "Grid", align: "center" as const },
  { key: "change", label: "+/-", align: "center" as const },
  { key: "time", label: "Tiempo", align: "left" as const },
  { key: "points", label: "Pts", align: "center" as const },
]

export default async function RaceResults({ params }: PageProps) {
  const { season, round } = await params
  const [results, raceInfo] = await Promise.all([
    getRaceResults(season, round),
    getRaceInfo(season, round),
  ])

  if (!raceInfo) {
    return (
      <AnimatedLayout>
        <EmptyState message="No se encontró información de esta carrera" />
      </AnimatedLayout>
    )
  }

  const isPast = raceInfo.date < new Date().toISOString()

  return (
    <AnimatedLayout>
      <PageHeader
        title={raceInfo.title}
        subtitle={`Round ${raceInfo.round} · ${raceInfo.circuit} · ${raceInfo.locality}, ${raceInfo.country}`}
      />

      {isPast && results ? (
        <PastRaceView results={results} />
      ) : (
        <UpcomingRaceView raceInfo={raceInfo} />
      )}
    </AnimatedLayout>
  )
}

function PastRaceView({ results }: { results: { date: string; time?: string; results: RaceResultRowModel[] } }) {
  const top3 = results.results.slice(0, 3)
  const tableRows = results.results.map((r: RaceResultRowModel) => ({
    ...r,
    grid: isNaN(r.grid) ? "-" : r.grid,
    change: isNaN(r.grid) ? NaN : r.grid - r.position,
    time: r.time || r.status,
  }))

  return (
    <>
      <p className="text-sm text-muted-foreground mb-8 -mt-4">
        {formatRaceDate(results.date, results.time)}
      </p>

      {/* Podium — P2 left, P1 center (highest), P3 right */}
      <div className="flex items-start justify-center gap-4 mb-10 max-w-2xl mx-auto">
        {top3.map((driver, i) => {
          const cfg = podiumConfig[i]
          return (
            <Card
              key={driver.driver}
              className={cn(
                "glass text-center border-t-2 w-48 transition-all duration-300 hover:scale-[1.02]",
                cfg.border,
                cfg.order,
                cfg.mt
              )}
            >
              <CardContent className="space-y-2">
                <PositionBadge position={i + 1} />
                <p className="font-semibold text-sm mt-2">{getFlag(driver.nationality)} {driver.driver}</p>
                <p className="text-xs text-muted-foreground">{driver.constructor}</p>
                <p className="font-mono text-sm text-primary">
                  {driver.time || driver.status}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Full results table */}
      <div className="max-w-4xl mx-auto">
        <StandingsTable columns={resultColumns} rows={tableRows} highlightTopN={3} />
      </div>
    </>
  )
}

function UpcomingRaceView({ raceInfo }: { raceInfo: { sessions: { name: string; date: string; time?: string }[] } }) {
  return (
    <div className="max-w-lg mx-auto -mt-4">
      <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Horarios del fin de semana
      </h2>

      <div className="space-y-2">
        {raceInfo.sessions.map((session) => (
          <div
            key={session.name}
            className={cn(
              "glass rounded-lg px-4 py-3 flex items-center justify-between transition-colors hover:bg-accent/20",
              session.name === "Carrera" && "border-l-2 border-l-primary"
            )}
          >
            <span className={cn(
              "text-sm",
              session.name === "Carrera" ? "font-semibold text-foreground" : "text-muted-foreground"
            )}>
              {session.name}
            </span>
            <span className="text-sm font-mono text-foreground">
              {formatRaceDate(session.date, session.time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
