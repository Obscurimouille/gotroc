import express from 'express';
import OfferController from '../controllers/offer-controller';
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await OfferController.getAll();
  res.status(result.code || 200).json(result);
});

router.get('/recommendations/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await OfferController.getRecommendationsForOffer(id);
  res.status(result.code || 200).json(result);
});

router.get('/search', async (req, res) => {
  const subCategoryName = req.query.subCategoryName as string;
  const rawText = req.query.rawText as string;
  const mainCategoryName = req.query.mainCategoryName as string;

  const result = await OfferController.search({ subCategoryName, rawText, mainCategoryName });
  res.status(result.code || 200).json(result);
});

router.get('/user/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await OfferController.getByAuthorId(id);
  res.status(result.code || 200).json(result);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await OfferController.getById(id);
  res.status(result.code || 200).json(result);
});

export default router;
