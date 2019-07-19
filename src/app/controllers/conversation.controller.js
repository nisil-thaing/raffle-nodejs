import Joi from 'joi';
import { extend, pick } from 'lodash';

import Conversation from '@app/models/conversation.model';

const conversationSchema = Joi.object().keys({
  name: Joi.string(),
  joiningUserIds: Joi.array().items(Joi.string()),
  messages: Joi.array().items(Joi.object({
    userId: Joi.string().required(),
    text: Joi.string()
  }))
});
const UPDATE_CONVERSATION_WHITELIST_FIELDS = [
  'name',
  'joiningUserIds',
  'messages'
];

export async function getUserConversationList(hostUserId) {
  return await Conversation.find({ hostUserId });
}

export async function addNewUserConversation(hostUserId, conversation) {
  conversation = await Joi.validate(conversation, conversationSchema, { abortEarly: false });
  // eslint-disable-next-line require-atomic-updates
  conversation.hostUserId = hostUserId;

  return await new Conversation(conversation).save();
}

export async function updateUserConversation(hostUserId, conversationId, reqUpdatingConversation) {
  let updatingConversation = await Conversation.findOne({ hostUserId, _id: conversationId });

  if (!updatingConversation) {
    throw new Error('Conversation is not found!');
  } else {
    updatingConversation = extend(updatingConversation, pick(reqUpdatingConversation, UPDATE_CONVERSATION_WHITELIST_FIELDS));
    updatingConversation.updatedAt = new Date();

    const result = await Conversation.updateOne({ _id: conversationId }, updatingConversation);
    if (result && result.ok) {
      return updatingConversation;
    } else {
      throw new Error('Update conversation failed!');
    }
  }
}