require('dotenv').config();
const express = require("express");
const app=express();
const jwt=require('jsonwebtoken');

app.use(express.json());
let tokesn=[];
app.post('/token',(req,resp)=>{
    const refreshToken =req.body.token;
    if(refreshToken==null)return resp.statusCode(401);
    if(!tokesn.includes(refreshToken)) return resp.statusCode(403);
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,body)=>{
        if(err)return resp.statusCode(403);
        const accessToken=generateAccessTOken({name:body.user})
        resp.json({accessToken:accessToken})
    })

})


app.post('/login',(req,resp)=>{
    //auth user for first time

    //give jwt
    const userNAme=req.body.userName;
    console.log(req.body);
    const jwtPayload ={
        user:userNAme
    }
    const accessToken=generateAccessTOken(jwtPayload);
    const refreshToken=jwt.sign(jwtPayload,process.env.REFRESH_TOKEN_SECRET);
    tokesn.push(refreshToken)
    resp.json( {accessToken:accessToken,refreshToken:refreshToken});

})

function generateAccessTOken(jwtPayload){
    return jwt.sign(jwtPayload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"20s"});
    
}
app.listen(4000,()=>{
    console.log("server 2 running on port 4000");
})