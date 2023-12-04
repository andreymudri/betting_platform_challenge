import { Router } from "express";
import validateBody from '../middleware/joi.middleware';
import { participantInputSchema } from '../schemas/participant.schema';
import { createParticipant, getParticipantById, getParticipants } from '../controller/participant.controller';


const participantsRouter = Router();

participantsRouter.post('/participants',validateBody(participantInputSchema), createParticipant);
participantsRouter.get('/participants', getParticipants);
participantsRouter.get('/participants/:id',getParticipantById);


export default participantsRouter;