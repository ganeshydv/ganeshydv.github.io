let person={
    name:"tony",
    getName:function(){
        console.log(this)
        return "name: "+this.name}
}

let {getName}= person;
// console.log(this);
console.log(getName())   //--> this refers to global object here .....in browser --> window is global object
getName=getName.bind(person)
console.log(getName())


// VIMP : to bind object to another object use bind() which returns new object

