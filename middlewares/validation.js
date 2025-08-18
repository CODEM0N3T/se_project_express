// middlewares/validation.js
const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// helper for URL validation
const validateURL = (value, helpers) => {
  const ok = validator.isURL(value, {
    protocols: ["http", "https"],
    require_protocol: true,
  });
  if (ok) return value;
  return helpers.error("string.uri");
};

// ---- 1) Clothing item body (create) ----
module.exports.validateItemBody = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      weather: Joi.string().valid("hot", "warm", "cold").required(),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'The "imageUrl" field must be a valid URL',
      }),
    }),
  },
  { abortEarly: false }
);

// ---- 2) User body (signup/create) ----
module.exports.validateUserBody = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "avatar" field must be filled in',
        "string.uri": 'The "avatar" field must be a valid URL',
      }),
      email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'The "email" field must be a valid email',
      }),
      password: Joi.string().required().messages({
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  },
  { abortEarly: false }
);

// ---- 2b) User body (update profile: PATCH /users/me) ----
module.exports.validateUserUpdateBody = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "avatar" field must be filled in',
        "string.uri": 'The "avatar" field must be a valid URL',
      }),
    }),
  },
  { abortEarly: false }
);

// ---- 3) Auth body (signin) ----
module.exports.validateAuthBody = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'The "email" field must be a valid email',
      }),
      password: Joi.string().required().messages({
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  },
  { abortEarly: false }
);

// ---- 4) IDs in params ----
// Generic: allows either key if present (not both required simultaneously)
module.exports.validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).messages({
      "string.hex": 'The "userId" must be a hexadecimal string',
      "string.length": 'The "userId" must be 24 characters long',
    }),
    itemId: Joi.string().hex().length(24).messages({
      "string.hex": 'The "itemId" must be a hexadecimal string',
      "string.length": 'The "itemId" must be 24 characters long',
    }),
  }),
});

module.exports.validateURL = validateURL;
