import express from 'express';
import OfferController from '../controllers/offer-controller';
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await OfferController.getAll();
  res.status(result.code || 200).json(result);
});

export default router;