---
layout: post
title: "Understanding Promises in Node.js"
date: 2025-07-21
categories: [javascript, promisesandasync]
tags: [javascript]
author: "GGurkhude"
excerpt: "Learning notes on understanding promises in node.js"
original_path: "_JsTutorials/PromisesAndAsync/0_Promise_in_node_.md"
---

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

