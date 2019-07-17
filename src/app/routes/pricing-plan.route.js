import { Router } from 'express';

import tryCatchAsyncHandler from '@app/utils/trycatch-async-handler.util';
import * as pricingPlanCtrl from '@app/controllers/pricing-plan.controller';

const router = Router();

router.route('/')
  .get(tryCatchAsyncHandler(getPricingPlanList));

async function getPricingPlanList(req, res) {
  try {
    const pricingPlans = await pricingPlanCtrl.getPricingPlanList();
    res.json(pricingPlans);
  } catch (err) {
    res.status(500).send(err);
  }
}

export default router;