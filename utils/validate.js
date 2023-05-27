const Joi = require('joi');

const schemaInsert = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.min': `"name" should have a minimum length of {#limit}`,
    'string.max': `"name" should have a maximum length of {#limit}`,
    'any.required': 'missing required "name" field',
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    'string.email': 'Invalid email',
  }),

  phone: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)

    .messages({
      'string.pattern.base': 'Invalid phone number',
    }),
  favorite: Joi.bool().messages({
    'boolean.base': 'A "favorite" must be true or false',
  }),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    'string.min': `"name" should have a minimum length of {#limit}`,
    'string.max': `"name" should have a maximum length of {#limit}`,
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).messages({
    'string.email': 'Invalid email',
  }),

  phone: Joi.string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .messages({
      'string.pattern.base': 'Invalid phone number',
    }),
  favorite: Joi.bool().messages({
    'boolean.base': 'A "favorite" must be true or false',
  }),
});

module.exports = { schemaInsert, schemaUpdate };
