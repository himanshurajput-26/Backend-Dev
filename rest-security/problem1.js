// E-Commerce Secure App

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// DB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');

// Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/ecommerce' })
}));

// Rate limit
app.use('/login', rateLimit({ windowMs: 15*60*1000, max: 5 }));

// Routes
app.post('/login', (req,res)=> res.send("Login secured"));

app.get('/products', (req,res)=>{
    let price = parseFloat(req.query.price);
    if(isNaN(price)) return res.send("Invalid price");
    res.send("Safe product search");
});

app.post('/review', (req,res)=>{
    let review = DOMPurify.sanitize(req.body.review);
    res.send("Safe Review: " + review);
});

app.listen(3000, ()=>console.log("E-commerce running"));