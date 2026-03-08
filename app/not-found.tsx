import Link from "next/link"
import { SearchX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="glass rounded-lg p-12 max-w-md space-y-4">
        <SearchX className="h-12 w-12 text-muted-foreground/50 mx-auto" />
        <h1 className="text-2xl font-bold text-gradient-f1">404</h1>
        <p className="text-muted-foreground text-sm">Página no encontrada</p>
        <Link
          href="/current"
          className="inline-block mt-4 text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
