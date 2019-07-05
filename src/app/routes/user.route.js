import { Router } from 'express';
import passport from 'passport';

import tryCatchAsyncHandler from '@app/utils/trycatch-async-handler.util';
import { userCtrl } from '@app/controllers';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
  .post(tryCatchAsyncHandler(updateUserInfo))
  .delete(tryCatchAsyncHandler(inactiveUserAccount));

async function updateUserInfo(req, res) {
  try {
    const user = await userCtrl.updateUserInfo(req);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function inactiveUserAccount(req, res) {
  try {
    req.body = { isActive: false };
    const user = await userCtrl.updateUserInfo(req);
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

export default router;