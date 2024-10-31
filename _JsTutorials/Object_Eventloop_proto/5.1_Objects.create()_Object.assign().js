// different ways to copy a object
// ChatGPT
// There are multiple ways to copy an object in JavaScript, each with its own behavior and considerations. Here are some common approaches to copy an object:

// 1] Object.assign(): The Object.assign() method is used to copy the values of all enumerable properties from one or more source objects to a target object. It creates a shallow copy of the object.

// javascript
// Copy code
var source = { name: 'John', age: 30 };
var copy = Object.assign({}, source);


// 2] Spread syntax (ES6): The spread syntax (...) allows you to create a new object by expanding the properties of an existing object. It also creates a shallow copy of the object.

// javascript
// Copy code
var source = { name: 'John', age: 30 };
var copy = { ...source };

// 3] JSON.parse() and JSON.stringify(): By converting an object to a JSON string using JSON.stringify() and then parsing it back to an object using JSON.parse(), you can create a deep copy of the object. This method works well for objects without functions, undefined values, or circular references.

// javascript
// Copy code
var source = { name: 'John', age: 30 };
var copy = JSON.parse(JSON.stringify(source));


// 4] Object.create(): The Object.create() method allows you to create a new object with a specified prototype. By passing the original object as the prototype, you can create a shallow copy.

// javascript
// Copy code
var source = { name: 'John', age: 30 };
var copy = Object.create(Object.getPrototypeOf(source));
Object.assign(copy, source);
// It's important to note that the above methods create shallow copies of objects. If the object contains nested objects or arrays, those nested references will be shared between the original object and the copied object. If you need a deep copy that duplicates nested objects and arrays, you may need to use a specialized deep cloning function or library.