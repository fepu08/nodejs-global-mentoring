import Joi from 'joi';

export const userSchema: Joi.ObjectSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=(.*[0-9]){2,})(?=(.*[A-Za-z]){2,})[0-9A-Za-z]*$/)
    .required(),
  age: Joi.number().min(4).max(130).required(),
});

export const autoSuggestUserSchema: Joi.ObjectSchema = Joi.object({
  loginSubstring: Joi.string(),
  limit: Joi.number(),
});
