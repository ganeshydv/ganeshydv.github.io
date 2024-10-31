function f1(){
    // setTimeout(()=>{console.log("1st func");},3000)
    console.log(1);
}

async function f2(f3_){
     await setTimeout(()=>{
        console.log(2.1);
        // f3_();
    },2000)
    
    console.log(2)
}

function f3(){
    // f2_();
    console.log(3);
}

f1();
f2(f3);
// f3();