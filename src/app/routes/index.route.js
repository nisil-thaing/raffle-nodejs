import { Router } from 'express';

import authRoutes from './auth.route';
import userRoutes from './user.route';
import raffleRoutes from './raffle.route';
import pricingPlanRoutes from './pricing-plan.route';
import conversationRoutes from './conversation.route';

const router = Router();

router.get('/health-check', (req, res) => {
  res.send('OK! Lets go');
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/raffle', raffleRoutes);
router.use('/pricing-plan', pricingPlanRoutes);
router.use('/conversation', conversationRoutes);

export default router;
