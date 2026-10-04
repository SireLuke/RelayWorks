import { Router } from 'express';
import { AuthService } from '../services/AuthService';

const router = Router();

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // In a real system, you'd fetch the user from the database.
  // For now, we simulate a user until the DB is wired up.
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

// REGISTER (admin-only later)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  const passwordHash = await AuthService.hashPassword(password);

  // Later: save to database
  const newUser = {
    id: 'new-id',
    email,
    passwordHash,
    role
  };

  res.json({ message: 'User registered', user: newUser });
});

export default router;
Implement basic login and register routes
