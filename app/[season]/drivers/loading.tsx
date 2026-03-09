import { Skeleton } from "@/components/skeleton"

function TableSkeleton({ rows }: { rows: number }) {
  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="bg-muted/30 px-4 py-3 flex gap-6 border-b border-border/50">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12 ml-auto" />
        <Skeleton className="h-3 w-12" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`px-4 py-3 flex items-center gap-6 border-b border-border/30 ${i % 2 === 0 ? "bg-muted/10" : ""}`}
        >
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="flex items-center gap-2 flex-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-10 ml-auto font-mono" />
          <Skeleton className="h-4 w-6" />
        </div>
      ))}
    </div>
  )
}

export default function DriversLoading() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-48" />
        <div className="mt-4 h-px bg-border/50" />
      </div>
      <TableSkeleton rows={10} />
    </div>
  )
}
