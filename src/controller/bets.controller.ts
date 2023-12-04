import { Request, Response } from "express"
import httpStatus from "http-status";
import * as betService from "../service/bet.service";


export async function createBet(req: Request, res: Response) {
  const bet = await betService.createBet(req.body);
  return res.status(httpStatus.CREATED).send(bet);
}