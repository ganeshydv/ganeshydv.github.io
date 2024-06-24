"use strict";
// -----------------------------
//      1. as: type assertion 
// -----------------------------
// : Used to manually tell TypeScript to treat a
//   value as a specific type when
//   you know more about the value's type than the compiler
// - type assertion is used to tell the compiler about the type of a variable.
// - It is like type casting in other languages.
// - It is used when you are sure about the type of a variable.
// - It is used to access the properties of a variable.
// - Syntax:
//     - variable_name as type
//     - <type>variable_name
// - Example:
let code = 123;
let empCode = code;
empCode = code;
let user1 = {};
user1.name = "John";
user1.age = 30;
//    - Note:
//         - Partial<Type> is used to make all properties of an object optional.
//         - It is used to create a new type by making all 
//     properties of an object optional.
//-----------------------------------
//             3. is:
//------------------------------------
//         - is is used to check the type of a variable.
//         - It is used to check if a variable is of a specific type.
//         - It is used to create a type predicate.
//         - Syntax:
//             - variable_name is type
//         - Example:
function isNumber(value) {
    return typeof value === "number";
}
if (isNumber(10)) {
    console.log("It is a number");
}
let key = "name";
// - Note:
//     - keyof is used to get the keys of an object.
//     - It is used to get the keys of an object as a union type.
//--------------------------------------------
//            5. TypeOf:
//--------------------------------------------
//     - TypeOf is used to get the type of a variable.
//     - It is used to get the type of a variable as a type.
//     - Syntax:
//         - typeof variable
//     - Example:
let num2 = 10;
let number = 20;
let user2 = { name: "John", age: 30 };
// - Note:
//     - Omit<Type, Keys> is used to create a new type 
//     by omitting the specified keys from the given type.
//     - It is used to create a new type by excluding the 
//     specified keys from the given type.
