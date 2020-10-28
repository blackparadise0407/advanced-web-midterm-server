const joi = require("joi");

module.exports.registerValSchem = joi.object({
  username: joi.string().max(255).required().messages({
    "string.empty": `Username cannot be an empty field`,
    "string.max": `Username should have a maximum length of {#limit}`,
    "any.required": `Username is required`,
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": `Email cannot be empty`,
      "string.email": `Email is invalid`,
      "any.required": `Email is required`,
    }),
  password: joi.string().min(3).max(20).required().messages({
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should have a minumum length of {#limit}`,
    "string.max": `Password should have a maximum length of {#limit}`,
    "any.required": `Password is required`,
  }),
});

module.exports.loginValSchem = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.empty": `Email cannot be empty`,
      "string.email": `Email is invalid`,
      "any.required": `Email is required`,
    }),
  password: joi.string().min(3).max(20).required().messages({
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should have a minumum length of {#limit}`,
    "string.max": `Password should have a maximum length of {#limit}`,
    "any.required": `Password is required`,
  }),
});
