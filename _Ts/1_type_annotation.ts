// 1] variable type:
let x: boolean | number = true;
x = 1;
//----------------------------------
// 2] function type:
let sum: (x: number, y: number) => number;
// use case 1: function expression
sum = function (x: number, y: number) {
  return x + y;
};
// use case 2: function return type
function add(x: number, y: number): typeof sum {
  return function (x: number, y: number) {
    return x + y;
  };
}
//-------------------------------
// 3] object type:
let person: { name: string; age: number } = { name: "John", age: 30 };
//-------------------------------
// 4] array type:
let num: number[] = [1, 2, 3];
//-------------------------------
// 5] Union type:
let id: string | number | number[] | string[] = 123;
id = "123";
id = [1, 2, 3];
id = ["1", "2", "3"];

let id_2: "a" | "b" | "c" = "a";

let id_3: { name: string; age: number } | number[] = [1, 2, 3];

id_3 = { name: "John", age: 30 };
//-------------------------------
// 6] Enum type:
enum Direction {
  Up='UP',
  Down='DOWN',
  Left='LEFT',
  Right='RIGHT',
}

let dir: Direction = Direction.Up;
dir = Direction.Down;
// dir= Left; // error
//-------------------------------
// 7] Type assertion:
type isTrue = true | false;
type Persmission = "r" | "w" | "x";
type person = {
  name: string;
  age: number;
  permission: Persmission[] | Persmission;
  isMarried: isTrue;
};

let user: person = {
  name: "",
  age: 0,
  permission: ["r", "w"],
  isMarried: true,
};
