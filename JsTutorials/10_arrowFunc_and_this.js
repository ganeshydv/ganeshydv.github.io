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


// in arrow function {this} (not METHOD -property of object) refers to global object and in browser to window object always even in STRICT mode
// in method (not arrow function )(of object) this always will refer to the one which calls the method... not necessary to the object of which the method is property...