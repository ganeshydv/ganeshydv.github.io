
function Person(){
    this.name="tony";

    return this
}

class Teacher{
    #name;  //private variable ES2022
    constructor(){
       this.#name="stark"
    }
    get getName(){
        return this.#name;
    }
}

let t=new Teacher()
console.log(t.getName);
// a function always returns a {this object} when using {new}

let p=new Person();
console.log(p.name);

function Person2(){
    this.name="tony";

    return {}
}

let p2=new Person2();
console.log(p2.name);


// NEW keyword is used to return THIS object from Fucntion --> 