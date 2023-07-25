

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function () {
    return "name: " + this.name;
}

function Emp(a, b) {
    Person.call(this, a, b);
}

// Emp.prototype=Object.create(Person.prototype);
Emp.prototype = new Person();

const e1 = new Emp('tony', 20);
console.log(e1.getName());

Person.prototype.getAge = function () {
    return "age: " + this.age;
}

console.log(e1.getAge());

Person.prototype.getDeatils = function () {
    return "name: " + this.name + " age: " + this.age;
}

console.log(e1.getDeatils())
console.log(e1.prototype)
//------------------------------------------------------------------------------
function Teacher(a, b) {
    Person.call(this, a, b)
}

// Teacher.prototype=Object.create(Person.prototype);
Teacher.prototype = new Person();
const t1 = new Teacher("Nature", undefined);

console.log(t1.getName());
console.log(t1.getAge());
console.log(t1.getDeatils())
console.log(t1.getAge === e1.getAge);
console.log(t1.getName == e1.getName);





