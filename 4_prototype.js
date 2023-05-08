function fun1(){
   this.name_="fun1"; 
}
fun1.prototype.greet=function(){
    console.log("hello "+this.name_);
    return "done"
}
//-------------------
function fun2(){
    // this.fun1=new fun1();
    
    this.greet=fun1.prototype; // This will not create new object but will 'greet' varibale assign to same object
    // this.greet=Object.create(fun1.prototype); // this will create new Object
    // this.greet=new fun1.prototype(); //Error---Wrong
}

//---------------
let fun2Var=new fun2();
fun2Var.greet.greet= ()=> {
    console.log("greet overriden")
};
let fun1Var=new fun1();
fun1Var.greet();
fun2Var.greet.greet();
console.log(fun1Var.__proto__===fun2Var.__proto__);
// console.log(fun2Var.fun1.greet());