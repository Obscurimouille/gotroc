import express from 'express';
import OffersRouter from './offers';
const router = express.Router();

router.use('/offers', OffersRouter);

router.get('/', (req, res) => {
  res.send('Hello World!');
});

export default router;