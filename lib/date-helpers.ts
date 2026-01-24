export function formatRaceDate (date: string, time?: string) {
    const isoString = time ? `${date}T${time}` : date
    const dateObj = new Date(isoString)


    const dateFormatter = new Intl.DateTimeFormat('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    const timeFormatter = new Intl.DateTimeFormat('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })

    const formattedDate = dateFormatter.format(dateObj)
    const formattedTime = time ? timeFormatter.format(dateObj) : ''

    return `${formattedDate} ${formattedTime}`
}