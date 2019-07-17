import { Schema, model } from 'mongoose';

const PricingPlanSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: { type: Number, default: 0 },
  packagePlans: {
    type: [{
      type: String
    }],
    default: []
  }
});

export default model('PricingPlan', PricingPlanSchema);