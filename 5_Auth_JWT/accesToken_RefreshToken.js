require('dotenv').config();
const express = require("express");
const app=express();
const jwt=require('jsonwebtoken');

const post=[
    {
        name:'jack',
        title:'post 1'
    },
     {
        name:'sparrow',
        title:'post 2'
    }
]
app.use(express.json());

app.get("/posts",authToken,(req,resp)=>{
    console.log(req.user);
    resp.json(post.filter((data)=>{
       
        if(data.name==req.user.user){
            return data;
        }
    }));
})


function authToken(req,resp,next){
    const authHeader=req.headers['authorization'];
    const token= authHeader && authHeader.split(' ')[1];
    if(token == null) return resp.sendStatus(401); // unauthorized
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err)return resp.sendStatus(403); // forbidden as token is not valid
        console.log(user);
        req.user=user;
        next();
    });
}

app.listen(3000,()=>{
    console.log("server running on port 3000");
})