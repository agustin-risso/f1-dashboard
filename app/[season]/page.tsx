import { RaceCardModel } from "@/lib/f1-types"
import { getSchedule } from "@/lib/f1-api"
import { formatRaceDate } from "@/lib/date-helpers"
import Link from "next/link"

type PageProps = {
    params: Promise<{
        season: string
    }>
}

export default async function Page({ params }: PageProps) {
    const { season } = await params

    const schedule = await getSchedule(season)

    return (
        <div className="mx-auto max-w-5xl px-4 py-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {schedule.map((race: RaceCardModel) => (
                <div className="w-full flex flex-col rounded-lg bg-gray-800 p-4">
                    <h2>Round {race.round}: {race.title}</h2>
                    <p>{race.circuit}</p>
                    <p>{race.locality}, {race.country}</p>
                    <p>{formatRaceDate(race.date, race.time)}</p>
                    {race.date < new Date().toISOString() && (
                        <Link className="self-end underline cursor-pointer" href={"race-details"}>See race results {'>'}</Link>
                    )}
                </div>
            ))}
        </div>
    )
}