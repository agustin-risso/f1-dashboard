import { getDriverStandings } from "@/lib/f1-api"
import { PageHeader } from "@/components/page-header"
import { AnimatedLayout } from "@/components/animated-layout"
import { StandingsTable } from "@/components/standings-table"
import { EmptyState } from "@/components/empty-state"

type PageProps = {
  params: Promise<{ season: string }>
}

const columns = [
  { key: "position", label: "Pos", align: "center" as const },
  { key: "name", label: "Piloto", align: "left" as const },
  { key: "team", label: "Equipo", align: "left" as const },
  { key: "points", label: "Puntos", align: "center" as const },
  { key: "wins", label: "Victorias", align: "center" as const },
]

export default async function Page({ params }: PageProps) {
  const { season } = await params
  const driverStandings = await getDriverStandings(season)

  return (
    <AnimatedLayout>
      <PageHeader title="Pilotos" subtitle={`Clasificación · Temporada ${season === "current" ? "actual" : season}`} />

      {driverStandings.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          <StandingsTable columns={columns} rows={driverStandings} highlightTopN={3} />
        </div>
      ) : (
        <EmptyState message="La temporada aún no ha empezado" />
      )}
    </AnimatedLayout>
  )
}
