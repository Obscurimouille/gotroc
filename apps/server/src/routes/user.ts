import express from 'express';
import UserController from '../controllers/user-controller.js';
import { reply } from '../controllers/utils.js';
import { authenticatedMiddleware } from '../middlewares/authenticated.js';
import { AvatarUploadStrategy } from '../storage/strategies.js';
import { FileRef } from '../providers/file-reference.js';
const router = express.Router();

router.get('/', async (_, res) => {
  const result = await UserController.getAll();
  reply(res, result);
});

router.put(
  '/profile/',
  authenticatedMiddleware,
  AvatarUploadStrategy.fields([
    { name: 'avatar', maxCount: 1 },
    {
      name: 'firstname',
    },
    {
      name: 'lastname',
    },
    {
      name: 'email',
    },
  ]),
  async (req, res) => {
    const avatarRef: FileRef | null = req.context.storage ? req.context.storage[0] : null;
    req.context.storage = [];

    const { firstname, lastname, email } = req.body;
    const user = req.context.user!;
    const result = await UserController.modifyProfile(user, { avatarRef: avatarRef, firstname, lastname, email });
    reply(res, result);
  },
);

router.get('/avatar/:uuid', async (req, res) => {
  const uuid = req.params.uuid;
  const result = await UserController.getImage(uuid);
  if (result.success) {
    return res.sendFile(result.data.path);
  }
  reply(res, result);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await UserController.getById(id);
  reply(res, result);
});

export default router;
