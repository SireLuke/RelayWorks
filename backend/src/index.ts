import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('RelayWorks API is running');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
Add initial backend server entry point
