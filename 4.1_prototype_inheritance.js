function fun1(n){
    this.name=n;
}

fun1.prototype.ask=function(){  // arrow function will not work here fpr node v12.0.0
    console.log("ask something to "+this.name);
}

let p1=new fun1("a");
p1.ask();

let p2=Object.create(fun1.prototype);
p2.name="a2"
p2.ask()
