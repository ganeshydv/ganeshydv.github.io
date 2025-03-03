// function declaration approach
hello()
// function definition approach
// named function
function hello(){
    console.log("hello function");
}



// hello_exp();      //  <---- This will give Error.

// function expression approach
// anonymous function
const hello_exp=function (){ 
    console.log("hello expression");
}

// arrow function approach
// anonymous function
const hello_arrow=()=>{
    console.log("hello arrow");
}

hello_arrow();  

// iief approach
// anonymous function
(function(){
    console.log("hello iief");
})();


//
