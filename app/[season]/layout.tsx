import { ReactNode } from "react"
import Link from "next/link"
import { SeasonSelect } from "@/components/season-select"

type LayoutProps = {
    children: ReactNode
    params: Promise <{season: string}>
}

export default async function SeasonLayout({ children, params }: LayoutProps) {
    const { season } = await params

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-between items-center bg-red-400 px-24">
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold text-white">F1 DASH</h1>
                    
                    <nav className="flex gap-2">
                        <Link className="hover:underline" href={`/${season}`}>
                            Home
                        </Link>
                        <Link className="hover:underline" href={`/${season}/drivers`}>
                            Drivers
                        </Link>
                        <Link className="hover:underline" href={`/${season}/teams`}>
                            Teams
                        </Link>
                    </nav>
                </div>

                <div className="text-white">
                    <SeasonSelect currentSeason={season} />
                </div>
            </div>
                
            <div className="px-24 py-2">
                {children}
            </div>
        </div>
    )
}