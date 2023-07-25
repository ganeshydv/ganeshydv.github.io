// function fun1(func2){
//     console.log("in fun1");
//     setTimeout( func2("in fun2"),2000);
//     console.log("in fun1...");
// }

// function sum(a,b){
//     console.log(a+b);
// }
//-------------------------------------------------


function f1(){
    // setTimeout(()=>{console.log("1st func");},3000)
    console.log(1);
}

function f2(f3_){
    setTimeout(()=>{
        console.log(2.1);
        f3_();
        console.log(2.11);
    },000)

    setTimeout(()=>{
        console.log(2.2);
    },3000);
    // f3_()
    console.log(2)
}

function f3(){
    // f2_();
    console.log(3);
    setTimeout(()=>{  //--> Libuv 
        console.log(3.1);
    },000) 
}

// f1();
// f2();
// f3();

f1()
f2(f3);