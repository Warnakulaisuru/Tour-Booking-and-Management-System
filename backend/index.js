const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("./models/User.js");
const CookieParser = require('cookie-parser');
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'safhskfhgsfhgskfhgsfhgsdfha';

app.use(express.json());
app.use(CookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
    res.json("test ok");
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {email,password}= req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if(passOk){
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err,token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        }else{
            res.status(422).json('Invalid email or password');
        }
    }else{
        res.status(404).json('User not found');
    }
});

app.get('/profile',(req,res) => {
    const{token} = req.cookies;
    if (token){
        jwt.verify(token,jwtSecret, {},async (err, userData) => {
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
});

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

app.listen(4000);
