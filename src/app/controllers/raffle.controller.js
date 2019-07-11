import Joi from 'joi';
import { extend, pick } from 'lodash';

import Raffle from '@app/models/raffle.model';

const raffleSchema = Joi.object().keys({
  name: Joi.string(),
  costPerTicket: Joi.number(),
  discount: Joi.object().keys({
    numOfTickets: Joi.number(),
    newCost: Joi.number()
  }),
  story: Joi.object().keys({
    image: Joi.string(),
    description: Joi.string()
  }),
  prize: Joi.object().keys({
    title: Joi.string(),
    image: Joi.string(),
    description: Joi.string()
  }),
  endDate: Joi.date(),
  isCollectEntrantAddresses: Joi.bool(),
  additionalQuestion: Joi.string(),
  isKeepRaisedAmountPrivate: Joi.bool(),
  fundRaisingPackageId: Joi.string()
});
const UPDATE_RAFFLE_WHITELIST_FIELDS = [
  'name',
  'costPerTicket',
  'discount',
  'story',
  'prize',
  'endDate',
  'isCollectEntrantAddresses',
  'additionalQuestion',
  'isKeepRaisedAmountPrivate',
  'fundRaisingPackageId',
  'isActive'
];

export async function getRaffleList(userId) {
  return await Raffle.find({ userId, isActive: true });
}

export async function getRaffleItem(userId, _id) {
  return await Raffle.findOne({ userId, _id, isActive: true });
}

export async function addNewRaffleItem(user, raffle) {
  raffle = await Joi.validate(raffle, raffleSchema, { abortEarly: false });
  // eslint-disable-next-line require-atomic-updates
  raffle.userId = user._id;

  return new Raffle(raffle).save();
}

export async function updateRaffleItem(req) {
  const raffleId = req.params.id;
  const user = req.user;
  const userId = user._id;

  let updatingRaffle = await Raffle.findOne({ _id: raffleId, userId });

  if (!updatingRaffle) {
    throw new Error('Update user failed');
  } else {
    updatingRaffle = extend(updatingRaffle, pick(req.body, UPDATE_RAFFLE_WHITELIST_FIELDS));
    updatingRaffle.updatedAt = new Date();

    const result = await Raffle.updateOne({ _id: raffleId }, updatingRaffle);
    if (result && result.ok) {
      return updatingRaffle;
    } else {
      throw new Error('Update user failed');
    }
  }
}