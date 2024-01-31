"use strict";
// 1] variable type:
let x = true;
x = 1;
//----------------------------------
// 2] function type:
let sum;
// use case 1: function expression
sum = function (x, y) {
    return x + y;
};
// use case 2: function return type
function add(x, y) {
    return function (x, y) {
        return x + y;
    };
}
//-------------------------------
// 3] object type:
let person = { name: "John", age: 30 };
//-------------------------------
// 4] array type:
let num = [1, 2, 3];
//-------------------------------
// 5] Union type:
let id = 123;
id = "123";
id = [1, 2, 3];
id = ["1", "2", "3"];
let id_2 = "a";
let id_3 = [1, 2, 3];
id_3 = { name: "John", age: 30 };
//-------------------------------
// 6] Enum type:
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
let dir = Direction.Up;
dir = Direction.Down;
let user = {
    name: "",
    age: 0,
    permission: ["r", "w"],
    isMarried: true,
};
