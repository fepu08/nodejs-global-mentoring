import { ALLOWED_PERMISSIONS } from '../models/group-model';
import Joi from 'joi';

export const groupSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required(),
  permissions:Joi.array().items(...ALLOWED_PERMISSIONS).required(),
});
