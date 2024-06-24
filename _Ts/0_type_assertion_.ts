
/*

Type assertions in TypeScript are used to tell the compiler to treat a value as a specific type, overriding the type inference. It is like type casting in other languages. It is used when you are sure about the type of a variable. Type assertions are purely used by the TypeScript compiler and do not change the type of the variable at runtime.

*/
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// -------- or ----------

let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;
