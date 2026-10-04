import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('RelayWorks API is running');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
Connect auth routes to server
