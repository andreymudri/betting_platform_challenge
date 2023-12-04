import { Request, Response } from "express"
import httpStatus from "http-status";
import * as gameService from "../service/game.service";
import { Game } from '@prisma/client';

export async function createGame(req: Request, res: Response) {
  const game = await gameService.createGame(req.body) as Game;
  return res.status(httpStatus.CREATED).send(game);
}

export async function getGames(req: Request, res: Response) {
  const games = await gameService.getGames();
  return res.status(httpStatus.OK).send(games);
}

export async function getGameById(req: Request, res: Response) {
  const id = +req.params.id;
  if (Number.isNaN(id) || (id < 0)) throw new Error('Invalid ID')
  if (!id) throw new Error('Game not found')
  const game = await gameService.getGameById(Number(id));
  if (!game.id) throw new Error('Game not found')
  return res.status(httpStatus.OK).send(game);
}

export async function finishGame(req: Request, res: Response) {
  const id = +req.params.id;
  if (Number.isNaN(id) || (id < 0)) throw new Error('Invalid ID')
  if (!id) throw new Error('Game not found')
  const game = await gameService.finishGame(Number(id));
  if (!game.id) throw new Error('Game not found')
  return res.status(httpStatus.OK).send(game);
}