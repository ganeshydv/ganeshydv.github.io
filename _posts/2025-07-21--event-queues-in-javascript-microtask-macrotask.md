---
layout: post
title: "� Event Queues in JavaScript: Microtask & Macrotask Queues"
date: 2025-07-21
categories: [nodejs, 4-node-event-loop-queue--md]
tags: [java, javascript, networking]
author: "GGurkhude"
excerpt: "Learning notes on � event queues in javascript: microtask & macrotask queues"
original_path: "6_Node_Dev/4_node_event_loop_queue_.md"
---

# 📌 Event Queues in JavaScript: Microtask & Macrotask Queues  

In JavaScript (including Node.js), event queues are divided into **two main types**:  

- **Microtask Queue**  
- **Macrotask Queue**  

These queues determine the **order** in which asynchronous code executes. 🚀  

---

## 1️⃣ What are Microtasks & Macrotasks?  

| **Feature**          | **Microtask Queue**                          | **Macrotask Queue**                     |
|----------------------|---------------------------------------------|-----------------------------------------|
| **Execution Order**  | ✅ Runs **before** any macrotasks, right after the current synchronous code  | ✅ Runs **after** all microtasks have been executed |
| **Examples**         | - `process.nextTick()` (Node.js)  <br> - `queueMicrotask()`  <br> - `.then()` in Promises  <br> - `async/await` (after `await`)  | - `setTimeout()`  <br> - `setImmediate()` (Node.js)  <br> - `setInterval()`  <br> - `fs.readFile()` (Node.js)  <br> - Network Requests (HTTP) |

---

## 2️⃣ Execution Order: Microtasks Always Run First  

### **Example:**
```js
console.log("Start");

setTimeout(() => console.log("setTimeout"), 0); // Macrotask

Promise.resolve().then(() => console.log("Promise.then")); // Microtask

process.nextTick(() => console.log("process.nextTick")); // Microtask (Highest Priority in Node.js)

console.log("End");
```


## 🔹 Output in Node.js Example  

```js
Start
End
process.nextTick
Promise.then
setTimeout
```

## 🔍 Why?  

### 1️⃣ **Synchronous Code Runs First** → `"Start"`, `"End"`  

### 2️⃣ **Microtasks Run Next:**  
   - `process.nextTick()` (**highest priority in Node.js**)  
   - `Promise.then()`  

### 3️⃣ **Macrotasks Run Last** → `setTimeout()`  

---

## 3️⃣ How the Event Loop Works with Microtasks & Macrotasks  

1. **Run all synchronous code first** (e.g., `console.log()`).  
2. **Run all Microtasks** (from the Microtask Queue).  
   - If any new microtasks are added while running microtasks, they are executed **before moving on**.  
3. **Run one Macrotask** (from the Macrotask Queue).  
4. **Repeat steps 2 & 3** until all tasks are completed.  

---

## 4️⃣ Node.js Specifics  

### 🔹 `process.nextTick()` Runs Before `Promise.then()`  

In Node.js, `process.nextTick()` is **prioritized** over Promises.  
```js
Promise.resolve().then(() => console.log("Promise"));
process.nextTick(() => console.log("Next Tick"));
```
## Output: 
```js
Next Tick
Promise
```
### 🔹 setImmediate() vs setTimeout(() => {}, 0)
- Both run in the macrotask queue, but:

   - setImmediate() runs after I/O callbacks.
   - setTimeout(fn, 0) runs in the next macrotask cycle.
```js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log("setTimeout"), 0);
  setImmediate(() => console.log("setImmediate"));
})
// setImmediate
// setTimeout
```

## 5️⃣ Summary
- ✅ Microtasks (Promises, process.nextTick()) run before Macrotasks.
- ✅ Macrotasks (setTimeout, setImmediate, I/O) run in the next event loop cycle.
- ✅ process.nextTick() has the highest priority in Node.js.
- ✅ setImmediate() runs after I/O but before setTimeout(0).