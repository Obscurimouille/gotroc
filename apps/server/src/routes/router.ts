import express from 'express';
import OffersRouter from './offer/offer.js';
import UserRouter from './user/user.js';
import AuthRouter from './user/auth.js';
import CategoryRouter from './offer/category.js';
import RatingRouter from './user/rating.js';
import { authenticateMiddleware } from '../middlewares/authenticate.js';
const router = express.Router();

// Authenticate the user if possible
router.use(authenticateMiddleware);

router.use('/offer', OffersRouter);
router.use('/category', CategoryRouter);
router.use('/user', UserRouter);
router.use('/auth', AuthRouter);
router.use('/rating', RatingRouter);

router.get('/', async (_, res) => {
  res.send('Welcome to GoTroc API');
});

export default router;