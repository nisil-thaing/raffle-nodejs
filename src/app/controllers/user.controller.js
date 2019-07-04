import Joi from 'joi';
import { hashSync } from 'bcrypt';

import User from '@app/models/user.model';

const userSchema = Joi.object().keys({
  fullName: Joi.string(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});

async function addNewUser(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = hashSync(user.password, 10);

  delete user.password;

  return await new User(user).save();
}

export { addNewUser };