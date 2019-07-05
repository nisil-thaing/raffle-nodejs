import { Router } from 'express';
import passport from 'passport';

import tryCatchAsyncHandler from '@app/utils/trycatch-async-handler.util';
import { userCtrl } from '@app/controllers';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
  .post(tryCatchAsyncHandler(updateUserInfo));

async function updateUserInfo(req, res) {
  const user = await userCtrl.updateUserInfo(req);
  res.json(user);
}

export default router;