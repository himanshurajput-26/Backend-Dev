const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());

app.use(session({
  secret: 'cart-secret',
  resave: false,
  saveUninitialized: false
}));

// Init cart
const initCart = (req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
};

app.use(initCart);

// Add item
app.post('/cart/add', (req, res) => {
  const { productId, price } = req.body;

  const item = req.session.cart.find(i => i.productId === productId);
  if (item) item.quantity++;
  else req.session.cart.push({ productId, price, quantity: 1 });

  res.json(req.session.cart);
});

// Update quantity
app.put('/cart/update/:productId', (req, res) => {
  const item = req.session.cart.find(i => i.productId == req.params.productId);
  if (item) item.quantity = req.body.quantity;

  res.json(req.session.cart);
});

// Remove item
app.delete('/cart/remove/:productId', (req, res) => {
  req.session.cart = req.session.cart.filter(i => i.productId != req.params.productId);
  res.json(req.session.cart);
});

// Get cart
app.get('/cart', (req, res) => {
  const total = req.session.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ cart: req.session.cart, total });
});

app.listen(3000);