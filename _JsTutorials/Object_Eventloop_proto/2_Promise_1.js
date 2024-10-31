// function sum(a,b){
//     console.log(a+b);
// }

// let f1= function(sum1,a1,b1,x){
//     console.log("inside promise.....");
//     return new Promise((resolve,reject)=>{
//         if(x===1){
//             resolve([sum1,a1,b1]);
//         }else{
//             reject("rejected");
//         }
//     })
// }

// f1(sum,2,3,1).then((result)=>{
//     result[0](result[1],result[2]);
//     console.log("promise1 completed..")
// }).then(()=>{
//     console.log("then 2");
// })


function fun1(){
    return new Promise((resolve,resject)=>{
        setTimeout(()=>{
            resolve("log 1");
        },2000);
        
    });
}

fun1().then((result)=>{
    console.log(result);
})
console.log("log 2")