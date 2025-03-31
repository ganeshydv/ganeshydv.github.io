# CommonJS vs. ES Modules in Node.js
Node.js supports two module systems:

### CommonJS (CJS) – Default module system (require / module.exports)

### ES Modules (ESM) – Modern module system (import / export)

Let’s break down both:
## 1️⃣ CommonJS (CJS) – Default in Node.js
CommonJS modules are synchronous and executed in the order they are required.
### How It Works
  - Uses require() to import modules.
  - Uses module.exports or exports to export values.
  - Each file is treated as a separate module.

### Key Features of CJS
- ✅ Synchronous execution – Blocks execution while loading the module.
- ✅ Encapsulated in a function wrapper – Provides require, exports, module, __filename, and __dirname.
- ✅ Used in most Node.js applications.

## 2️⃣ ES Modules (ESM) – Modern Approach
ESM is the standard JavaScript module system, designed for better optimization.
### How It Works
- Uses import to import modules.
- Uses export to export values.
- Supports asynchronous loading.
### Key Features of ESM
- ✅ Asynchronous execution – Non-blocking, suitable for large applications.
- ✅ Strict mode enabled by default – Prevents accidental global variable leaks.
- ✅ Supports tree-shaking – Removes unused exports to optimize performance.
- ✅ Works in browsers and Node.js (with some configuration).

# 🔄 Key Differences: CommonJS vs. ES Modules

| **Feature**                     | **CommonJS (CJS)**  | **ES Modules (ESM)** |
|---------------------------------|---------------------|----------------------|
| **Syntax**                      | `require()`         | `import/export`      |
| **Execution**                   | Synchronous (Blocking) | Asynchronous (Non-blocking) |
| **Default in Node.js?**         | ✅ Yes             | ❌ No (needs `"type": "module"` in `package.json`) |
| **Works in Browsers?**          | ❌ No              | ✅ Yes               |
| **Can be used with `import` in Node.js?** | ❌ No | ✅ Yes (with `.mjs` or `"type": "module"`) |
| **Supports `__filename`, `__dirname`?** | ✅ Yes | ❌ No (Use `import.meta.url` instead) |

## 3️⃣ Using ES Modules in Node.js
By default, Node.js uses **CommonJS**. To enable **ES Modules**:

1. Use `.mjs` file extension, **OR**
2. Set `"type": "module"` in `package.json`
```json
{
  "type": "module"
}
```
3. Use import.meta.url instead of __dirname and __filename:

```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename, __dirname);
```
# 4️⃣ When to Use CommonJS vs. ES Modules?
### Use CommonJS if:
- You are working on an existing Node.js project.
- You need synchronous execution (e.g., for scripts or config files).
- You use dependencies that don’t support ES Modules.
### Use ES Modules if:
- You are writing modern JavaScript.
- You need better optimization (tree shaking, async execution).
- You are sharing code between Node.js and browsers.

## ✅ Node.js avoids infinite loops by returning an incomplete module.exports during circular dependencies.