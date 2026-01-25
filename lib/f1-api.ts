import { Race, RaceCardModel, DriverStanding, DriverStandingRowModel, ConstructorStanding, ConstructorStandingRowModel, ResultsPageModel, Result, RaceResultRowModel } from "./f1-types"

const BASE_URL = "https://api.jolpi.ca/ergast/f1"

export async function getSchedule(season: string): Promise<RaceCardModel[]> {
    const response = await fetch(`${BASE_URL}/${season}.json`)
   
    if (!response.ok) {
        throw new Error("Failed to fetch F1 schedule")
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

export async function getDriverStandings(season: string): Promise<DriverStandingRowModel[]> {
    const response = await fetch(`${BASE_URL}/${season}/driverStandings.json`)

    if (!response.ok) {
        throw new Error("Failed to fetch F1 driver standigs")
    }

    const data = await response.json()
    const driverStandings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || []

    if (driverStandings.length === 0){
        return driverStandings
    }

    const driverStandingsMapped: DriverStandingRowModel[] = driverStandings.map((driverSanding: DriverStanding) => ({
        position: driverSanding.position,
        name: `${driverSanding.Driver?.givenName}` + ` ${driverSanding.Driver?.familyName}`,
        nationality: driverSanding.Driver?.nationality || "",
        points: driverSanding.points || 0,
        wins: driverSanding.wins || 0,
        team: driverSanding.Constructors?.map(c => c.name) ?? [],
    }))

    driverStandingsMapped.sort((a, b) => {
        if (a.points !== b.points){
            return b.points - a.points;
        }

        return b.wins - a.wins;
    })

    return driverStandingsMapped
}

export async function getConstructorStandings(season: string): Promise<ConstructorStandingRowModel[]> {
    const response = await fetch(`${BASE_URL}/${season}/constructorStandings.json`)

    if (!response.ok) {
        throw new Error("Failed to fetch F1 constructor standings")
    }

    const data = await response.json()
    const constructorStandings = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || []

    if (constructorStandings.length === 0){
        return constructorStandings
    }
    
    const constructorStandingsMapped: ConstructorStandingRowModel[] = constructorStandings.map((constructorSanding: ConstructorStanding) => ({
        position: constructorSanding.position,
        name: constructorSanding.Constructor?.name,
        nationality: constructorSanding.Constructor?.nationality,
        points: constructorSanding.points,
        wins: constructorSanding.wins
    }))

    constructorStandingsMapped.sort((a, b) => {
        if (a.points !== b.points){
            return b.points - a.points;
        }

        return b.wins - a.wins;
    })

    return constructorStandingsMapped
}

export async function getRaceResults(season: string, round: number): Promise <ResultsPageModel | null>{
    const response = await fetch(`${BASE_URL}/${season}/${round}/results.json`)

    if (!response.ok) {
        throw new Error("Failed to fetch F1 race results")
    }

    const data = await response.json()
    const raceData = data.MRData.RaceTable.Races[0]
    if (!raceData) return null

    const results: RaceResultRowModel[] = (raceData.Results ?? []).map((result: Result): RaceResultRowModel => ({
        number: result.number ?? "",
        position: Number(result.position),
        points: Number(result.points),
        driver: `${result.Driver?.givenName}` + `${result.Driver?.familyName}`,
        constructor: result.Constructor?.name ?? "",
        grid: Number(result.grid),
        status: result.status ?? "",
        time: result.Time?.time,
    }))

    results.sort((a, b) => a.position - b.position);

    return {
        round: Number(raceData.round),
        raceName: raceData.raceName,
        circuitName: raceData.Circuit?.circuitName,
        locality: raceData.Circuit?.Location?.locality,
        country: raceData.Circuit?.Location?.country,
        date: raceData.date,
        time: raceData.time,
        results,
    };
}