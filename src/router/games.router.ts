import { Router } from "express";
import validateBody from '../middleware/joi.middleware';
import { gameEndInputSchema, gameInputSchema } from '../schemas/game.schema';
import * as gameController from '../controller/games.controller';
export const gamesRouter = Router();


gamesRouter.post('/games',validateBody(gameInputSchema), gameController.createGame);
gamesRouter.post('/games/:id/finish', validateBody(gameEndInputSchema), gameController.finishGame);
gamesRouter.get('/games', gameController.getGames);
gamesRouter.get('/games/:id', gameController.getGameById);

export default gamesRouter;