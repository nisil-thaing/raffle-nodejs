import { Router } from 'express';

import authRoutes from './auth.route';
// import userRoutes from './user.route';

const router = Router();

router.get('/health-check', (req, res) => {
  res.send('OK! Lets go');
});

router.use('/auth', authRoutes);
// router.use('/user', userRoutes);

export default router;
