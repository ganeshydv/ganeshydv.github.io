
class A{
    name="jack"
}

class B extends A{
    constructor(){
        super()
    }
}

let b=new B();
// console.log(b.name);
// console.log(b.__proto__ === A)

//--------------------------------------------------
function A1(){
    this.name="jack"
}

function B1() {
    A1.call(this);
}

B1.prototype=Object.create(A1.prototype)

let b1=new B1();
console.log("[[Prototype]] object __proto__ se access karte hai")
console.log("classObj.ptototype===ParentClassObj ==> B.prototype===A") //false
console.log(B.prototype===A)
console.log("CLassObj.__proto__===PArentClassObj ==> B.__proto__===A")
console.log(B.__proto__===A);// true
console.log(B1.__proto__===A1); //false
console.log(B1.prototype===A1.prototype);//false
console.log(B1.prototype.constructor===A1) //true
console.log(B1.__proto__.constructor===A1)//false
console.log(b1.__proto__.__proto__.constructor===A1);//trues
console.log(b.__proto__.__proto__.constructor === A) ;//true ==> 
console.log(b.__proto__.constructor===B) //true
console.log(b1.__proto__.constructor==A1); // true ==> there is no B1 in prototype chain in function constructor
console.log(b.__proto__===B.prototype) // true ==> for class
console.log(b1.__proto__===B1.prototype) // true
console.log(A.__proto__===A.prototype);//false
console.log("FunctionInstance.__proto__== Object.prototype ");
console.log( b1.__proto__===B1.prototype)
console.log("----------------- CLASS OBJECTS -----------------------")
console.log(B.__proto__===B.prototype.__proto__.constructor); //true
console.log(B.__proto__===B.prototype.constructor.__proto__);// true
console.log(A.__proto__===A.prototype.constructor.__proto__);  // true

console.log("----------------- FUnction OBJECTS -----------------------");

//prototype is used to assign a fallback object while __proto__ is used to fallback to Prototype Object consider Prototype as Home and __proto__ as path....