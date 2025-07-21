---
layout: post
title: "� Final Refined Summary (Steps)"
date: 2025-07-21
categories: [java, adv-java]
tags: [java, concurrency]
author: "GGurkhude"
excerpt: "Learning notes on � final refined summary (steps)"
original_path: "JAVA/Adv_Java/0.1_How_Java_code_runs_.md"
---


## 🧭 Final Refined Summary (Steps)
1. JVM: starts New JVM Process (cmd: java MyApp)
2. JVM: Core classloaders initialized
3. JVM: MyApp.class is loaded
4. JVM: Bytecode is verified
5. JVM: Memory (heap, stack, metaspace) is allocated
6. JVM: Main thread is created
7. JVM: main() method is invoked
8. JVM: Bytecode is executed via interpreter or JIT
9. JVM: GC and other runtime services run in background
10. JVM: exits when program ends

```
+-----------------------------+
|     Run: java MyApp        |
+-----------------------------+
              |
              v
+-----------------------------+
|   New JVM Process Starts    |
|  (Loads runtime libraries)  |
+-----------------------------+
              |
              v
+-----------------------------+
|   Initialize ClassLoaders   |
| - Bootstrap (3)             |
| - Extension (2)             |
| - Application(1)            |
+-----------------------------+
              |
              v
+-----------------------------+
|   Load MyApp.class          |
|   (From classpath)          |
+-----------------------------+
              |
              v
+-----------------------------+
|   Bytecode Verification     |
|   (Safe? Valid? Well-formed?)|
+-----------------------------+
              |
              v
+-----------------------------+
|   Memory Areas Allocated    |
| - Heap                      |
| - Stack (per thread)        |
| - Metaspace                 |
| - PC Register               |
| - Native Stack              |
+-----------------------------+
              |
              v
+-----------------------------+
|   Main Thread Started       |
| → Calls: main(String[] args)|
+-----------------------------+
             |
 Instructions cause memory allocation:
   - new → Heap
   - method call → Stack
              |
              v
+-----------------------------+
|   Bytecode Execution        |
| - Interpreter               |
| - or JIT (HotSpot)          |
+-----------------------------+
              |
              v
+-----------------------------+
|   Runtime Services          |
| - GC, Thread Mgmt, etc.     |
| - I/O, Exceptions           |
+-----------------------------+
              |
              v
+-----------------------------+
| Program Ends                |
| - main() done               |
| - All non-daemon threads end|
+-----------------------------+
              |
              v
+-----------------------------+
| JVM Shutdown                |
| - Runs shutdown hooks       |
| - Frees memory              |
+-----------------------------+
```

## ✅ Corrected Statement (Use This):
JVM allocates Heap and Stack memory before execution, and memory is used dynamically at runtime based on .class bytecode execution, not just verification.