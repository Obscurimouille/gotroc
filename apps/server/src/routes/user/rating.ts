import express from 'express';
import { reply } from '../../controllers/utils.js';
import RatingController from '../../controllers/rating-controller.js';
const router = express.Router();

router.get('/', async (_, res) => {
  const result = await RatingController.getAll();
  reply(res, result);
});

export default router;
