const express = require('express');
const router = express.Router();
const orderQueue = require('../services/queue');
const breaker = require('../services/circuitBreaker');

router.post('/', async (req, res) => {
  const payment = await breaker.fire(req.body);

  if (payment.includes("Failed")) {
    await orderQueue.add(req.body);
    return res.send("Order queued due to payment failure");
  }

  res.send("Order successful");
});

module.exports = router;