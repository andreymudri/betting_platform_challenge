import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database'
import { GameInput } from '../../src/protocols/types';


export async function createGamePrisma(game: GameInput) {
  
  const createGame = await prisma.game.create({
    data: {
      isFinished: false,
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      
    }
  })
  return createGame
}
export function createGame() {
  const game = {
    homeTeamName: faker.animal.bear(),
    awayTeamName: faker.animal.insect(),
  }
  return game
}