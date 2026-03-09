import { Skeleton } from "@/components/skeleton"

export default function RaceLoading() {
  return (
    <div>
      {/* PageHeader skeleton */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-72" />
        <div className="mt-4 h-px bg-border/50" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2 mb-6 bg-muted/30 rounded-lg p-1 w-fit">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-28 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>

      {/* Date line */}
      <Skeleton className="h-4 w-48 mb-8" />

      {/* Podium cards */}
      <div className="flex items-start justify-center gap-4 mb-10 max-w-2xl mx-auto">
        {/* P2 */}
        <div className="glass rounded-lg border border-border/50 border-t-2 border-t-muted w-48 mt-6 p-4 space-y-3 order-1">
          <Skeleton className="h-8 w-8 rounded-full mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
        {/* P1 */}
        <div className="glass rounded-lg border border-border/50 border-t-2 border-t-muted w-48 p-4 space-y-3 order-2">
          <Skeleton className="h-8 w-8 rounded-full mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
        {/* P3 */}
        <div className="glass rounded-lg border border-border/50 border-t-2 border-t-muted w-48 mt-10 p-4 space-y-3 order-3">
          <Skeleton className="h-8 w-8 rounded-full mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
      </div>

      {/* Results table skeleton */}
      <div className="max-w-4xl mx-auto rounded-lg border border-border/50 overflow-hidden">
        <div className="bg-muted/30 px-4 py-3 flex gap-4 border-b border-border/50">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-16 ml-auto" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`px-4 py-3 flex items-center gap-4 border-b border-border/30 ${i % 2 === 0 ? "bg-muted/10" : ""}`}
          >
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex items-center gap-2 flex-1">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-24 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
