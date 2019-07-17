import { Router } from 'express';

import authRoutes from './auth.route';
import userRoutes from './user.route';
import raffleRoutes from './raffle.route';
import pricingPlanRoutes from './pricing-plan.route';

const router = Router();

router.get('/health-check', (req, res) => {
  res.send('OK! Lets go');
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/raffle', raffleRoutes);
router.use('/pricing-plan', pricingPlanRoutes);

export default router;
