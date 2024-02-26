

// the main purpose of PROTOTYPE is for searching ... 
// prototype is also a object --'> it always get attached with instacne of an objetct --> It is ONLY for INSTANCE of FUCNTIONS 

//-------------------------------- IMP down -----ALways remember that __proto__ search only on prototype object not on any other Object  ----------------------------------------------------------------
//prototype is used to assign a fallback/parent object while __proto__ is used to fallback to Prototype Object consider Prototype as Home and __proto__ as path....
// always __proto__ refers to a fallback/parent object i.e. [[prototype]] i.e. to prototype 
//[[prototype]] has always 2 properties -> 1) constructor 2) [[prototype]] i.e. __proto__ 
// 1) constructor : copy of object
// 2) [[prototype]] : always refers to Parent Object (refvar.__proto__) 
      // >this object will always have 2 properties:  1) constructor 2) [[prototype]] i.e. prototype (parent object) and this [[prototype]] has
      // > [[parent_prototype]] has constrcutor which aways refers to child object i.e obj.__proto__.constructor

      function Person(){
        this.name="a"
    }
    
    let p=new Person();
    let p2=new p.__proto__.constructor();
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
    //5) PROROTYPE: When a function is used as a constructor with the new keyword, the prototype property is used to create the prototype object of the newly created instance.
    
    
    //---------------------what is difference between __proto__ and Prototype ---------------------------------------------------------------------------------------------------------------------------
    //
    
    // ChatGPT
    // __proto__ and prototype are related but distinct concepts in JavaScript.
    
    // __proto__ (underscore underscore proto underscore underscore):
    
    // __proto__ is a non-standard property that exists on every object in JavaScript.
    // It allows access to the prototype of an object, providing a reference to the object's parent prototype.
    // It is used for the lookup chain to access properties and methods that are not directly present on the object itself.
    // It is considered deprecated and should generally be avoided in favor of the standard Object.getPrototypeOf() and Object.setPrototypeOf() methods.
    // prototype:
    
    // prototype is a property that exists on functions in JavaScript.
    // It is not present on regular objects.
    // It is used in the process of implementing inheritance in JavaScript, particularly when using constructor functions and the new keyword.
    // When a function is used as a constructor with the new keyword, the prototype property is used to create the prototype object of the newly created instance.
    // The prototype property is where methods and properties can be defined to be shared among all instances created by that constructor function.
    // It is not the actual prototype of the function itself but rather the prototype of instances created from that function.
    // In summary, __proto__ is a non-standard property available on all objects that provides a reference to the prototype of the object, whereas prototype is a property available on functions and is used for implementing inheritance and defining shared methods and properties for instances created from that function.
    
    
    
    
    //-------------------------so __proto__ exists on instances of function as well on functions but prototype does not exist on instances but only on functions -----------------------------------------------------------------------------------------------------------------------
    
    // That's correct! Here's a breakdown of the key points:
    
    // __proto__:
    
    // __proto__ exists on both instances of objects and functions in JavaScript.
    // It provides a reference to the prototype of an object or function.
    // Instances of objects inherit the __proto__ property from the prototype of their constructor function.
    // Functions also have their own __proto__ property, which refers to the Function.prototype object.
    // prototype:
    
    // prototype is a property that exists only on functions in JavaScript, not on instances of objects.
    // It is used when creating objects using constructor functions and the new keyword.
    // The prototype property of a function is an object that becomes the prototype for instances created using that function as a constructor.
    // Methods and properties added to the prototype object are shared among all instances created by that constructor function.
    // In summary:
    
    // __proto__ is available on instances of objects and functions, allowing access to the prototype of an individual instance or the prototype of the function itself.
    // prototype is a property that exists on functions and is used for creating the prototype object of instances and sharing methods and properties among those instances.
    // It's worth noting that the __proto__ property is considered deprecated and should be avoided in favor of using the standard methods Object.getPrototypeOf() and Object.setPrototypeOf() for accessing and setting the prototype of an object or instance. Similarly, prototype is specifically used for constructor functions and object inheritance and is not present on regular objects.
    
    
    //---------------------so each instance will have same prototype object as of Functions they are created from ---------------------------------------------------------------------------------------------------------------------------
    
    
    // Yes, that's correct! Instances created from the same constructor function will have the same prototype object.
    
    // When you create multiple instances using a constructor function, all those instances will share the same prototype object. The prototype property of the constructor function is used to define the prototype object, and it becomes the prototype for all instances created from that constructor.
    
    // Here's an example to illustrate this behavior:
    
    // javascript
    // Copy code
    function Person(name) {
      this.name = name;
    }
    
    Person.prototype.greet = function() {
      console.log(`Hello, my name is ${this.name}`);
    };
    
    const person1 = new Person('Alice');
    const person2 = new Person('Bob');
    
    person1.greet(); // Output: Hello, my name is Alice
    person2.greet(); // Output: Hello, my name is Bob
    
    console.log(person1.__proto__ === Person.prototype); // true
    console.log(person2.__proto__ === Person.prototype); // true
    // In the example above, the Person function is used as a constructor to create two instances (person1 and person2). The greet method is defined on the Person.prototype object, which becomes the shared prototype for both instances.
    
    // When calling the greet method on person1 and person2, they both have access to the same greet method defined in the prototype, and the output reflects the name of each instance.
    
    // The last two lines of code demonstrate that the __proto__ property of each instance references the same prototype object (Person.prototype).
    
    // This behavior allows you to define common methods and properties on the prototype, which are shared among all instances created from the constructor function, promoting code reuse and memory efficiency.
    
    
    //--------------------------------------------so __proto__ is different for each instance but it will be like copy of Prototype of Function when instance is created ----------------------------------------------------------------------------------------------------
    
    // Yes, you're correct. Each instance has its own __proto__ property, which is a reference to the prototype object of the constructor function at the time the instance is created. The prototype object is commonly shared among instances created from the same constructor function.
    
    // When an instance is created using a constructor function, the __proto__ property of that instance is set to a copy of the constructor function's prototype object (Function.prototype). This allows the instance to access the properties and methods defined on the prototype.
    
    // Here's an example to illustrate this:
    
    // javascript
    // Copy code
    function Person(name) {
      this.name = name;
    }
    
    Person.prototype.greet = function() {
      console.log(`Hello, my name is ${this.name}`);
    };
    
    const person = new Person('Alice');
    
    console.log(person.__proto__ === Person.prototype); // true
    console.log(person.__proto__ === Object.getPrototypeOf(person)); // true
    // In the example above, Person.prototype is the prototype object of the Person constructor function. When person is created using the new Person('Alice') statement, its __proto__ property is set to a copy of Person.prototype.
    
    // The __proto__ property allows the instance (person) to access the greet method defined on the prototype object (Person.prototype.greet).
    
    // Note that __proto__ is a non-standard property and its usage is discouraged. Instead, you can use the Object.getPrototypeOf() method to access the prototype of an object:
    
    // javascript
    // Copy code
    console.log(Object.getPrototypeOf(person) === Person.prototype); // true
    // Using Object.getPrototypeOf() is the recommended way to retrieve the prototype object of an instance.
    
    // In summary, the __proto__ property of an instance references the prototype object of the constructor function at the time the instance is created, allowing the instance to access properties and methods defined on the prototype.
    
    
    
    
    
    //------------------------------------------------------------------------------------------------------------------------------------------------