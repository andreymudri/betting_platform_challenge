import { Bet } from '@prisma/client';
import { prisma } from '../database';
import { BetInput } from '../protocols/types';



export async function createBet(bet: BetInput) {
    const createBet = await prisma.bet.create(
      {
        data: {
          homeTeamScore: bet.homeTeamScore,
          awayTeamScore: bet.awayTeamScore,
          amountBet: bet.amountBet,
          gameId: bet.gameId,
          participantId: bet.participantId,
          status: "Pending",
          amountWon: null
        }
      }
    );
    return createBet

}
export async function updateBet(bet: Bet ) {

    const updateBet = await prisma.bet.update({
      where: {
        id: bet.id
      },
      data: {
        homeTeamScore: bet.homeTeamScore,
        awayTeamScore: bet.awayTeamScore,
        amountBet: bet.amountBet,
        gameId: bet.gameId,
        participantId: bet.participantId,
        status: bet.status,
        amountWon: bet.amountWon
      }
    });
    return updateBet

}

export async function getBetsByGameId(gameId: number) {
  const bets = await prisma.bet.findMany({
    where: {
      gameId: gameId
    }
  });
  return bets
}