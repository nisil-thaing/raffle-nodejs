import { Router } from 'express';
import passport from 'passport';

import tryCatchAsyncHandler from '@app/utils/trycatch-async-handler.util';
import { userCtrl, authCtrl } from '@app/controllers';

const router = Router();

router
  .post('/register', tryCatchAsyncHandler(register), login)
  .post('/login', passport.authenticate('local', { session: false }), login)
  .get('/me', passport.authenticate('jwt', { session: false }), login);

async function register(req, _, next) {
  const user = await userCtrl.addNewUser(req.body);
  const userObj = user.toObject();
  delete userObj.hashedPassword;
  req.user = userObj;
  next();
}

function login(req, res) {
  const user = req.user;
  const token = authCtrl.generateToken(user);

  res.json({
    user,
    token
  });
}

export default router;