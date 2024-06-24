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

let code: any = 123;
let empCode = code as number;
empCode = <number>code;
//- Note:
//     - Type assertion does not change the type of the variable at runtime.
//     - It is purely used by the TypeScript compiler.


//---------------------------------------
//          2. Partial<Type>:
//---------------------------------------

//  - Partial<Type> is a utility type that makes all properties
//  of the given type optional.
//   - It is used to make all properties of an object optional.
//   - Syntax:
//       - Partial<Type>
//   - Example:

interface User {
  name: string;
  age: number;
}
let user1: Partial<User> = {};
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
function isNumber(value: any): value is number {
  return typeof value === "number";
}
if (isNumber(10)) {
  console.log("It is a number");
}
// - Note:
//     - is is used to check the type of a variable.
//     - It is used to create a type predicate.

//---------------------------------------
//           4. keyof:
//--------------------------------------
//     - keyof is used to get the keys of an object.
//     - It is used to get the keys of an object as a union type.
//     - Syntax:
//         - keyof Type
//     - Example:
interface User {
  name: string;
  age: number;
}
type UserKeys = keyof User;
let key: UserKeys = "name";
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
type numType = typeof num2;
let number: numType = 20;
// - Note:
//     - TypeOf is used to get the type of a variable.
//     - It is used to get the type of a variable as a type.

//--------------------------------------------
//            6. Omit<Type, Keys>:
//--------------------------------------------
//     - Omit<Type, Keys> is a utility type that creates a new 
//     type by omitting the specified keys from the given type.
//     - It is used to create a new type by omitting the 
//     specified keys from the given type.
//     - Syntax:
//         - Omit<Type, Keys>
//     - Example:
interface User {
  name: string;
  age: number;
  occupation: string;
}
type NewUser = Omit<User, "occupation">;
let user2: NewUser = { name: "John", age: 30 };
// - Note:
//     - Omit<Type, Keys> is used to create a new type 
//     by omitting the specified keys from the given type.
//     - It is used to create a new type by excluding the 
//     specified keys from the given type.


// -----------------------
// enums in TypeScript
// -----------------------
// Enums are a way to define a set of named constants.
// Using enums can make it easier to document intent, or create a set of distinct cases.
// TypeScript provides both numeric and string-based enums.
// always use enums when you have a set of related constants.
// always make enums as constants
const enum Direction_ {
  Up,
  Down,
  Left,
  Right,
}
let direction = Direction.Up;