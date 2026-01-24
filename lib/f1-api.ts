import { Race, RaceCardModel, DriverStandingRowModel, ConstructorStandingRowModel } from "./f1-types"

const BASE_URL = "https://api.jolpi.ca/ergast/f1"

export async function getSchedule(season: string): Promise<RaceCardModel[]> {
    const response = await fetch(`${BASE_URL}/${season}.json`)
   
    if (!response.ok) {
        throw new Error("Failed to fetch F1 data")
    }

    const data = await response.json()
    const races = data.MRData.RaceTable.Races

    const racesMapped: RaceCardModel[] = races.map((race: Race) => ({
        season: race.season,
        round: Number(race.round),
        title: race.raceName,
        date: race.date,
        time: race.time || "",
        circuit: race.Circuit?.circuitName,
        locality: race.Circuit?.Location?.locality || "",
        country: race.Circuit?.Location?.country || "",
        url: race.url || "",
    }))

    racesMapped.sort((a, b) => a.round - b.round);

    return racesMapped
}