
## Node = V8 engine + Libuv 

### 1. V8 Engine : 
  - 1. compiles js code and converts into machine code
  - 2. executs SYNC code only 
  - 3. handles PROMISES as well
  - 4. garbage collection

```typescript
+--------------------+
|  JavaScript Code   |  (Source Code)
+--------------------+
          |
          v
+--------------------+
| Abstract Syntax    |  (AST)
| Tree (AST)         |
+--------------------+
          |
          v
+--------------------+
| Intermediate       |  (IR)
| Representation     |
+--------------------+
          |
          v
+--------------------+
|  Machine Code      |  (Native Machine Instructions)
+--------------------+
          |
          v
+--------------------+
|  CPU Execution     |  (Execution by the CPU)
+--------------------+

```

#### How V8 Executes JavaScript Code
##### 1. Parsing:

V8 first parses the JavaScript source code. It converts the code into an Abstract Syntax Tree (AST), which represents the code structure in a tree-like format.
##### 2. Compilation:

V8 then compiles the AST into Intermediate Representation (IR). The IR is a lower-level, more optimized representation of the code.
##### 3. Optimization:

V8 uses Just-In-Time (JIT) compilation to further optimize the IR into machine code. The JIT compiler converts the IR into native machine code (binary instructions that the CPU can execute directly).
##### 4. Execution:

The compiled machine code is then executed by the CPU. This is the actual process where the CPU performs the operations as dictated by the binary instructions.
##### 5. Garbage Collection:

V8 also handles memory management through garbage collection. It automatically manages memory allocation and deallocation to optimize performance and prevent memory leaks.

# Libuv and V8

```typescript
+--------------------------+
|  Main Thread             |
|                          |
|  +--------------------+  |
|  |    V8 Engine       |  |  (JavaScript Execution)
|  |  - Executes code   |  |
|  |  - Manages event   |  |
|  |    loop and        |  |
|  |    microtasks      |  |
|  +--------------------+  |
|                          |
|  +--------------------+  |
|  |    libuv           |  |  (Asynchronous Task Management)
|  |  - Manages I/O     |  |
|  |  - Schedules       |  |
|  |    macrotasks      |  |
|  |  - Uses thread pool|  |
|  +--------------------+  |
|                          |
+--------------------------+


```


