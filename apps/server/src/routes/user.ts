import express from 'express';
import UserController from '../controllers/user-controller.js';
const router = express.Router();

router.get('/', async (_, res) => {
  const result = await UserController.getAll();
  res.status(result.code || 200).json(result);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await UserController.getById(id);
  res.status(result.code || 200).json(result);
});

export default router;