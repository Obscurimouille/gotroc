import express from 'express';
import AuthController from '../../controllers/auth-controller.js';
import { reply } from '../../controllers/utils.js';
const router = express.Router();

router.get('/', async (req, res) => {
  if (req.context.user) {
    return reply(res, { success: true, data: req.context.user });
  }
  reply(res, { success: false, message: 'User not authenticated' });
});

router.get('/isEmailAvailable', async (req, res) => {
  const { email } = req.query;
  const result = await AuthController.isEmailAvailable(String(email));
  reply(res, result);
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const result = await AuthController.register({ username, email, password });
  if (result.success && result.data.token) {
    res.cookie('token', result.data.token, { httpOnly: true, sameSite: 'lax' });
  }
  reply(res, result);
});

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;
  const result = await AuthController.login({ identifier, password });
  if (result.success && result.data.token) {
    res.cookie('token', result.data.token, { httpOnly: true, sameSite: 'lax' });
  }
  reply(res, result);
});

router.all('/logout', async (_, res) => {
  try {
    res.clearCookie('token');
    reply(res, { success: true, message: 'User logged out successfully' });
  } catch (error) {
    reply(res, { success: false, message: 'Failed to log out user' });
    console.error(error);
  }
});

export default router;
