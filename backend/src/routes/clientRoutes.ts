import { Router } from 'express';

const router = Router();

// Placeholder routes
router.get('/', (req, res) => {
  res.json({ message: 'List all clients (placeholder)' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create a new client (placeholder)' });
});

export default router;
Add client routes placeholder
