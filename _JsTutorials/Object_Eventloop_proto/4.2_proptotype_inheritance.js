

function Person(name, age) {
  this.name = name;
  this.age = age;
}

// parent getName
Person.prototype.getName = function () {
  return "name: " + this.name;
}
// constructor function
function Emp(a, b) {
  Person.call(this, a, b);
}

Emp.prototype = Object.create(Person.prototype);
const e1 = new Emp('tony', 20);
console.log(e1.getName());

Person.prototype.getAge = function () {
  return "age: " + this.age;
}

console.log(e1.getAge());

Emp.prototype.getDetails = function () {
  return "name: " + this.name + " age: " + this.getAge();
}

// Emp.prototype.prototype = function () {
//   return "name: " + this.name + " age: " + this.getAge();
// }
console.log(e1.getDetails())

console.log(Emp);

//--------------------------------------------------------------------
function Teacher(a, b) {
  Person.call(this, a, b)
}


Teacher.prototype = Object.create(Person.prototype);
let t1 = new Teacher("Nature", undefined);

Person.prototype.getDetails = function () {
  return "name: " + this.name + " age: " + this.getAge();
}
console.log(t1.getName());
console.log(t1.getAge());
console.log(t1.getDetails());
console.log(t1.getAge === e1.getAge);
console.log(t1.getName == e1.getName);
