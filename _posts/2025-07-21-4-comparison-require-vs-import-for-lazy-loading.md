---
layout: post
title: "4️⃣ Comparison: require() vs import() for Lazy Loading"
date: 2025-07-21
categories: [nodejs, 5-2-require-vs-import--md]
tags: [database]
author: "GGurkhude"
excerpt: "Learning notes on 4️⃣ comparison: require() vs import() for lazy loading"
original_path: "6_Node_Dev/5.2_require_vs_import_.md"
---

# 4️⃣ Comparison: `require()` vs `import()` for Lazy Loading

| **Feature**          | **require() (CommonJS)** | **import() (ESM)**  |
|----------------------|------------------------|----------------------|
| **Synchronous?**     | ✅ Yes                 | ❌ No (Returns a Promise) |
| **Lazy Loading**     | ✅ Yes (`require()` inside a function) | ✅ Yes (`import()`) |
| **Works in Browser?** | ❌ No                  | ✅ Yes               |
| **Better for Large Apps?** | ⚠️ Okay         | ✅ Better (Async) |

---

# 5️⃣ When to Use Lazy Loading?
✅ If a module is **heavy** (e.g., `bcrypt`, `jsonwebtoken`).  
✅ If a module is **not always needed** (e.g., debugging tools).  
✅ If a module is **environment-specific** (e.g., different database drivers).  
✅ If you have **circular dependencies** that cause issues.  

---

## 📌 Example: Lazy Loading with `require()`
```js
function getHeavyModule() {
    const bcrypt = require('bcrypt');
    return bcrypt;
}
``