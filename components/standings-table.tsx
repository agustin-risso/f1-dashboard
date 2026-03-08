import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import { PositionBadge } from "@/components/position-badge"
import { cn } from "@/lib/utils"
import { getFlag } from "@/lib/flags"

export interface TableColumn {
  key: string
  label: string
  align?: "left" | "center" | "right"
}

const podiumBorder: Record<number, string> = {
  0: "border-l-2 border-l-f1-gold",
  1: "border-l-2 border-l-f1-silver",
  2: "border-l-2 border-l-f1-bronze",
}

function ChangeIndicator({ value }: { value: number }) {
  if (isNaN(value)) {
    return <span className="font-mono text-muted-foreground">-</span>
  }
  if (value > 0) {
    return <span className="font-mono text-emerald-400">+{value}</span>
  }
  if (value < 0) {
    return <span className="font-mono text-red-400">{value}</span>
  }
  return <span className="font-mono text-muted-foreground">0</span>
}

export function StandingsTable({
  columns,
  rows,
  highlightTopN = 3,
}: {
  columns: TableColumn[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Record<string, any>[]
  highlightTopN?: number
}) {
  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border/50">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  "text-xs uppercase tracking-wider text-muted-foreground font-medium",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right"
                )}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              className={cn(
                "transition-colors duration-200 hover:bg-accent/30",
                idx % 2 === 0 && "bg-muted/10",
                idx < highlightTopN && podiumBorder[idx]
              )}
            >
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={cn(
                    "py-3",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right"
                  )}
                >
                  {col.key === "position" ? (
                    <PositionBadge position={row[col.key] as number} />
                  ) : col.key === "change" ? (
                    <ChangeIndicator value={row[col.key] as number} />
                  ) : (col.key === "name" || col.key === "driver") && row.nationality ? (
                    <span className="flex items-center gap-2">
                      <span>{getFlag(row.nationality as string)}</span>
                      <span>{String(row[col.key] ?? "")}</span>
                    </span>
                  ) : (
                    <span
                      className={cn(
                        col.key === "points" && "font-mono font-semibold",
                        col.key === "wins" && "font-mono"
                      )}
                    >
                      {String(row[col.key] ?? "")}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
