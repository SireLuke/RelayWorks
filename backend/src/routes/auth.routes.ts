import { Router } from 'express';
import { AuthService } from '../services/AuthService';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const fakeUser = {
    id: '1',
    email: email,
    passwordHash: await AuthService.hashPassword('test123'),
    role: 'admin'
  };

  const passwordMatches = await AuthService.comparePassword(
    password,
    fakeUser.passwordHash
  );

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = AuthService.generateToken(fakeUser);

  res.json({ token });
});

export default router;
