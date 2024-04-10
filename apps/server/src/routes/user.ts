import express from 'express';
import UserController from '../controllers/user-controller';
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await UserController.getAll();
  res.status(result.code || 200).json(result);
});

export default router;