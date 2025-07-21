---
layout: post
title: "Key Differences: Heap vs Stack"
date: 2025-07-21
categories: [operating-systems, 9-2-0-stack-vs-heap--md]
tags: [concurrency]
author: "GGurkhude"
excerpt: "Learning notes on key differences: heap vs stack"
original_path: "1_OS/9.2.0_Stack_vs_heap_.md"
---

# Key Differences: Heap vs Stack

Both Heap and Stack are memory regions used in a program, but they serve different purposes and have different characteristics.

1. **Memory Type**:
   - **Stack**: Constant memory managed by the CPU.
   - **Heap**: Dynamic memory managed by the programmer.

2. **Purpose**:
   - **Stack**: Used for function calls and local variables.
   - **Heap**: Used for dynamic memory allocation.

3. **Management**:
   - **Stack**: Managed automatically by the CPU.
   - **Heap**: Managed manually by the programmer.

4. **Lifetime**:
   - **Stack**: Memory is automatically deallocated when the function call returns.
   - **Heap**: Memory persists until explicitly deallocated by the programmer.

5. **Usage in Processes and Threads**:
   - **Heap**: Common for both processes and threads.
   - **Stack**: Different for each process and thread. One process can have multiple threads, each with a different stack, but they all share the same heap.

## ---------------------------------------------------

### Key Differences: in Heap and Stack

1) : both are Memory Region
2) Stack: constant Memory ( managed by CPU )
  - Heap : Dynamic memory ( managed by programmer)

3) Purpose: 
   - The stack is used for function calls and local 
   - variables, while the heap is used for dynamic memory allocation.

4) Management:  
    - The stack is managed automatically by the CPU, 
    - while the heap is managed manually by the programmer.

5) Lifetime: 
    - Memory on the stack is automatically deallocated 
      when the function call returns, 
    - while memory on the heap 
      persists until explicitly deallocated by the programmer.

6) HEAP: common for Process and threads
   Stack : different for Process and thread
7) IMP:  One process can have multiple threds means 
       different Stack but they share same Heap 