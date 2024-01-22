function fun1(n){
    this.name=n;
}

fun1.prototype.ask=function(){  // arrow function will not work here fpr node v12.0.0
    console.log("ask something to "+this.name);
}

let p1=new fun1("a");   // object/instacne created using new keyword by calling constructor function's constructor
p1.ask();

let p2=Object.create(fun1.prototype);  // this will create object without calling constructor function and sets new_objects.prototype=parentObjects.prototype---> Will inherit from ONlY PROTOTYPE not from parent
console.log(p1.hasOwnProperty('name'));
console.log(p2.hasOwnProperty('name'));
p2.name="a2"     // have to set properties before using it 
p2.ask()
