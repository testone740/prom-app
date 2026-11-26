import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('===> req.path:', req.path);
  res.send('Hello from NodeJS + Express');
});

app.listen(PORT, () => {
  console.log(`Node.js is running on http://localhost:${PORT}`);
});
