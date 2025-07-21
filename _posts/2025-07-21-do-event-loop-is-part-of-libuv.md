---
layout: post
title: "Do event loop is part of libuv?"
date: 2025-07-21
categories: [nodejs, 3-node-event-loop-libuv-md]
tags: [javascript, networking, concurrency]
author: "GGurkhude"
excerpt: "Learning notes on do event loop is part of libuv?"
original_path: "6_Node_Dev/3_node_event_loop_libuv.md"
---

## Do event loop is part of libuv?
- Yes! The Event Loop in Node.js is implemented by libuv, which is a C library that provides an abstraction over asynchronous I/O operation

## Event Loop is implemented inside libuv
### 🔹 libuv provides the actual Event Loop implementation that Node.js uses to handle non-blocking operations.

## 2️⃣ How the Event Loop Works in libuv  

🔹 The **Event Loop** is a loop with multiple phases:  
1. **Timers Phase** – Executes `setTimeout` & `setInterval` callbacks.  
2. **Pending Callbacks** – Handles I/O callbacks (e.g., network errors).  
3. **Idle & Prepare** – Internal `libuv` tasks.  
4. **Poll Phase** – Waits for I/O events (e.g., file reads, network responses).  
5. **Check Phase** – Executes `setImmediate()` callbacks.  
6. **Close Callbacks** – Runs callbacks for closed sockets or streams.  

---

### 🔹 How `libuv` Integrates with the OS  

For **network requests** (HTTP, TCP, etc.), `libuv` relies on the OS kernel's event notification mechanisms:  

- ✅ **epoll** (Linux)  
- ✅ **kqueue** (macOS, BSD)  
- ✅ **IOCP** (Windows)  
- ✅ **io_uring** (newer Linux)  

For **CPU-heavy tasks** (e.g., `crypto.pbkdf2` or `fs.readFile`), `libuv` uses a **separate worker thread pool**.

---

## 3️⃣ Is the Event Loop Single-Threaded?  

✅ **Yes**, the **Event Loop itself runs in a single thread**, but:  
- **Asynchronous I/O** (like HTTP requests) is handled by the **OS kernel** (not using threads).  
- **Heavy tasks** (like file reading & cryptography) use the **worker thread pool**.  

---

## 4️⃣ Summary  

✅ The **Event Loop** is part of `libuv`.  
✅ `libuv` abstracts system calls like **epoll, kqueue, and io_uring**.  
✅ The **Event Loop does not create threads** for I/O operations (it uses OS networking).  
✅ **Worker threads** handle CPU-intensive tasks separately.  

---

🚀 **Would you like a deep dive into how `libuv` manages timers and I/O polling?**  
