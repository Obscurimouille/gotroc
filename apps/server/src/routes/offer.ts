import express from 'express';
import OfferController from '../controllers/offer-controller.js';
const router = express.Router();
import { authenticatedMiddleware } from '../middlewares/authenticated.js';
import { reply } from '../controllers/utils.js';
import { OfferImageUploadStrategy } from '../storage/strategies.js';

router.post(
  '/',
  authenticatedMiddleware,
  OfferImageUploadStrategy.fields([
    { name: 'images', maxCount: 5 },
    {
      name: 'title',
    },
    {
      name: 'description',
    },
    {
      name: 'price',
    },
    {
      name: 'subCategoryName',
    },
  ]),
  async (req, res) => {
    const imageRefs = req.context.storage || [];
    req.context.storage = [];

    const result = await OfferController.create(
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        subCategoryName: req.body.subCategoryName,
        images: imageRefs,
      },
      req.context.user!,
    );
    reply(res, result);
  },
);

router.get('/', async (_, res) => {
  const result = await OfferController.getAll();
  reply(res, result);
});

router.get('/image/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const result = await OfferController.getImage(uuid);
  if (result.success) {
    return res.sendFile(result.data.path);
  }
  reply(res, result);
});

router.get('/recommendations/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await OfferController.getRecommendationsForOffer(id);
  reply(res, result);
});

router.get('/search', async (req, res) => {
  const subCategoryName = req.query.subCategoryName as string;
  const rawText = req.query.rawText as string;
  const mainCategoryName = req.query.mainCategoryName as string;

  const result = await OfferController.search({ subCategoryName, rawText, mainCategoryName });
  reply(res, result);
});

router.get('/user/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await OfferController.getByAuthorId(id);
  reply(res, result);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await OfferController.getById(id);
  reply(res, result);
});

export default router;
