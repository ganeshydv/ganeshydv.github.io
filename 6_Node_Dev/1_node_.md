## CommonJS Modules vs ES Modules
- CommonJs before Node v12 
- ESM support after Node v12
- ESM :`"type": "module" in package.json OR .mjs extension`
# **CommonJS vs. ES Modules (ESM) in Node.js**  
CommonJS and ES Modules (ESM) are **two different module systems** in JavaScript, mainly used in Node.js. While they seem like just different ways of writing code, **they actually have fundamental differences in how they work under the hood.**  

---

## **🔍 1. Are CommonJS and ESM Just Different Code Styles?**
Not exactly. While they both serve the same purpose (**modularizing code**), they work differently in terms of **execution model, import/export behavior, performance, and compatibility**.

| **Aspect**          | **CommonJS (CJS)**       | **ES Modules (ESM)**     |
|--------------------|----------------------|----------------------|
| **Default in Node.js** | ✅ Yes (Before Node.js 12) | ❌ No (Explicitly enabled with `"type": "module"` or `.mjs`) |
| **Import Syntax** | `const x = require('x')` | `import x from 'x'` |
| **Export Syntax** | `module.exports = {...}` | `export default ...` or `export {...}` |
| **Loading Type** | **Synchronous (Blocking)** | **Asynchronous (Non-blocking)** |
| **Execution Model** | Runs **one module at a time** | Supports **parallel execution** |
| **Tree Shaking Support** | ❌ No | ✅ Yes (Removes unused code) |
| **Lazy Loading** | ❌ No | ✅ Yes (`import()` dynamically) |
| **Supports `__dirname` and `__filename`** | ✅ Yes | ❌ No (Use `import.meta.url` instead) |

---

## **🔄 2. Key Differences Between CommonJS and ESM**

### **1️⃣ How Modules Are Loaded**
- **CommonJS (`require`) loads modules synchronously.**  
  - The execution **pauses** until the module is fully loaded.
  - Good for backend but **not ideal for performance**.

- **ESM (`import`) loads modules asynchronously.**  
  - Code can **continue executing while the module loads.**
  - Makes it **better for performance** in modern applications.

  ### ✅ **Example: CommonJS (Blocking)**
  ```js
  console.log("Before require");
  const fs = require("fs"); // Blocks execution until fs is loaded
  console.log("After require");
  ```
  ### ✅ Example: ESM (Non-Blocking)
  ```js
  console.log("Before import");
  import("fs").then(fs => {
    console.log("FS loaded dynamically");
  });
  console.log("After import"); // This runs immediately!
  ```
### **2️⃣ How Exports Work**
- CommonJS (module.exports) exports the entire module as an object.
- ESM (export) allows named exports and default exports.
   ### ✅ Example: CommonJS (require)
   ```js
   // commonjsModule.js
   module.exports = {
     greet: () => console.log("Hello from CommonJS!"),
   };
   
   // main.js
   const myModule = require("./commonjsModule");
   myModule.greet();
   ```
   ### ✅ Example: ES Module (import)
   ```js
   // esmModule.js
   export function greet() {
     console.log("Hello from ES Module!");
   }
   
   // main.mjs
   import { greet } from "./esmModule.js";
   greet();
   ```
### 3️⃣ **Can You Mix Both?**
- Node.js supports both, but they don't mix well.
- CommonJS cannot import ESM modules directly.
- ESM cannot use require().
   #### ✅ How to Import a CommonJS Module in ESM
   ```js
   import * as fs from "fs"; // Works if fs is CommonJS
   ```
   #### ✅ How to Import an ESM Module in CommonJS
   ```js
   const { greet } = await import("./esmModule.js"); // Use dynamic import
   ```
# require vs import
### Require : 
- in CommonJS Modules for sync module loading
```js
console.time("Require Load");
const fs = require("fs");  // Blocks execution until fs is loaded
console.timeEnd("Require Load");
```
- loads all modules even unused functions
```js
// math.js (CommonJS)
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// main.js
const math = require("./math");
console.log(math.add(2, 3)); // Loads both `add` and `subtract`, even if `subtract` isn't used
```

### Import : 
- async loading
```js
console.time("Import Load");
import("fs").then((fs) => {
  console.timeEnd("Import Load");
});
```
- lazy loading: loads only specific function
```js
// math.js (ES Module)
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}

// main.js
import { add } from "./math.js"; // Only loads `add`, ignores `subtract`
console.log(add(2, 3));
```