import express from 'express';
import authRoutes from './routes/authRoutes';
import clientRoutes from './routes/clientRoutes';

const app = express();
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend structure is working' });
});

// Auth routes
app.use('/auth', authRoutes);

// Client routes
app.use('/clients', clientRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('RelayWorks API is running');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
