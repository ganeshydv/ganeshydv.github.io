

// the main purpose of PROTOTYPE is for searching ... 
// prototype is also a object --'> it always get attached with instacne of an objetct it ,
// 
function Person(){
    this.name="a"
}

let p=new Person();
console.log(p.__proto__.__proto__.toString());
console.log(p.Prototype)
console.log(Person.prototype)
console.log(Person.__proto__)

// differnece between __proto__ and Prototype

//1) __proto__ is object which is property exists on evry object and Prototype is also Object but exists only on functions not on other js objects i.e. on lierals or class
//2) __proto__ is used for searching properties that are not present on object itself --> It allows access to the prototype of an object, providing a reference to the object's parent prototype.
//3) __proto__ ==> this is a real PROTOTYPE --> same for each instance and
//  Prototype ==> not real prototype object --> it's different for every instance  --> for each new instacne it will be created again so it's different
//4) PROTOTYPE: It is not the actual prototype of the function (or Object) itself but rather the prototype of INSTANCE created from that function.