// Online Learning Security

const express = require('express');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Role middleware
const authorize = (role) => (req,res,next)=>{
    if(req.headers.role !== role) return res.send("Forbidden");
    next();
};

// File upload security
const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter(req,file,cb){
        if(!file.mimetype.includes('pdf')){
            return cb(new Error("Only PDF allowed"));
        }
        cb(null,true);
    }
});

// Rate limit
app.use('/login', rateLimit({ windowMs: 15*60*1000, max: 5 }));

// Routes
app.post('/upload', upload.single('file'), (req,res)=>{
    res.send("File uploaded securely");
});

app.get('/course', authorize('instructor'), (req,res)=>{
    res.send("Instructor content");
});

app.listen(3002, ()=>console.log("Learning app running"));