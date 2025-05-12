const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  if (!req.body) {
    res.status(200).send({ message: 'Webhook received and processed' });
  }

  const { timeResponse, minTimeResponse, maxTimeResponse, failureRate } = req.body;

  // Determine if the request should fail based on failureRate
  if (failureRate !== undefined && Math.random() < failureRate / 100) {
    return res.status(500).send({ message: 'Webhook failed intentionally' });
  }

  let responseTime = 0;

  if (minTimeResponse !== undefined && maxTimeResponse !== undefined) {
    // Random time between minTimeResponse and maxTimeResponse
    responseTime = Math.random() * (maxTimeResponse - minTimeResponse) + minTimeResponse;
  } else if (timeResponse !== undefined) {
    // Fixed response time
    responseTime = timeResponse;
  }

  setTimeout(() => {
    res.status(200).send({ message: 'Webhook received and processed' });
  }, responseTime);
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook server is running on http://localhost:${port}`);
});