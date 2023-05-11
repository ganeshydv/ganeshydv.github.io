

function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // parent getName
  Person.prototype.getName = function () {
    return "name: " + this.name;
  }
  
  Person.prototype.getAge = function () {
    return "age: " + this.age;
  }
  
  Emp.prototype.getDetails = function () {
    return "name: " + this.name + " age: " + this.getAge();
  }
  
  function Teacher(a, b) {
    Person.call(this, a, b)
  }
  
  Teacher.prototype = Object.create(Person.prototype);
  let t1 = new Teacher("Nature", undefined);
  
  console.log(t1.getName());
  console.log(t1.getAge());
  console.log(t1 instanceof Person);
  console.log(t1.getDetails());
  console.log(t1.getAge === e1.getAge);
  console.log(t1.getName == e1.getName);
  