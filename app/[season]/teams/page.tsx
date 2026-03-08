import { getConstructorStandings } from "@/lib/f1-api"
import { PageHeader } from "@/components/page-header"
import { AnimatedLayout } from "@/components/animated-layout"
import { StandingsTable } from "@/components/standings-table"
import { EmptyState } from "@/components/empty-state"

type PageProps = {
  params: Promise<{ season: string }>
}

const columns = [
  { key: "position", label: "Pos", align: "center" as const },
  { key: "name", label: "Equipo", align: "left" as const },
  { key: "points", label: "Puntos", align: "center" as const },
  { key: "wins", label: "Victorias", align: "center" as const },
]

export default async function Page({ params }: PageProps) {
  const { season } = await params
  const constructorStandings = await getConstructorStandings(season)

  return (
    <AnimatedLayout>
      <PageHeader title="Equipos" subtitle={`Clasificación · Temporada ${season === "current" ? "actual" : season}`} />

      {constructorStandings.length > 0 ? (
        <div className="max-w-2xl mx-auto">
          <StandingsTable columns={columns} rows={constructorStandings} highlightTopN={3} />
        </div>
      ) : (
        <EmptyState message="La temporada aún no ha empezado" />
      )}
    </AnimatedLayout>
  )
}
