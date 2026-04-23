// Social Media Secure API

const express = require('express');
const validator = require('validator');
const session = require('express-session');

const app = express();
app.use(express.json());

// Session expiry
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30*60*1000 }
}));

// Register
app.post('/register', (req,res)=>{
    let { email, bio } = req.body;

    if(!validator.isEmail(email)){
        return res.send("Invalid email");
    }

    bio = validator.escape(bio);

    res.send("User Registered Safely");
});

// Post creation (XSS safe)
app.post('/post', (req,res)=>{
    let content = validator.escape(req.body.content);
    res.send("Safe Post: " + content);
});

app.listen(3001, ()=>console.log("Social API running"));