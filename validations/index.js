const Joi = require("joi");

const validateSignup = (data) => {
  const schema = Joi.object({
    surname: Joi.string().required(),
    othernames: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    repeat_password: Joi.string(),
    gender: Joi.string(),
    dob: Joi.string().required(),
    state_of_origin: Joi.string(),
    nin: Joi.string().required().min(11),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};
// const validateFaq = (data) => {
//   const validateFaqSchema = Joi.object({
//     title: joi.string().require(),
//     body: joi.string().require(),
//   });
//   return validateFaqSchema.validate(data);
// };

// const validateTransaction = (data) => {
//     const transactionSchema = Joi.object({
//         transaction_type: joi.enum().required(),
//         amount: joi.string().required(),
//         comment: joi.text()

//     })
//     return transactionSchema.validate(data)
// }

// const validateComplain = (data) => {
//   const createComplainSchema = Joi.object({
//     name: joi.string().require(),
//     email: joi.string().email().require(),
//     messages: joi.string().require(),
//   });
//   return createComplainSchema.validate(data);
// };
module.exports = { validateSignup, validateLogin };
