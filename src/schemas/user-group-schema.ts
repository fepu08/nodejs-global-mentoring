import Joi from 'joi';

export const userGroupSchema: Joi.ObjectSchema = Joi.object({
  userIds: Joi.array().items(Joi.number()).required(),
  groupId:Joi.number().required(),
});

