import { DriverStandingRowModel } from "@/lib/f1-types"
import { getDriverStandings } from "@/lib/f1-api"

type PageProps = {
    params: Promise<{
        season: string
    }>
}

export default async function Page({params}: PageProps) {
    const { season } = await params
    const driverStandings = await getDriverStandings(season)

    return (
        <div className="flex flex-col items-center px-15 py-5">
            <h1>DRIVERS - Season {season}</h1>
            {driverStandings.length !== 0 
                ? 
                    <table className="w-1/3">
                        <thead>
                            <tr className="border">
                                <th className="px-1 border text-center">Pos</th>
                                <th className="px-1 border w-1/3 text-left">Name</th>
                                <th className="px-1 border w-1/3 text-left">Team</th>
                                <th className="px-1 border text-center">Points</th>
                                <th className="px-1 border text-center">Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                        {driverStandings.map((driver: DriverStandingRowModel) =>  (
                            <tr key={driver.name} className="border">
                                <td className="px-1 border text-center">{driver.position}</td>
                                <td className="px-1 border">{driver.name}</td>
                                <td className="px-1 border">{driver.team}</td>
                                <td className="px-1 border text-center">{driver.points}</td>
                                <td className="px-1 border text-center">{driver.wins}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                : 
                    <p className="py-2 italic">La temporada aún no ha empezado</p>
            }
        </div>
    )
}