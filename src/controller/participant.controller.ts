import { Request, Response } from "express"
import httpStatus from "http-status";
import * as participantService from "../service/participant.service";

export async function createParticipant(req: Request, res: Response) {
  const participant = await participantService.createParticipant(req.body);
  return res.status(httpStatus.CREATED).send(participant);
}

export async function getParticipants(req: Request, res: Response) {
  const participants = await participantService.getParticipants();
  return res.status(httpStatus.OK).send(participants);
}

export async function getParticipantById(req: Request, res: Response) {
  const id = +req.params.id;
  console.log(id)
  if (Number.isNaN(id) || (id < 0)) return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid ID" });
  if (!id) throw new Error('Participant not found')
  const participant = await participantService.getParticipantById(Number(id));
  if (!participant.id) throw new Error('Participant not found')
  return res.status(httpStatus.OK).send(participant);
}
