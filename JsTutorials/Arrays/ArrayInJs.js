

// Different ways of creating an array in JS

let arr1 = [1,"hi"];
console.log(arr1);

let arr2= new Array([1,"hi"],3);
console.log(arr2);
let arr3= Array.of([1,2,3],"hi")
console.log(arr3);
let arr4= Array.from("hello"); // trakes only iterable as parameter so it can be used to convert Array-like Object or Iterable to Array
console.log(arr4);// [ 'h', 'e', 'l', 'l', 'o' ]


//
//push
//pop
//unshift
//shift

 