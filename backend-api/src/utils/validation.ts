import Joi from 'joi';
import { DAppCategory } from '../types';

const validCategories: DAppCategory[] = [
  'AI', 'DEX', 'NFT', 'Lending', 'Bridge', 'Infra', 'Aggregator', 'Marketing', 'Unknown'
];

export const schemas = {
  // Validation for top DApps limit parameter
  topDAppsParams: Joi.object({
    limit: Joi.number().integer().min(1).max(50).default(10),
  }),

  // Validation for category parameter
  categoryParams: Joi.object({
    category: Joi.string().valid(...validCategories).required(),
  }),

  // Validation for query parameters
  queryParams: Joi.object({
    limit: Joi.number().integer().min(1).max(50).optional(),
    offset: Joi.number().integer().min(0).optional(),
    search: Joi.string().max(100).optional(),
  }),
};

export const validateRequest = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    throw new Error(`Validation error: ${errorMessage}`);
  }

  return value;
}; 