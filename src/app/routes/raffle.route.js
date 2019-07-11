import { Router } from 'express';
import passport from 'passport';

import tryCatchAsyncHandler from '@app/utils/trycatch-async-handler.util';
import * as raffleCtrl from '@app/controllers/raffle.controller';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
  .get(tryCatchAsyncHandler(getRaffleList))
  .post(tryCatchAsyncHandler(addNewRaffleItem));

router.route('/:id')
  .get(tryCatchAsyncHandler(getRaffleItem))
  .put(tryCatchAsyncHandler(updateRaffleItem))
  .delete(tryCatchAsyncHandler(deleteRaffleItem));

async function getRaffleList(req, res) {
  try {
    const raffle = await raffleCtrl.getRaffleList(req.user._id);
    res.json(raffle);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getRaffleItem(req, res) {
  try {
    const raffle = await raffleCtrl.getRaffleItem(req.user._id, req.params.id);
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

async function deleteRaffleItem(req, res) {
  req.body = {
    isActive: false
  };

  try {
    const raffle = await raffleCtrl.updateRaffleItem(req);
    res.json(raffle);
  } catch (err) {
    res.status(500).send(err);
  }
}

export default router;