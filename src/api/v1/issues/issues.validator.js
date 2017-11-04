const Joi = require('joi');

const issueValidator = {
  validate: {
    payload: {
      status: Joi.string().valid(['pending', 'finished']),
    },
  },
};

module.exports = issueValidator;
