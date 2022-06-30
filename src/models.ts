export interface Show {
    seasons: Season[];
  }
export interface Season {
    number: number,
    episodes: Episode[]
}
export interface Episode {
    title: string,
    air_date: string,
    number: number,
    runtime_m: number,
    runtime_s: number,
    references: Reference[]
}
export interface Reference {
    time_m: number,
    time_s: number,
    quote: string,
    subject: string,
    body: string
}