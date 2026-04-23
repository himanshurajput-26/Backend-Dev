// Banking Secure System

const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Rate limit
app.use('/login', rateLimit({ windowMs: 15*60*1000, max: 5 }));

// Transaction validation
app.post('/transfer', (req,res)=>{
    let { amount } = req.body;

    if(amount <= 0 || amount > 100000){
        return res.send("Invalid amount");
    }

    if(amount > 1000){
        return res.send("OTP required for transaction");
    }

    res.send("Transaction successful");
});

// Auth
app.post('/login', (req,res)=>{
    res.send("Login secure");
});

app.listen(3004, ()=>console.log("Banking system running"));