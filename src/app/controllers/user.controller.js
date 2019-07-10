import Joi from 'joi';
import { hashSync } from 'bcrypt';
import { extend, pick } from 'lodash';

import User from '@app/models/user.model';

const userSchema = Joi.object().keys({
  fullName: Joi.string(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  country: Joi.string(),
  isSubscribeNewsletter: Joi.bool(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});
const UPDATE_USER_WHITELIST_FIELDS = ['fullName', 'mobileNumber', 'password', 'isActive'];

async function addNewUser(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  // eslint-disable-next-line require-atomic-updates
  user.hashedPassword = hashSync(user.password, 10);

  delete user.password;

  return await new User(user).save();
}

async function updateUserInfo(req) {
  let updatingUser = req.user;
  updatingUser = extend(updatingUser, pick(req.body, UPDATE_USER_WHITELIST_FIELDS));

  if (updatingUser.password) {
    updatingUser.hashedPassword = hashSync(updatingUser.password, 10);
    delete updatingUser.password;
  }

  updatingUser.updatedAt = new Date();

  const result = await User.updateOne({ email: updatingUser.email }, updatingUser);
  if (result && result.ok) {
    return {
      ...updatingUser,
      hashedPassword: undefined
    };
  } else {
    throw new Error('Update user failed');
  }
}

export { addNewUser, updateUserInfo };