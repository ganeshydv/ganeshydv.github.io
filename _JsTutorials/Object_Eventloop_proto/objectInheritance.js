function Person(name,age){
    this.name=name;
    this.age=age;
}

Person.prototype.deatils=function(){
    console.log(this.name+" "+this.age);
}

let p1=new Person('a',20);

p1.deatils();

function Person2(name,age){
    this.name=name;
    this.age=age;
}

// Person2.prototype.deatils=Person.deatils;  //--> WRONG
// Person2.prototype.deatils=Person.prototype.deatils;  // RIght
// Person2.prototype.deatils=p1.deatils;     //--> RIGHT
let p2=new Person2('b',10);

p2.deatils();



// let obj1={
//     name:'a',
//     age:20
// }
// let a=[10,obj1];

// function getPerson(name,age){
//     return {
//         // name:name,
//         // age:age
//         name,
//         age
//     }
// }

// function ConstructorFunc(name,age){
//     this.age=age;
//     this.name=name;
//     this.fun1=function(height){
//         console.log(height);
//     }
// }

// const objC1=new Function(`age`,`name`,`this.age=age;
// this.name=name;
// this.fun1=function(height){
//     console.log(height);
// }`);
// let p1=getPerson("a",10);
// let arr=[getPerson("a",10),getPerson('b',15),getPerson('c',20),getPerson('d',30)];

// const obj3={
//     sum:function(x){
//         return 3+x;
//     }
// }

// const x1=obj3.sum(1);
// console.log(x1);

// let p=20;
// let q=p;
// p=30;
// console.log(p);
// console.log(q)

