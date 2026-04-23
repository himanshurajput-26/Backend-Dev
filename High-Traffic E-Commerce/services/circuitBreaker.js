const CircuitBreaker = require('opossum');

const paymentService = async (data) => {
  // simulate API call
  return "Payment Success";
};

const breaker = new CircuitBreaker(paymentService, {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 5000
});

breaker.fallback(() => "Payment Failed - Retry Later");

module.exports = breaker;