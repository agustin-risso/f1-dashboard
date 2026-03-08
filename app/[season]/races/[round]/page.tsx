import { RaceResultRowModel, QualifyingRowModel, SprintRowModel } from "@/lib/f1-types"
import { getRaceResults, getRaceInfo, getQualifyingResults, getSprintResults } from "@/lib/f1-api"
import { formatRaceDate } from "@/lib/date-helpers"
import { PageHeader } from "@/components/page-header"
import { AnimatedLayout } from "@/components/animated-layout"
import { StandingsTable } from "@/components/standings-table"
import { PositionBadge } from "@/components/position-badge"
import { EmptyState } from "@/components/empty-state"
import { Card, CardContent } from "@/components/shadcn/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { getFlag } from "@/lib/flags"

type PageProps = {
  params: Promise<{ season: string; round: number }>
}

const podiumConfig = [
  { order: "order-2", mt: "mt-0", border: "border-t-f1-gold" },
  { order: "order-1", mt: "mt-6", border: "border-t-f1-silver" },
  { order: "order-3", mt: "mt-10", border: "border-t-f1-bronze" },
]

const raceColumns = [
  { key: "position", label: "Pos", align: "center" as const },
  { key: "driver", label: "Piloto", align: "left" as const },
  { key: "constructor", label: "Equipo", align: "left" as const },
  { key: "grid", label: "Grid", align: "center" as const },
  { key: "change", label: "+/-", align: "center" as const },
  { key: "time", label: "Tiempo", align: "left" as const },
  { key: "points", label: "Pts", align: "center" as const },
]

const qualifyingColumns = [
  { key: "position", label: "Pos", align: "center" as const },
  { key: "driver", label: "Piloto", align: "left" as const },
  { key: "constructor", label: "Equipo", align: "left" as const },
  { key: "q1", label: "Q1", align: "center" as const },
  { key: "q2", label: "Q2", align: "center" as const },
  { key: "q3", label: "Q3", align: "center" as const },
]

const sprintColumns = [
  { key: "position", label: "Pos", align: "center" as const },
  { key: "driver", label: "Piloto", align: "left" as const },
  { key: "constructor", label: "Equipo", align: "left" as const },
  { key: "grid", label: "Grid", align: "center" as const },
  { key: "change", label: "+/-", align: "center" as const },
  { key: "time", label: "Tiempo", align: "left" as const },
  { key: "points", label: "Pts", align: "center" as const },
]

export default async function RacePage({ params }: PageProps) {
  const { season, round } = await params
  const [results, raceInfo, qualifying, sprint] = await Promise.all([
    getRaceResults(season, round),
    getRaceInfo(season, round),
    getQualifyingResults(season, round),
    getSprintResults(season, round),
  ])

  if (!raceInfo) {
    return (
      <AnimatedLayout>
        <EmptyState message="No se encontró información de esta carrera" />
      </AnimatedLayout>
    )
  }

  const isPast = raceInfo.date < new Date().toISOString()
  const hasSprint = sprint.length > 0
  const hasQualifying = qualifying.length > 0
  const hasResults = isPast && results && results.results.length > 0

  const tabs = []
  if (hasResults) tabs.push({ id: "race", label: "Carrera" })
  if (hasQualifying) tabs.push({ id: "qualifying", label: "Clasificación" })
  if (hasSprint) tabs.push({ id: "sprint", label: "Sprint" })
  if (!isPast) tabs.push({ id: "schedule", label: "Horarios" })

  return (
    <AnimatedLayout>
      <PageHeader
        title={raceInfo.title}
        subtitle={`Round ${raceInfo.round} · ${raceInfo.circuit} · ${raceInfo.locality}, ${raceInfo.country}`}
      />

      {tabs.length <= 1 && !hasResults && !hasQualifying ? (
        <UpcomingRaceView raceInfo={raceInfo} />
      ) : (
        <Tabs defaultValue={tabs[0]?.id} className="w-full">
          <TabsList className="mb-6 bg-muted/30">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {hasResults && (
            <TabsContent value="race">
              <RaceResultsView results={results!} qualifyingData={qualifying} />
            </TabsContent>
          )}

          {hasQualifying && (
            <TabsContent value="qualifying">
              <QualifyingView rows={qualifying} raceResults={hasResults ? results!.results : []} />
            </TabsContent>
          )}

          {hasSprint && (
            <TabsContent value="sprint">
              <SprintView rows={sprint} />
            </TabsContent>
          )}

          {!isPast && (
            <TabsContent value="schedule">
              <UpcomingRaceView raceInfo={raceInfo} />
            </TabsContent>
          )}
        </Tabs>
      )}
    </AnimatedLayout>
  )
}

function RaceResultsView({ results, qualifyingData }: { results: { date: string; time?: string; results: RaceResultRowModel[] }; qualifyingData: QualifyingRowModel[] }) {
  // Build a map of driver name → qualifying position for grid fallback
  // Drivers not in qualifying get assigned to the back of the grid
  const qualifyingGridMap = new Map<string, number>()
  for (const q of qualifyingData) {
    qualifyingGridMap.set(q.driver, q.position)
  }
  let nextGridPos = qualifyingData.length + 1
  for (const r of results.results) {
    if (!qualifyingGridMap.has(r.driver)) {
      qualifyingGridMap.set(r.driver, nextGridPos++)
    }
  }

  const top3 = results.results.slice(0, 3)
  const tableRows = results.results.map((r: RaceResultRowModel) => {
    const qualPos = qualifyingGridMap.get(r.driver)
    const grid = isNaN(r.grid) ? (qualPos ?? NaN) : r.grid
    return {
      ...r,
      grid: isNaN(grid) ? "DNS" : grid,
      change: isNaN(grid) ? NaN : grid - r.position,
      time: r.status === "Finished" ? (r.time || r.status) : r.status,
    }
  })

  return (
    <>
      <p className="text-sm text-muted-foreground mb-8">
        {formatRaceDate(results.date, results.time)}
      </p>

      <div className="flex items-start justify-center gap-4 mb-10 max-w-2xl mx-auto">
        {top3.map((driver, i) => {
          const cfg = podiumConfig[i]
          return (
            <Card
              key={driver.driver}
              className={cn(
                "glass text-center border-t-2 w-48 transition-all duration-300 hover:scale-[1.02]",
                cfg.border, cfg.order, cfg.mt
              )}
            >
              <CardContent className="space-y-2">
                <PositionBadge position={i + 1} />
                <p className="font-semibold text-sm mt-2">{getFlag(driver.nationality)} {driver.driver}</p>
                <p className="text-xs text-muted-foreground">{driver.constructor}</p>
                <p className="font-mono text-sm text-primary">{driver.time || driver.status}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        <StandingsTable columns={raceColumns} rows={tableRows} highlightTopN={3} />
      </div>
    </>
  )
}

function QualifyingView({ rows, raceResults }: { rows: QualifyingRowModel[]; raceResults: RaceResultRowModel[] }) {
  // Find drivers who raced but didn't appear in qualifying (DNS)
  const qualifiedDrivers = new Set(rows.map(r => r.driver))
  const dnsDrivers: QualifyingRowModel[] = raceResults
    .filter(r => !qualifiedDrivers.has(r.driver))
    .map((r, i) => ({
      position: rows.length + i + 1,
      driver: r.driver,
      nationality: r.nationality,
      constructor: r.constructor,
      q1: "DNS",
    }))

  const allRows = [...rows, ...dnsDrivers]

  return (
    <div className="max-w-3xl mx-auto">
      <StandingsTable columns={qualifyingColumns} rows={allRows} highlightTopN={3} />
    </div>
  )
}

function SprintView({ rows }: { rows: SprintRowModel[] }) {
  const tableRows = rows.map((r) => ({
    ...r,
    grid: isNaN(r.grid) ? "-" : r.grid,
    change: isNaN(r.grid) ? NaN : r.grid - r.position,
    time: r.time || r.status,
  }))

  return (
    <div className="max-w-4xl mx-auto">
      <StandingsTable columns={sprintColumns} rows={tableRows} highlightTopN={3} />
    </div>
  )
}

function UpcomingRaceView({ raceInfo }: { raceInfo: { sessions: { name: string; date: string; time?: string }[] } }) {
  return (
    <div className="max-w-lg mx-auto">
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
