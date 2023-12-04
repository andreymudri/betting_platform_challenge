export type ParticipantInput = {
  name: string,
  balance: number,
}

export type GameInput = {
  homeTeamName: string,
  awayTeamName: string,
}
export type GameEndInput = {
  id?: number,
  homeTeamScore: number,
  awayTeamScore: number,
}