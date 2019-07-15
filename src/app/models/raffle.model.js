import { Schema, model } from 'mongoose';

const RaffleSchema = new Schema({
  userId: { type: String },
  name: { type: String },
  costPerTicket: {
    type: Number,
    default: 0
  },
  discounts: {
    type: [{
      numOfTickets: Number,
      newCost: Number
    }],
    default: []
  },
  story: {
    type: {
      image: String,
      description: String
    }
  },
  prize: {
    type: {
      title: String,
      image: String,
      description: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  isCollectEntrantAddresses: {
    type: Boolean,
    default: false
  },
  additionalQuestion: { type: String },
  isKeepRaisedAmountPrivate: {
    type: Boolean,
    default: false
  },
  fundRaisingPackageId: { type: String },
  isActive: {
    type: Boolean,
    default: true
  }
});

export default model('Raffle', RaffleSchema);