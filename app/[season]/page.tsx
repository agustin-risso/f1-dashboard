import { RaceCardModel } from "@/lib/f1-types"
import { getSchedule } from "@/lib/f1-api"
import { RaceCard } from "@/components/race-card"
import { PageHeader } from "@/components/page-header"
import { AnimatedLayout } from "@/components/animated-layout"
import { StaggeredList } from "@/components/staggered-list"

type PageProps = {
  params: Promise<{ season: string }>
}

export default async function Page({ params }: PageProps) {
  const { season } = await params
  const schedule = await getSchedule(season)
  const now = new Date().toISOString()

  return (
    <AnimatedLayout>
      <PageHeader title="Calendario" subtitle={`Temporada ${season === "current" ? "actual" : season}`} />

      <div className="flex items-center gap-5 mb-6">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Finalizadas
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Próximas
        </span>
      </div>

      <StaggeredList className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {schedule.map((race: RaceCardModel) => (
          <RaceCard key={race.round} race={race} season={season} isPast={race.date < now} />
        ))}
      </StaggeredList>
    </AnimatedLayout>
  )
}
