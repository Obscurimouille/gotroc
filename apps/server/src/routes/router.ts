import express from 'express';
import OffersRouter from './offer';
import UserRouter from './user';
const router = express.Router();

router.use('/offer', OffersRouter);
router.use('/user', UserRouter);

router.get('/', async (req, res) => {
  res.send('Welcome to GoTroc API');
});

export default router;