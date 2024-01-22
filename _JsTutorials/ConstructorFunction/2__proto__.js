
//ALways remember that __proto__ search only on prototype object of parent/fallback not on any other Object


function Person(){
    this.name="sparrow";
    return this;
}


// Person.prototype.age=20;
// function teacher(){
//     Person.call(this)
// }
// teacher.prototype=Object.create(Person.prototype)
let p1=new Person();
console.log(p1);

let p2=new p1.__proto__.constructor();
console.log(p2);


class A{
    constructor(){
        this.name="a";
    }
}

class B extends A{
    constructor(){
        super();
        this.b="b"
    }
}

let b1=new B();