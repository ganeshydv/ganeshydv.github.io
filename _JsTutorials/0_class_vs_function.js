

// both class and function have same purpose 
// but when adding properties to a funcion and class there is difference
// in case of class : 
// when a method is defined it will be added to a Prototype object directly unless it is diffined in constructor or define using short hand==> let x=function(){}

// in case of Constructor function :
// we have to define method on prototype or else it will be added to Function object not to prototype

// why to add a method on prototype ?
// to save space ... HOW ==> when a method or property deifned on Prototype it will be same for every instance that is being created from THe object
// it means if p1,p2 are instances of object Person then Person.prototype.getName() will be same for both p1 and p2 and never new getName() method will be created for every instance of Person

// Now prototype is only available in Function but not in CLASS why ? -=> it's available on both
// but class it will be done by js/v8 internally(I think) so there is no need of doing it so there is no prototype object present on class

//what is use of __proto__ ?
// first __proto__ is a object which is present in CLASS,FUNCTION,LIteral  ==> It is REFERENCES to PROTOTYPE object
// used for inheritance but how ?
// every __proto__ has 1) constructor 2) __proto__ (which actually refers to [[prototype]] object of parent or itself if not extended or set) property and function has one extra 3_ prototype property
// when object is being creted using NEW it always return this for functions -> this refers to only Object 
// when a method is added to a prototype it will be added on [[prototype]] which us accessed by  __proto__ of ONLY ONLY ONLY INSTANCE and NOT NOT of OBJECT ITSELF i.e.  Person.__proto__ ===Person.prototype ==> FALSE
// and p1.__proto__ === Person.prototype ==> true

function Person(name) {
    this.name = name;
  }
  
  Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}`);
  };
  
const person = new Person('Alice');
  
//   console.log(person.greet); // Output: [Function: greet]
//   console.log(person.__proto__.greet); // Output: [Function: greet]
//   console.log(Object.getPrototypeOf(person).greet); // Output: [Function: greet]
console.dir(Person.prototype)
console.dir(Person)

//--------------------------- class ----------------


class Person1{
  name="g";
  constructor()
  {
    this.greet=function(){                              //---------> this will be created for every instance
      console.log("greet from Person class object");
    }
  }
  greet2=function(){                                    //---------> this will be created for every instance
    console.log("greet2 from Person class object");
  }
  greet3=()=>{                                            //---------> this will be created for every instance
    console("in arrow func this will always refer to object in which it is defined ")
  }

  greet4(){                                         //---------> this will added to Prototype so it will be created once and shared among evry instance
    console.log("greet from Person class object");
  }
}  

class Student extends Person1{
  constructor(){
    super();
  }
}
