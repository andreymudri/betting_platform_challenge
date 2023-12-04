import { Bet } from '@prisma/client'
import { prisma } from '../helpers'

export async function createBetPrisma(bet: Bet) {
  const createBet = await prisma.bet.create({
    data: {
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
      status: bet.status
    }
  })
  return createBet
}
export function createBet(gameId: number, participantId: number) {
  const bet = {
    homeTeamScore: 0,
    awayTeamScore: 0,
    amountBet: 100,
    gameId: gameId,
    participantId: participantId,

  }
  return bet
}