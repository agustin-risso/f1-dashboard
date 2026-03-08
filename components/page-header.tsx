import { Separator } from "@/components/shadcn/separator"

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight text-gradient-f1 inline-block">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
      <Separator className="mt-4 opacity-50" />
    </div>
  )
}
