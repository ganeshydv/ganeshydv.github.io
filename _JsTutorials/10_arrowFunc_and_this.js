
// "use strict;"
let p={
    name:"tony",
    age:20,
    getName:()=>{console.log(this)},
    getAge:function(){console.log(this)}
}
let {getName}=p;   //--> took a property out of object 
let {getAge}=p;

// getName.call(p);   //--> this will call method immediately....and this will refer to global object
// getAge.call(p) // this will method call of object p

getName=getName.bind(p);  //--> this will bind the object to the function and return new function
getAge=getAge.bind(p);

getName();  //--> this will call the function and this will refer to global object
getAge();   //--> this will call the function and this will refer to object p


// Conclusion:
// in arrow function {this} (not METHOD -property of object) refers to global object and in browser to window object always even in STRICT mode
// in method (not arrow function )(of object) this always will refer to the one which calls the method... not necessary to the object of which the method is property...