function f1(){
    return ()=>{
        console.log(1);
    }
}

function f2(f3_){
    return new Promise((resolve,reject)=>{
        console.log(2);
        resolve(f3_());
    })
}

function f3(){
    return ()=>{
        console.log(3);
    }
}

// f1()();
// f2(f3).then((resultOfPromise)=>{
//     resultOfPromise();
// });

// f3()();

//--------------- chaining then ---------
f2(f3).then((resultOfPromise)=>{
    resultOfPromise();
    return ()=>{console.log("then use");};
}).then((result)=>{
    result();
});
