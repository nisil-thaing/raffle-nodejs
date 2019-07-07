import { Router } from 'express';
import passport from 'passport';

import tryCatchAsyncHandler from '@app/utils/trycatch-async-handler.util';
import * as raffleCtrl from '@app/controllers/raffle.controller';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

router
  .get('/', tryCatchAsyncHandler(getRaffleList))
  .post('/', tryCatchAsyncHandler(addNewRaffleItem))
  .put('/:id', tryCatchAsyncHandler(updateRaffleItem));

async function getRaffleList(req, res) {
  try {
    const raffle = await raffleCtrl.getRaffleList();
    res.json(raffle);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function addNewRaffleItem(req, res) {
  try {
    const raffle = await raffleCtrl.addNewRaffleItem(req.user, req.body);
    res.json(raffle);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateRaffleItem(req, res) {
  try {
    const raffle = await raffleCtrl.updateRaffleItem(req);
    res.json(raffle);
  } catch (err) {
    res.status(500).send(err);
  }
}

export default router;