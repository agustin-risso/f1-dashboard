# URL Demo

[text](https://f1-dashboard-pi.vercel.app/current)

# F1 Dashboard

Dashboard de Fórmula 1 con calendario de carreras, standings de pilotos y constructores, y resultados detallados por carrera con tabs de clasificación y sprint.

## Stack

- **Next.js 16** — App Router, Server Components
- **React 19** — con Tailwind CSS v4
- **shadcn/ui** — componentes accesibles (Card, Table, Tabs, Badge, Select)
- **Motion** — animaciones de entrada y transiciones
- **TypeScript** — strict mode

## Features

- Calendario de la temporada con estado de carreras (finalizadas / próximas)
- Standings de pilotos y constructores con banderas de país
- Resultados de carrera: podio, tabla completa con grid y posiciones ganadas/perdidas
- Tabs por carrera: Carrera · Clasificación (Q1/Q2/Q3) · Sprint · Horarios
- Loading skeletons para todas las páginas
- Error boundary con botón de reintento
- Dark theme F1 con glassmorphism

## Setup

```bash
# 1. Clonar el repo
git clone <tu-repo-url>
cd f1-dashboard

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Correr en desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_F1_API_URL` | URL base de la API de F1 | `https://api.jolpi.ca/ergast/f1` |

## Datos

Los datos provienen de la [Ergast F1 API](https://ergast.com/mrd/) a través del mirror público [api.jolpi.ca](https://api.jolpi.ca).
