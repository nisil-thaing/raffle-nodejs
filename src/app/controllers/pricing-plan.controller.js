import PricingPlan from '@app/models/pricing-plan.model';

export async function getPricingPlanList() {
  return await PricingPlan.find({});
}