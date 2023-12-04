import { GameInput } from '../protocols/types';
import * as gamesRepository from "../repository/game.repository";

export async function createGame(game: GameInput) {

  return await gamesRepository.createGame(game);
}

export async function getGames() {
  return await gamesRepository.getGames();
}

export async function getGameById(id: number) {
  return await gamesRepository.getGameById(id);
}

export async function finishGame(id: number) {
  const game = await gamesRepository.finishGame(id);

  return game;
}