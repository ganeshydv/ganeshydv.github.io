---
layout: post
title: "� How Node.js Resolves Modules (require & import)"
date: 2025-07-21
categories: [nodejs, 5-1-require-import--md]
tags: [javascript, networking]
author: "GGurkhude"
excerpt: "Learning notes on � how node.js resolves modules (require & import)"
original_path: "6_Node_Dev/5.1_require_import_.md"
---

# 🛠 How Node.js Resolves Modules (require & import)
Whenever you use require() or import in Node.js, Node follows a specific algorithm to locate the module. Let's break it down step by step:

# 1️⃣ Module Resolution Order in Node.js
Node.js looks for a module in the following order:

1. Core Modules (Built-in) – e.g., fs, http, path, crypto
1. File Modules (Relative & Absolute Paths) – e.g., require('./math.js')
1. Node Modules (Third-party packages from node_modules/)
1. Global Modules (npm link, global installs)

# 2️⃣ How Node Resolves a require() Call
### 1. Example 1: require("fs") (Core Module)
- ✅ Node immediately finds the core module and loads it.
- ⏳ No file system lookup required.
### 2. Example 2: require("./math.js") (Relative Path)
```js
const math = require("./math.js");
```
### 📌 Resolution Process:
1. Checks if math.js exists in the current folder (./math.js).
1. Wraps it in a function & executes.
----
### Example 3: require("express") (Third-party Module)
### 📌 Resolution Process:
1. Looks inside the current project's node_modules/express/.
   1. Checks: ./node_modules/express/index.js
   1. Checks: ./node_modules/express/package.json ("main" field)
1. If not found, moves up the directory tree (../node_modules/).
1. Continues until it finds the module or reaches the root (/node_modules).
1. Throws an error if the module is not found:
```js
Error: Cannot find module 'express'
```
### 🛠 Why does Node search in parent directories?

- This allows dependencies to be installed only once at the root.
- Useful for monorepos and large projects.
# 3️⃣ How Node Resolves Index Files & Folders
Example: Importing a Directory
If you require() a folder, Node tries these in order:

1. Looks for package.json and "main" entry
1. Looks for index.js
1. Looks for index.json
1. Looks for index.node (C++ Addons)
# 4️⃣ Absolute vs. Relative Paths in require()
# 5️⃣ Custom Module Paths (NODE_PATH)
By default, Node only searches node_modules/. But you can add custom paths using the NODE_PATH environment variable.

# 6️⃣ ES Modules (import) Resolution in Node.js
ES Modules (import/export) use different resolution rules.
### 📌 ESM Rules
1. Requires file extensions (.js, .mjs) (No implicit resolution like CJS).
1. Cannot use require() inside ES Modules.
1. Relative paths (./, ../) are mandatory.