import { RaceCardModel } from "@/lib/f1-types"
import { getSchedule } from "@/lib/f1-api"
import { RaceCard } from "@/components/race-card"
import { PageHeader } from "@/components/page-header"
import { AnimatedLayout } from "@/components/animated-layout"
import { StaggeredList } from "@/components/staggered-list"
import { Separator } from "@/components/shadcn/separator"

type PageProps = {
  params: Promise<{ season: string }>
}

export default async function Page({ params }: PageProps) {
  const { season } = await params
  const schedule = await getSchedule(season)

  const now = new Date().toISOString()
  const upcomingRaces = schedule.filter((r: RaceCardModel) => r.date >= now)
  const pastRaces = schedule.filter((r: RaceCardModel) => r.date < now)

  return (
    <AnimatedLayout>
      <PageHeader title="Calendario" subtitle={`Temporada ${season === "current" ? "actual" : season}`} />

      {upcomingRaces.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Próximas carreras
          </h2>
          <StaggeredList className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingRaces.map((race: RaceCardModel) => (
              <RaceCard key={race.round} race={race} season={season} isPast={false} />
            ))}
          </StaggeredList>
        </section>
      )}

      {pastRaces.length > 0 && upcomingRaces.length > 0 && (
        <Separator className="my-8 opacity-30" />
      )}

      {pastRaces.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Carreras finalizadas</h2>
          <StaggeredList className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {pastRaces.map((race: RaceCardModel) => (
              <RaceCard key={race.round} race={race} season={season} isPast={true} />
            ))}
          </StaggeredList>
        </section>
      )}
    </AnimatedLayout>
  )
}
