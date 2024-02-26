
function sayHelloAfter2Sec(msg){
    return new Promise((resolve,reject)=>{
        console.log(msg); // this will be executed as synchronous
        setTimeout(() => {
            resolve("hello.."+msg);
        }, 2000);
    })
}

(function fun(){
    console.log("ecxecuing fun1........");
    sayHelloAfter2Sec("from fun1")
    .catch((err)=>{ console.log("error :"+err);})
    .then((data)=>{
        console.log(data);
    })
    console.log("starting function fun1 ");
})();

// --------- Async but make it sync i.e. await   ------

(async function fun2(){
    console.log("ecxecuing fun2........");
    let msg=await sayHelloAfter2Sec("from fun2")
    console.log(msg);
    console.log("starting function fun2 ");
})();

