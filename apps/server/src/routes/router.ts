import express from 'express';
import OffersRouter from './offer.js';
import UserRouter from './user.js';
import AuthRouter from './auth.js';
import CategoryRouter from './category.js';
import { authenticateMiddleware } from '../middlewares/authenticate.js';
const router = express.Router();

// Authenticate the user if possible
router.use(authenticateMiddleware);

router.use('/offer', OffersRouter);
router.use('/category', CategoryRouter);
router.use('/user', UserRouter);
router.use('/auth', AuthRouter);

router.get('/', async (_, res) => {
  res.send('Welcome to GoTroc API');
});

export default router;