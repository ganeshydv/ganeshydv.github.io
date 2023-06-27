let person={
    name:"",
    lastName:"",
    greet:function(){
        return this.name +" - "+ this.lastName;
    }
}

let tony=Object.create(person);
tony.name="tony";
tony.lastName="stark";
console.log(tony.greet())
let jack=Object.create(person);
jack.name="jack";
jack.lastName="sparrow"
console.log(jack.greet())



// so sole difference between Object.create() and new is that in Object.create() it will inherit from prototype object while in new it will from parent object

// ChatGPT
// Not exactly. When you use new to create an object from a constructor function, the new object is created with its own properties, in addition to inheriting properties from the constructor function's prototype object.

// When you use Object.create() to create a new object, the new object only inherits properties from the specified prototype object, but does not have its own properties


// modifications to the prototype object will be reflected in all objects that inherit from that prototype object, whether they were created using Object.create() or the new keyword.


// So to summarize, calling Object.create() creates a new object that inherits from a specified prototype object every time it is called, even if the same prototype object is used multiple times.