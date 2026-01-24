type PageProps = {
    params: Promise<{
        season: string
    }>
}

export default async function Page({ params }: PageProps) {
    const { season } = await params
    return (
        <div>TEAMS - season {season}</div>
    )
}