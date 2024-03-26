//* Include joi to check error type
const Joi = require('joi');
const HttpStatus = require('../constants/httpstatus');
//* Include all validators
const Validators = require('../validators');

module.exports = function Validator(validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator)) { throw new Error(`'${validator}' validator is not exist`); }

  return async function Validate(req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi) {
        return res.status(HttpStatus.UNPROCESSABLEENTITY).json({
          message: err.message,
        });
      }
      return res.status(HttpStatus.SERVERERROR).json({
        message: err.message,
      });
    }
  };
};
