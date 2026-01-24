import { ReactNode } from "react"
import Link from "next/link"

type LayoutProps = {
    children: ReactNode
    params: Promise <{season: string}>
}

export default async function SeasonLayout({ children, params }: LayoutProps) {
    const { season } = await params

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center bg-red-600 px-24">
                <h1>F1 DASH</h1>
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
            <div className="px-24 py-2">
                {children}
            </div>
        </div>
    )
}