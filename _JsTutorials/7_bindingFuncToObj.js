let person={
    name:"tony",
    getName:function(){
        console.log('this in anonymous',this)
        return "name: "+this.name
    }
}

let {getName}= person;
// console.log(this);
console.log('getName before bind',getName())   //--> this refers to global object here .....in browser --> window is global object
let getName2=getName.bind(person) //this will bind the object to the function and return new function
console.log('getName after bind',getName2())


// VIMP : to bind object to another object use bind() which returns new object

