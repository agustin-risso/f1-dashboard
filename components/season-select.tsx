"use client";

import { usePathname, useRouter } from "next/navigation";

const SEASONS = ["current", "2026", "2025", "2024", "2023"] as const;

type Season = (typeof SEASONS)[number];

export function SeasonSelect({ currentSeason }: { currentSeason: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const value: Season | string = SEASONS.includes(currentSeason as Season)
        ? (currentSeason as Season)
        : currentSeason;
    
    function onChange (nextSeason: string) {
        const parts = pathname.split("/").filter(Boolean);

        if (parts.length === 0) {
            router.push(`/${nextSeason}`);
            return;
        }

        parts[0] = nextSeason;
        router.push(`/${parts.join("/")}`);
    }

    return (
        <label className="flex items-center gap-2 text-sm">
            <span className="opacity-80">Season</span>
            <select
                className="rounded border px-2 py-1 bg-transparent"
                value={value}
                onChange={(e)=> onChange(e.target.value)}
            >
                {SEASONS.map((season) => (
                    <option key={season} value={season}>
                        {season}
                    </option>
                ))}
            </select>
        </label>
    );
}