import Link from "next/link"
import { ChevronRight, MapPin, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/shadcn/card"
import { Badge } from "@/components/shadcn/badge"
import { RaceCardModel } from "@/lib/f1-types"
import { formatRaceDate } from "@/lib/date-helpers"
import { cn } from "@/lib/utils"

export function RaceCard({
  race,
  season,
  isPast,
}: {
  race: RaceCardModel
  season: string
  isPast: boolean
}) {
  return (
    <Card
      className={cn(
        "glass transition-all duration-300 hover:scale-[1.02] border-t-2 group",
        isPast
          ? "border-t-primary/60 hover:border-t-primary hover:glow-red"
          : "border-t-emerald-400/40 hover:border-t-emerald-400/60"
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-mono">
            R{race.round}
          </Badge>
          {isPast ? (
            <span className="flex items-center gap-1.5 text-xs text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Finalizada
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Próxima
            </span>
          )}
        </div>
        <h3 className="font-semibold text-base mt-2 leading-tight">{race.title}</h3>
      </CardHeader>

      <CardContent className="pb-3 space-y-1.5">
        <p className="text-sm text-muted-foreground">{race.circuit}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{race.locality}, {race.country}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formatRaceDate(race.date, race.time)}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link
          href={`/${season}/races/${race.round}`}
          className={cn(
            "flex items-center gap-1 text-sm transition-colors group-hover:gap-2",
            isPast
              ? "text-primary hover:text-primary/80"
              : "text-emerald-400 hover:text-emerald-300"
          )}
        >
          {isPast ? "Ver resultados" : "Ver horarios"}
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
