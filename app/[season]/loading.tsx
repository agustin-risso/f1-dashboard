import { Skeleton } from "@/components/skeleton"

export default function CalendarLoading() {
  return (
    <div>
      {/* PageHeader skeleton */}
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-56" />
        <div className="mt-4 h-px bg-border/50" />
      </div>

      {/* Legend skeleton */}
      <div className="flex items-center gap-5 mb-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Race cards grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="glass rounded-lg border border-border/50 border-t-2 border-t-muted p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-10" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-28 mt-2" />
          </div>
        ))}
      </div>
    </div>
  )
}
