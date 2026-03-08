"use client"

import { AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/shadcn/card"

export default function SeasonError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center py-24">
      <Card className="glass max-w-md mx-auto">
        <CardContent className="flex flex-col items-center gap-4 py-12">
          <AlertTriangle className="h-10 w-10 text-destructive/70" />
          <h2 className="text-lg font-semibold">Algo salió mal</h2>
          <p className="text-muted-foreground text-sm text-center max-w-xs">
            {error.message || "Ocurrió un error al cargar los datos. Intentá de nuevo."}
          </p>
          <button
            onClick={reset}
            className="mt-2 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Reintentar
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
