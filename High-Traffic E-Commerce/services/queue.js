const Queue = require('bull');

const orderQueue = new Queue('orders', {
  redis: { host: '127.0.0.1', port: 6379 }
});

orderQueue.process(async (job) => {
  console.log("Processing order:", job.data);
});

module.exports = orderQueue;