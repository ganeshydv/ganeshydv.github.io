// "use strict;"
let p={
    name:"tony",
    age:20,
    getName:()=>{console.log(this)},
    getAge:function(){console.log(this)}
}
let {getName}=p;   //--> took a property out of object 
let {getAge}=p;

getName.call(p);   //--> assigned this of getName to object p
getAge.call(p)


// in arrow function {this} refers to global object and in browser to window object