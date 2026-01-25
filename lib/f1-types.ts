
/**
 * MRData wrapper (común a todas las respuestas Ergast-compatible).
 * Ojo: muchas propiedades vienen como string aunque sean números.
 */
export interface MRDataBase {
  xmlns?: string;
  series?: string;
  url?: string;
  limit?: string;
  offset?: string;
  total?: string;
}

/** =========================
 *  Schedule (Races)
 *  ========================= */

export interface Location {
  lat?: string;
  long?: string;
  locality?: string;
  country?: string;
}

export interface Circuit {
  circuitId?: string;
  url?: string;
  circuitName?: string;
  Location?: Location;
}

export interface Race {
  season?: string;
  round?: string;
  url?: string;
  raceName?: string;
  Circuit?: Circuit;

  date?: string;
  time?: string;

  FirstPractice?: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  Qualifying?: Session;
  SprintQualifying?: Session;
  Sprint?: Session;
}

export interface Session {
  date?: string;
  time?: string;
}

export interface RaceTable {
  season?: string;
  round?: string;
  Races: Race[];
}

export interface ScheduleResponse {
  MRData: MRDataBase & {
    RaceTable: RaceTable;
  };
}

/** =========================
 *  Standings
 *  ========================= */

export interface Driver {
  driverId?: string;
  permanentNumber?: string;
  code?: string;
  url?: string;
  givenName?: string;
  familyName?: string;
  dateOfBirth?: string; // YYYY-MM-DD
  nationality?: string;
}

export interface Constructor {
  constructorId?: string;
  url?: string;
  name?: string;
  nationality?: string;
}

export interface DriverStanding {
  position?: string;
  positionText?: string;
  points?: string;
  wins?: string;
  Driver?: Driver;
  Constructors?: Constructor[];
}

export interface ConstructorStanding {
  position?: string;
  positionText?: string;
  points?: string;
  wins?: string;
  Constructor?: Constructor;
}

export interface StandingsListBase {
  season?: string;
  round?: string;
}

export interface DriverStandingsList extends StandingsListBase {
  DriverStandings: DriverStanding[];
}

export interface ConstructorStandingsList extends StandingsListBase {
  ConstructorStandings: ConstructorStanding[];
}

export interface StandingsTableDriver {
  season?: string;
  StandingsLists: DriverStandingsList[];
}

export interface StandingsTableConstructor {
  season?: string;
  StandingsLists: ConstructorStandingsList[];
}

export interface DriverStandingsResponse {
  MRData: MRDataBase & {
    StandingsTable: StandingsTableDriver;
  };
}

export interface ConstructorStandingsResponse {
  MRData: MRDataBase & {
    StandingsTable: StandingsTableConstructor;
  };
}

/** =========================
 *  Race Results
 *  ========================= */

export interface Time {
  millis?: string;
  time?: string;
}

export interface FastestLapTime {
  time?: string;
}

export interface AverageSpeed {
  units?: string;
  speed?: string;
}

export interface FastestLap {
  rank?: string;
  lap?: string;
  Time?: FastestLapTime;
  AverageSpeed?: AverageSpeed;
}

export interface Result {
  number?: string;
  position?: string;
  positionText?: string;
  points?: string;

  Driver?: Driver;
  Constructor?: Constructor;

  grid?: string;
  laps?: string;
  status?: string;

  Time?: Time;
  FastestLap?: FastestLap;
}

export interface RaceWithResults extends Race {
  Results?: Result[];
}

export interface RaceResultsTable {
  season?: string;
  round?: string;
  Races: RaceWithResults[];
}

export interface RaceResultsResponse {
  MRData: MRDataBase & {
    RaceTable: RaceResultsTable;
  };
}

/** =========================
 *  “UI models” opcionales (recomendado)
 *  Mantienen tus componentes desacoplados del JSON
 *  ========================= */

export interface RaceCardModel {
  season: string;
  round: number;
  title: string;
  date: string;
  time?: string;
  circuit: string;
  locality?: string;
  country?: string;
  url?: string;
}

export interface DriverStandingRowModel {
  position: number;
  name: string;
  nationality?: string;
  points: number;
  wins: number;
  team: string[];
}

export interface ConstructorStandingRowModel {
  position: number;
  constructorName: string;
  nationality?: string;
  points: number;
  wins: number;
}
