import express from 'express';
import OffersRouter from './offer.js';
import UserRouter from './user.js';
import AuthRouter from './auth.js';
const router = express.Router();

router.use('/offer', OffersRouter);
router.use('/user', UserRouter);
router.use('/auth', AuthRouter);

router.get('/', async (_, res) => {
  res.send('Welcome to GoTroc API');
});

export default router;