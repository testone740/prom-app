import express from 'express';
import * as promClient from '@prometheus-io/client';

const app = express();
const PORT = process.env.PORT || 3000;

// Collect default system metrics
// const collectDefaultMetrics = promClient.collectDefaultMetrics;
// collectDefaultMetrics({
//   // labels: { NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE || 'MY_PROM_APP' },
//   timeout: 5000,
// });

// Collect custom metrics
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

// Middleware to track requests
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('===> Request path:', req.path);
    console.log('===> Response code:', res.statusCode);
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc(1);
    console.log('\n');
  });

  next();
});

// http://localhost:3000
app.get('/', (req, res) => {
  res.send('Hello from NodeJS + Express');
});

// http://localhost:3000/api/hello
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from NodeJS API' });
});

// Metrics endpoint: http://localhost:3000/metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Node.js is running on http://localhost:${PORT}`);
});
