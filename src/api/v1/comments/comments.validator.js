const Joi = require('joi');

const commentValidator = {
  validate: {
    payload: {
      // eslint-disable-next-line newline-per-chained-call
      text: Joi.string().trim().min(1).max(20).required(),
      _issue: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    },
  },
};

module.exports = commentValidator;
