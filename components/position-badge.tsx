import { cn } from "@/lib/utils"

const positionStyles: Record<number, string> = {
  1: "bg-f1-gold/20 text-f1-gold border-f1-gold/30",
  2: "bg-f1-silver/15 text-f1-silver border-f1-silver/30",
  3: "bg-f1-bronze/15 text-f1-bronze border-f1-bronze/30",
}

export function PositionBadge({ position }: { position: number }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border",
        positionStyles[position] || "bg-muted/50 text-muted-foreground border-transparent"
      )}
    >
      {position}
    </span>
  )
}
