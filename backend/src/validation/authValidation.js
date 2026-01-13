//  import Joi from "joi";
// export const registerShema=Joi.object({
//   nameUser:Joi.string().min(3).max(30).required(),
//     email:Joi.string().min().required(),
// password:Joi.string().string(6).required(),
//  Genre:Joi.string().string().required(),
// role:Joi.string().string().required(),
// });

// export const loginSchema = Joi.object({
//   nameUser: Joi.string().required(),
//   password: Joi.string().required(),
// });

import Joi from "joi";

export const registerSchema = Joi.object({
  nameUser: Joi.string().min(3).max(30).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  Genre: Joi.string().required(),
   role: Joi.string().required(),
});

export const loginSchema = Joi.object({
  nameUser: Joi.string().required(),
  password: Joi.string().required(),
});
