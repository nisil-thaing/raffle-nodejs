import { Router } from 'express';
import passport from 'passport';

import tryCatchAsyncHandler from '@app/utils/trycatch-async-handler.util';
import * as conversationCtrl from '@app/controllers/conversation.controller';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

router.route('/')
  .get(tryCatchAsyncHandler(getUserConversationList))
  .post(tryCatchAsyncHandler(addNewUserConversation));

router.route('/:id')
  .put(tryCatchAsyncHandler(updateUserConversation));

async function getUserConversationList(req, res) {
  try {
    const conversations = await conversationCtrl.getUserConversationList(req.user._id);
    res.json(conversations);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function addNewUserConversation(req, res) {
  try {
    const conversation = await conversationCtrl.addNewUserConversation(req.user._id, req.body);
    res.json(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateUserConversation(req, res) {
  try {
    const conversation = await conversationCtrl
      .updateUserConversation(req.user._id, req.params.id, req.body);
    res.json(conversation);
  } catch (err) {
    res.status(500).send(err);
  }
}

export default router;