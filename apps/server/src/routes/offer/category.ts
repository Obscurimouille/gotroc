import express from 'express';
import CategoryController from '../../controllers/category-controller.js';
import { reply } from '../../controllers/utils.js';
const router = express.Router();

router.get('/', async (_, res) => {
  const result = await CategoryController.getAll();
  reply(res, result);
});

router.get('/sub', async (req, res) => {
  const name = req.query.name as string;
  const result = await CategoryController.getSubByName({ name });
  reply(res, result);
});

router.get('/image/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const result = await CategoryController.getImage(uuid);
  if (result.success) {
    return res.sendFile(result.data.path);
  }
  reply(res, result);
});

export default router;
