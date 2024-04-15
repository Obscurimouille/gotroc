import express from 'express';
import UserController from '../controllers/user-controller.js';
import { reply } from '../controllers/utils.js';
import { authenticatedMiddleware } from '../middlewares/authenticated.js';
const router = express.Router();

router.get('/', async (_, res) => {
  const result = await UserController.getAll();
  reply(res, result);
});

router.put('/profile/', authenticatedMiddleware, async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const user = req.context.user!;
  const result = await UserController.modifyProfile(user, { firstname, lastname, email });
  reply(res, result);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await UserController.getById(id);
  reply(res, result);
});

export default router;