import Joi from 'joi';

export const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=(.*[0-9]){2,})(?=(.*[A-Za-z]){2,})[0-9A-Za-z]*$/)
    .required(),
});
