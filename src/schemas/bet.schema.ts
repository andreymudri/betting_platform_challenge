import Joi from 'joi';

export const betInputSchema = Joi.object({
  homeTeamScore: Joi.number().required().positive(),
  awayTeamScore: Joi.number().required().positive(),
  amountBet: Joi.number().required().positive(),
  gameId: Joi.number().required().positive(),
  participantId: Joi.number().required().positive()
})