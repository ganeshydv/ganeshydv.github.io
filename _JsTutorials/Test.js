

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//   }
  
//   // parent getName
//   Person.prototype.getName = function () {
//     return "name: " + this.name;
//   }
  
//   Person.prototype.getAge = function () {
//     return "age: " + this.age;
//   }
  
//   Emp.prototype.getDetails = function () {
//     return "name: " + this.name + " age: " + this.getAge();
//   }
  
//   function Teacher(a, b) {
//     Person.call(this, a, b)
//   }
  
//   Teacher.prototype = Object.create(Person.prototype);
//   let t1 = new Teacher("Nature", undefined);
  
//   console.log(t1.getName());
//   console.log(t1.getAge());
//   console.log(t1 instanceof Person);
//   console.log(t1.getDetails());
//   console.log(t1.getAge === e1.getAge);
//   console.log(t1.getName == e1.getName);

// asyncExample.js

console.log('Script start');

async function asyncFunction() {
  console.log('Before await');

  // 1. always use resolve inside promise to make it a microtask 
  // 2. [VIMP] code after promise is also sent to microtask event it's synchronous code 
  // 3. sync code inside is executed in main stack so even if resolve is used it will be executed after the sync code
  // as it puts resolved value in microtask queue 
  // that is why 'Hi -- 2' is printed before 'After await'
  let x= new Promise((resolve) => { 
    // promise takes outer scope code and will be in microtask queue so it will be executed after all the synchronous code is executed'
    // that is why 'After await' is printed after all the synchronous code is executed

    console.log('Hi  -- 1') //-----1. this will be executed first
     
    // setTimeout(() => {  // ---- // following will go to macrotask not micro queue but if resolve is used inside 
    //   console.log('Hi from setTimeout');
    //   resolve(10); // as resolve is used so this will go to microtask queue and will be executed after all the synchronous code is executed 
    // }, 0);
    // code outside the promise will be executed first and then the resolve will be executed
    // but code in outer funtion will be executed after the resolve is executed
    resolve(10); // as resolve is used so this will go to microtask queue and will be executed after all the synchronous code is executed
    console.log('Hi -- 2');  // ---- 2. this gets executed after the resolve is executed but before the outer function
  }); 
  // 1. if resolve is not used then this line will not be executed
  // 2. even following is sycn code still it will be executes after sync code and given to task queue why? not sure
  console.log(await x);
  console.log('After await');  
}

console.log(asyncFunction());

console.log('Script end');

// setTimeout to simulate macrotask
setTimeout(() => {
  console.log('Macrotask: setTimeout callback');
}, 0);

// Promise to simulate microtask
Promise.resolve().then(() => {
  console.log('Microtask: Promise callback');
});
/*
Script start
Before await
Hi  -- 1
Hi -- 2
Promise { <pending> }
Script end
10
After await
Microtask: Promise callback
Macrotask: setTimeout callback
*/

// /*
async function asyncFunction() {
  console.log('Before await');
  await new Promise((resolve) => {
    console.log('Hi  -- 1')
    setTimeout(() => {
      console.log('Hi from setTimeout');
    }, 0);
    resolve(10);
    
    console.log('Hi -- 2');  
  }); 
  console.log('After await'); // 1.if resolve is not used then this line will not be executed
   //2. this will be exuted after all the synchronous code is executed as 
}
//  */
 /*
OP:
Script start
Before await
Hi  -- 1
Hi -- 2
Script end
After await
Microtask: Promise callback
Hi from setTimeout
Macrotask: setTimeout callback
*/

/*

async function asyncFunction() {
  console.log('Before await');
  await new Promise((resolve) => {
    console.log('Hi  -- 1')
    setTimeout(() => {
      resolve(10);
      console.log('Hi from setTimeout');
    }, 0);
    
    console.log('Hi -- 2');  
  }); 
  console.log('After await'); // 1.if resolve is not used then this line will not be executed
   //2. this will be exuted after all the synchronous code is executed as 
}
   */
/*   
OP:
Script start
Before await
Hi  -- 1
Hi -- 2
Script end
Microtask: Promise callback
Hi from setTimeout
After await
Macrotask: setTimeout callback
*/
  