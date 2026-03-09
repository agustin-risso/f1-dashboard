import { Skeleton } from "@/components/skeleton"

export default function TeamsLoading() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-48" />
        <div className="mt-4 h-px bg-border/50" />
      </div>

      <div className="rounded-lg border border-border/50 overflow-hidden">
        <div className="bg-muted/30 px-4 py-3 flex gap-6 border-b border-border/50">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12 ml-auto" />
          <Skeleton className="h-3 w-12" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`px-4 py-3 flex items-center gap-6 border-b border-border/30 ${i % 2 === 0 ? "bg-muted/10" : ""}`}
          >
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <Skeleton className="h-4 w-36 flex-1" />
            <Skeleton className="h-4 w-10 ml-auto" />
            <Skeleton className="h-4 w-6" />
          </div>
        ))}
      </div>
    </div>
  )
}
