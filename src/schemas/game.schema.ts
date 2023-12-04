import Joi from 'joi'

export const gameInputSchema = Joi.object({
  homeTeamName: Joi.string().required().min(1),
  awayTeamName: Joi.string().required().min(1)
})
export const gameEndInputSchema = Joi.object({
  id: Joi.number(),
  homeTeamScore: Joi.number().required().positive(),
  awayTeamScore: Joi.number().required().positive()
})