
 
// every function in javascript is closure

//lexical environment vs global environmnet 

// lexical env: local scope of function

function math(){
    var a = 10;
    return function(){
        console.log(a);
    }
}

let a = math();
a(); //10
