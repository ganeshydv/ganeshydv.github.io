const jwt=require('jsonwebtoken');

let token =jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    userId:"20530",
    accountId:115
},"jio")

console.log(token);