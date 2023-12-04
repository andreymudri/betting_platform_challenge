import { GameEndInput, GameInput } from '../protocols/types';
import * as gamesRepository from "../repository/game.repository";
import { updateBetsByGameId } from './bet.service';

export async function createGame(game: GameInput) {

  return await gamesRepository.createGame(game);
}

export async function getGames() {
  return await gamesRepository.getGames();
}

export async function getGameById(id: number) {
  return await gamesRepository.getGameById(id);
}

export async function finishGame(id: number, gameEnd: GameEndInput) {
  const game = await gamesRepository.finishGame(id, gameEnd);
  if (!game.id) throw new Error('Game not found')
  await updateBetsByGameId(game.id, game.homeTeamScore, game.awayTeamScore);



  return game;
}