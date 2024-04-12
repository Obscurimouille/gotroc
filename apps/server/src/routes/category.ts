import express from 'express';
import CategoryController from '../controllers/category-controller.js';
import { reply } from '../controllers/utils.js';
const router = express.Router();

router.get('/', async (_, res) => {
  const result = await CategoryController.getAll();
  reply(res, result);
});

export default router;
