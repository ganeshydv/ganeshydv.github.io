"use strict";
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    walk() {
        console.log("I am walking");
    }
}
let s1 = new Student("John", 30);
// s1.walk();
class Teacher {
    constructor(name, age, isMarried, permission) {
        this.name = name;
        this.age = age;
        this.isMarried = isMarried;
        this.permission = permission;
    }
    walk() {
        console.log("I am walking");
    }
}
// let t1:Person_ = new Teacher("John", 30,true,"r");
// t1.walk();
