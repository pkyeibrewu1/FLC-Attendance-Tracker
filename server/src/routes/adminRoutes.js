import express from 'express';
import { comparePassword } from '../utils/password.js';

const router = express.Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'FLC Atlanta';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

const handleAdminLogin = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (!ADMIN_PASSWORD_HASH) {
    return res.status(500).json({ message: 'Admin password is not configured on the server.' });
  }

  const isValidUser = username === ADMIN_USERNAME;
  const isValidPassword = await comparePassword(password, ADMIN_PASSWORD_HASH);

  if (!isValidUser || !isValidPassword) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  return res.json({ success: true, message: 'Login successful.' });
};

router.post('/', handleAdminLogin);
router.post('/login', handleAdminLogin);

export default router;
