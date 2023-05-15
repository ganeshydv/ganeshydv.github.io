
// function sum(a,b,callbackFunc){
//     let reslt=callbackFunc(a+b);
//     console.log(reslt);
// }

// sum(1,2,(c)=>{           // NEVER use a Anonymous function CallBACK cause it will always create a new function space in memory as it's anonymous and it will lead to take more memory sapce and every time it's not possible fot garbage collector to remove this from memory as garbage collector is autonomous and managed by browser
//     console.log(c);
//     return c;
// })    

// // let x=..


(function heloo(){
    localStorage.setItem("name","ganesh")
})();