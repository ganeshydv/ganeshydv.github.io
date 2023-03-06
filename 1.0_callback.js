
function sum(a,b,callbackFunc){
    let reslt=callbackFunc(a+b);
    console.log(reslt);
}

sum(1,2,(c)=>{
    console.log(c);
    return c;
})