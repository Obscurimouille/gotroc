import express from 'express';
import OfferController from '../controllers/offer-controller.js';
const router = express.Router();
import { authenticatedMiddleware } from '../middlewares/authenticated.js';
import { reply } from '../controllers/utils.js';
import { OfferImageUploadStrategy } from '../storage/strategies.js';
import BookmarkController from '../controllers/bookmark-controller.js';

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

router.get('/', async (req, res) => {
  const user = req.context.user || null;
  const result = await OfferController.getAll(user);
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

router.get('/recommendations', async (req, res) => {
  const user = req.context.user || null;
  const limit = Number(req.query.limit);
  const result = await OfferController.getRecommendations(user, limit);
  reply(res, result);
});

router.get('/recommendations/:id', async (req, res) => {
  const user = req.context.user || null;
  const id = Number(req.params.id);
  const result = await OfferController.getRecommendationsForOffer(id, user);
  reply(res, result);
});

router.get('/search', async (req, res) => {
  const user = req.context.user || null;
  const subCategoryName = req.query.subCategoryName as string;
  const rawText = req.query.rawText as string;
  const mainCategoryName = req.query.mainCategoryName as string;

  const result = await OfferController.search({ subCategoryName, rawText, mainCategoryName }, user);
  reply(res, result);
});

router.get('/user/:id', async (req, res) => {
  const user = req.context.user || null;
  const id = Number(req.params.id);
  const result = await OfferController.getByAuthorId(id, user);
  reply(res, result);
});

router.get('/bookmarked', authenticatedMiddleware, async (req, res) => {
  const user = req.context.user!;
  const result = await OfferController.getBookmarked(user);
  reply(res, result);
});

router.post('/:id/bookmark/toggle', authenticatedMiddleware, async (req, res) => {
  const user = req.context.user!;
  const offerId = Number(req.params.id);
  const result = await BookmarkController.toggle(offerId, user);
  reply(res, result);
});

router.get('/:id', async (req, res) => {
  const user = req.context.user || null;
  const id = Number(req.params.id);
  const result = await OfferController.getById(id, user);
  reply(res, result);
});

export default router;
