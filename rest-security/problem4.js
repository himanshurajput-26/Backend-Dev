// Healthcare Secure System

const express = require('express');
const validator = require('validator');

const app = express();
app.use(express.json());

// Auth check
const auth = (req,res,next)=>{
    if(!req.headers.user) return res.send("Unauthorized");
    next();
};

// Secure date validation
app.post('/appointment', auth, (req,res)=>{
    let { date } = req.body;

    if(!validator.isISO8601(date)){
        return res.send("Invalid date");
    }

    res.send("Appointment booked safely");
});

// Access control
app.get('/records/:id', auth, (req,res)=>{
    if(req.headers.user !== req.params.id){
        return res.send("Access denied");
    }
    res.send("Medical records");
});

app.listen(3003, ()=>console.log("Healthcare running"));