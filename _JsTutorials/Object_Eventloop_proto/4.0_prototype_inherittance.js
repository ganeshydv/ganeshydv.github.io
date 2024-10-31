function Person(name) {
    this.name = name;
  }
  
  Person.prototype.sayName = function() {
    console.log(`My name is ${this.name}`);
  };
  
  function Employee(name, title) {
    Person.call(this, name);   // this will call parent constructor
    this.title = title;
  }
  
  Employee.prototype = Object.create(Person.prototype);  // This will set protoype inheritance if not then will not access parent methods defind on prototype
  
  const john = new Employee('John', 'Manager');
  john.sayName();