---
layout: post
title: "JavaScript & Node.js Complete Guide"
categories: ["Programming Languages", "JavaScript & Node.js"]
tags: [javascript-&-node.js, complete-guide]
date: 2025-07-22
author: "GGurkhude"
description: "Modern JavaScript development guide covering ES6+, Node.js, async programming, and frontend frameworks"
toc: true
---

# JavaScript & Node.js Complete Guide

Modern JavaScript development guide covering ES6+, Node.js, async programming, and frontend frameworks

## 📚 Table of Contents

- [999. Javasripttopics](#section-999)
- [999. Use Strict](#section-999)
  - [0. Promise In Node](#section-0)

---



## 999. Javasripttopics {#section-999}

1) let,var,const differences
2) functions -> differnce between function expression and function defination 
3) ananymous function and ways to declare it
4) function inside function 
5) callbacks
6) OBJECTS in js and Propertis of Objects -> Object.defineProperty(), Object.assign() .Object.hasOwnProperty(),.etc.
7) differences between object iteral vs function constructor vs class
8) this keywords 
9) bind() vs call() vs apply()
10) array and .map() ,other methods
11) string and methods
12) Function constuctor and Inheritance vs class Inheritance
13) copying a Object or Propertis --> spread operator vd rest operator 
14) set , map, weak map, weak set
15) map vs Objects
16) CLASS -> static methods , method overriding , inheritance, private properties, super()
17) Events and adding events, listner to custom Event
18) Pure Function vs Impure FUnction 
19) Factory FUnction : to create objects
20) Closures and memory management
21) Event Loop 
22) async- await 
23) Promise and methods-> .all(), .any()
24) handling promise using then(),catch()
25) require vs import and what is module
26) IIEF
27) deep copy vs shallow copy-->
    Object.assign() used for shallow copy - means creating a new object having properties of one or more objects but for objects it will 
    pass only referance means will not crate a new copy

---

## 999. Use Strict {#section-999}

explain about 'use strict'


- The 'use strict'; directive is a special string literal in JavaScript that enables strict mode within a script or a specific function scope. When you include this directive at the beginning of a script or a function, it instructs the JavaScript interpreter to enforce a stricter set of rules and behavior. Here's an explanation of what strict mode entails:

- Strict Syntax Parsing: Strict mode requires JavaScript code to follow stricter syntax rules. It disallows the use of certain syntax that is prone to errors or ambiguity. For example, without strict mode, you can create variables without declaring them with the var, let, or const keywords. But in strict mode, this would be a syntax error.

- Prevents Silent Errors: In non-strict mode, some mistakes or errors are silently ignored or handled in a way that may not be intuitive. Strict mode changes this behavior and turns many silent errors into explicit errors or exceptions. This helps in identifying and fixing potential issues earlier.

- Variable Scope Enforcement: Strict mode enforces better scoping rules. For instance, variables declared inside a block with let or const are limited to that block in strict mode. In non-strict mode, such variables would "leak" out of the block scope, which can lead to unexpected behavior.

- Prevents Implicit Global Variables: In non-strict mode, if you assign a value to a variable that has not been explicitly declared, JavaScript creates a new global variable automatically. This behavior can lead to accidental global variable pollution. In strict mode, such assignments result in a reference error, avoiding the implicit creation of global variables.

- Restricted Functionality: Strict mode disables or modifies some features that are considered error-prone or problematic. For example, the this value is undefined in functions that are not methods or constructors, preventing accidental use of the global object as this.

- Evolution-friendly Mode: Strict mode ensures that JavaScript code follows a stricter set of rules, making it easier for future versions of JavaScript to introduce new features without breaking existing code. It helps to avoid conflicts with potential reserved keywords in future ECMAScript specifications.

- To enable strict mode for an entire script, include 'use strict'; at the beginning of the file before any other code. To enable strict mode for a specific function, include 'use strict'; at the beginning of the function body.

---

### 0. Promise In Node {#section-0}

> **Topic: PromisesAndAsync**

# **Understanding Promises in Node.js**

## **1️⃣ What is a Promise?**
A **Promise** in Node.js is an object representing the eventual completion (or failure) of an asynchronous operation. It has three states:

- **Pending**: The initial state, neither fulfilled nor rejected.
- **Fulfilled**: The operation completed successfully.
- **Rejected**: The operation failed.

### **Example of a Simple Promise**
```js
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("✅ Promise Resolved!");
    }, 2000);
});

myPromise.then(result => console.log(result));
```
### **🔹 Output:**
```
✅ Promise Resolved!
```

## **2️⃣ Handling Promise Rejections with `.catch()`**
If a promise encounters an error, we handle it using `.catch()`.

```js
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("❌ Promise Rejected!");
    }, 2000);
});

myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

### **🔹 Output:**
```
❌ Promise Rejected!
```

## **3️⃣ Handling Multiple Promises with `Promise.all()`**
`Promise.all()` runs multiple promises in parallel and resolves when all promises succeed. If **one fails, the entire `Promise.all()` fails**.

```js
const promises = [
    Promise.resolve("✅ Success 1"),
    Promise.reject("❌ Error Occurred"),
    Promise.resolve("✅ Success 2"),
];

Promise.all(promises)
    .then(results => console.log("Results:", results))
    .catch(error => console.error("Error:", error));
```

### **🔹 Output:**
```
Error: ❌ Error Occurred
```

## **4️⃣ Handling Errors in `Promise.all()` Without Breaking Execution**
Use `.catch()` inside each individual promise to ensure all promises execute:

```js
const safePromises = [
    Promise.resolve("✅ Success 1").catch(err => err),
    Promise.reject("❌ Error Occurred").catch(err => `Handled Error: ${err}`),
    Promise.resolve("✅ Success 2").catch(err => err),
];

Promise.all(safePromises)
    .then(results => console.log("Results:", results))
    .catch(error => console.error("Error:", error));
```

### **🔹 Output:**
```
Results: [ '✅ Success 1', 'Handled Error: ❌ Error Occurred', '✅ Success 2' ]
```

## **5️⃣ Using `Promise.allSettled()` to Track Both Success & Failure**
Unlike `Promise.all()`, `Promise.allSettled()` **does not stop execution on failure** and provides detailed results.

```js
const promises = [
    Promise.resolve("✅ Success 1"),
    Promise.reject("❌ Error Occurred"),
    Promise.resolve("✅ Success 2"),
];

Promise.allSettled(promises)
    .then(results => console.log("Results:", results));
```

### **🔹 Output:**
```
Results: [
  { status: 'fulfilled', value: '✅ Success 1' },
  { status: 'rejected', reason: '❌ Error Occurred' },
  { status: 'fulfilled', value: '✅ Success 2' }
]
```

## **6️⃣ Using `try-catch` Inside an Async Function**
Another way to handle errors in `Promise.all()` is by using `try-catch` inside an `async` function.

```js
async function runTasks() {
    try {
        const results = await Promise.all([
            (async () => "✅ Success 1")(),
            (async () => { throw "❌ Error Occurred"; })().catch(err => `Handled: ${err}`),
            (async () => "✅ Success 2")(),
        ]);
        console.log("Results:", results);
    } catch (error) {
        console.error("Error caught:", error);
    }
}

runTasks();
```

### **🔹 Output:**
```
Results: [ '✅ Success 1', 'Handled: ❌ Error Occurred', '✅ Success 2' ]
```

## **7️⃣ Choosing the Right Approach**
| Approach | Best For | Stops Execution on Error? |
|----------|---------|---------------------------|
| **Default `Promise.all()`** | When all promises must succeed | ✅ Yes |
| **`.catch()` on Each Promise** | When you want to handle failures individually | ❌ No |
| **`Promise.allSettled()`** | When you need both success & failure results | ❌ No |
| **`try-catch` Inside `async` Function** | Handling errors & continuing execution | ❌ No |

## **🚀 Conclusion**
- ✅ **Use `Promise.allSettled()`** when you want both successful & failed results.
- ✅ **Use `.catch()` inside each promise** if you need `Promise.all()` but don’t want failures to break execution.
- ✅ **Use `try-catch` in an async function** for structured error handling.

🔹 **Now you are ready to handle promises effectively in Node.js!** 🚀

---

## Arrays



---

## BrowserStorage



---

## Classes



---

## ConstructorFunction



---

## Events



---

## ExtraEx



---

## Object Eventloop Proto



---

## PromisesAndAsync



---

## Read Write SYNC JSON



---

##  Await .Js



---

### A



---

### B



---

## 🎯 Summary

This comprehensive guide covers all aspects of javascript & node.js, providing practical examples and best practices for real-world implementation.

## 🔗 Related Topics

- [All Categories](/categories/)
- [Technical Collections](/collections/)
- [Latest Posts](/)

---

*📝 **Note:** This guide consolidates multiple learning materials into a single comprehensive resource. Each section represents hands-on learning and practical implementation experience.*
