import { prisma } from '../database';
import { GameEndInput, GameInput } from '../protocols/types';


export async function createGame(game: GameInput) {

  return await prisma.game.create({
    data: {
      isFinished: false,
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0
    }
  });
}

export async function getGames() {
  return await prisma.game.findMany();
}

export async function getGameById(id: number) {
  return await prisma.game.findUnique({
    where: {
      id
    },
    include: {
      bets: true
    }
  });
}


export async function finishGame(id: number, GameEnd: GameEndInput) {
  return await prisma.game.update({
    where: {
      id
    },
    data: {
      homeTeamScore: GameEnd.homeTeamScore,
      awayTeamScore: GameEnd.awayTeamScore,
      isFinished: true
    }
  });
}