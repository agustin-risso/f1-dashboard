import { ConstructorStandingRowModel} from "@/lib/f1-types"
import { getConstructorStandings } from "@/lib/f1-api"

type PageProps = {
    params: Promise<{
        season: string
    }>
}

export default async function Page({ params }: PageProps) {
    const { season } = await params
    const constructorStandings = await getConstructorStandings(season)

    return (
        <div className="flex flex-col items-center px-15 py-5">
            <div>TEAMS - Season {season}</div>
            {constructorStandings.length !== 0 
                ?
                    <table className="w-1/3">
                        <thead>
                            <tr className="border">
                                <th className="px-1 border text-center">Pos</th>
                                <th className="px-1 border w-1/3 text-left">Team</th>
                                <th className="px-1 border text-center">Points</th>
                                <th className="px-1 border text-center">Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                        {constructorStandings.map((constructor: ConstructorStandingRowModel) =>  (
                            <tr key={constructor.name} className="border">
                                <td className="px-1 border text-center">{constructor.position}</td>
                                <td className="px-1 border">{constructor.name}</td>
                                <td className="px-1 border text-center">{constructor.points}</td>
                                <td className="px-1 border text-center">{constructor.wins}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                :
                    <p className="px-2 italic">La temporada aún no ha empezado</p>
            }
        </div>
    )
}