import { Flag } from "lucide-react"
import { Card, CardContent } from "@/components/shadcn/card"

export function EmptyState({ message }: { message: string }) {
  return (
    <Card className="glass max-w-md mx-auto mt-12">
      <CardContent className="flex flex-col items-center gap-3 py-12">
        <Flag className="h-10 w-10 text-muted-foreground/50" />
        <p className="text-muted-foreground italic text-sm">{message}</p>
      </CardContent>
    </Card>
  )
}
