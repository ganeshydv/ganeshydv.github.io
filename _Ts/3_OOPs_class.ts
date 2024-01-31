type Person_ = {
    name: string;
    age: number;
    isMarried: boolean;
    permission: "r" | "w" | "x";
};

interface Person {
    name: string;
    age: number;
}

class Student implements Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    walk() {
        console.log("I am walking");
    }
}


let s1:Person = new Student("John", 30);
// s1.walk();

class Teacher {

    name: string;
    age: number;
    isMarried: boolean;
    permission: string;

    constructor(name: string, age: number,isMarried: boolean,permission: "r" | "w" | "x") {
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