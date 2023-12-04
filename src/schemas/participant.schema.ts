import Joi from 'joi';

export const participantInputSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().required().min(1000)
})