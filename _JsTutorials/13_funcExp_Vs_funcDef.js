// function declaration approach
hello()
function hello(){
    console.log("hello");
}



hello_exp();      //  <---- This will give Error.
const hello_exp=function (){
    console.log("hello");
}