const express = require('express');
const router = express.Router();
const redis = require('../config/redis');

router.get('/', async (req, res) => {
  const cache = await redis.get('products');

  if (cache) {
    return res.json(JSON.parse(cache));
  }

  const products = [{ name: "Laptop" }, { name: "Phone" }];

  await redis.set('products', JSON.stringify(products), 'EX', 60);

  res.json(products);
});

module.exports = router;