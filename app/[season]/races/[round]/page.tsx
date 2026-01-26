import { RaceResultRowModel, ResultsPageModel} from "@/lib/f1-types"
import { getRaceResults } from "@/lib/f1-api"
import { formatRaceDate } from "@/lib/date-helpers"

type PageProps = {
    params: Promise<{
        season: string,
        round: number
    }>
}

export default async function RaceResults({params}: PageProps) {
    const {season, round} = await params
    const results = await getRaceResults(season, round)
    const table = results?.results

    return (
        <>
            {results &&
            <div>
                <div>
                    <h1>{results?.round} - {results?.raceName}</h1>
                    <h3 className="text-muted">{results?.circuitName} - {results?.locality}, {results?.country}</h3>
                    <p className="text-muted">{formatRaceDate(results.date, results?.time)}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Grid</th>
                            <th>Pos</th>
                            <th>Positions +/-</th>
                            <th>Time</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table && table.map((driver: RaceResultRowModel) => (
                            <tr key={driver.driver}>
                                <td>{driver.position}</td>
                                <td>{driver.driver}</td>
                                <td>{driver.constructor}</td>
                                <td>{driver.grid}</td>
                                <td>{driver.position}</td>
                                <td>{driver.grid - driver.position}</td>
                                <td>{driver.time ? driver.time : driver.status}</td>
                                <td>{driver.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }
        </>
    );
    
}