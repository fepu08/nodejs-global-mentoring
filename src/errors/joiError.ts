import Joi from 'joi';

export function errorResponse(errorItems: Joi.ValidationErrorItem[]) {
  const errors = errorItems.map((error) => {
    const { path, message } = error;
    return { path, message };
  });
  return {
    status: 'Failed',
    errors,
  };
}
