const Joi = require('joi');

const userSchema = Joi.object({
  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  password: Joi.string().trim().min(6).required(),
  email: Joi.string().email().required(),
});

module.exports = userSchema;
