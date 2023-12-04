import validateBody from '../middleware/joi.middleware';
import { Router } from "express";
import * as betsController from "../controller/bets.controller"
import { betInputSchema } from "../schemas/bet.schema";
const betsRouter = Router();

betsRouter.post('/bets', validateBody(betInputSchema), betsController.createBet);

export default betsRouter;