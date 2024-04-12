# Understanding Processes

A process is a running program or program under execution, created by the OS in Kernel Space.

## What Happens When a Program Becomes a Process?

1. The process is created in Kernel space by the OS.
2. The program and static data are loaded into memory (RAM).
    - Static data is used for initialization.
3. A runtime stack is allocated.
    - The stack is a part of memory used for local variables, arguments, and return values.
4. Heap is allocated.
    - The heap is a part of memory used to store dynamic data.
5. I/O tasks are handled.
    - In Unix, three task handlers are generated: Input, Output, and Error.
6. The OS hands off control to the `main` method, which starts execution.
    - The `return` statement stops execution.

Each process has a parent process.

### ------------------------------------------------

Process : running Programm or programm under execution
: Created by OS in Kernal Space
======================

what happens between Program becomes Process ?
-process is created in Kernal space by OS
1) load program and static data to memory [RAM]
    - static data : used for initialization
2) allocate run time STACK 
    - stack : part of memory used for local var,
            args, return values
3) Allocate HEAP : part of memory to store dynamic data
4) I/O TASK : in unix 3 Tasks Handler generated 
    - 1) Input 2) Output 3) Error
5) OS handoff control to Main method() which start execution
 -- return statement stops execution

### Each Process has Parent Process

==========================
 ### Architecture OF Process:
==========================
     __________
     | Stack  |
     |________|
     |  ..    |
     |  ..    |
     |________|
     | Heap   | -> Stack overflow error: when continuesly creates new stack and it reaches size of HEAP this error will be thrown (need base case)
     |________|   Out OF Memory Error-Circular Depedency-: when new Heap is allocated continously it reaches size of Stack this error will be thrown (create objects wisely)
     | DATA   | -> Gloabl & Static Data
     |________|
     | Text   | -> compiled code
     |________|
     

- **Stack**: This is a part of memory used for local variables, arguments, and return values. A Stack overflow error occurs when continuously creating new stacks and it reaches the size of HEAP. This error can be avoided by using a base case.
- **Heap**: This is a part of memory used to store dynamic data. An Out Of Memory Error or Circular Dependency error occurs when new Heap is allocated continuously and it reaches the size of Stack. This error can be avoided by creating objects wisely.
- **DATA**: This section contains Global & Static Data.
- **Text**: This section contains the compiled code.

# Process Control Block (PCB)

The Process Control Block (PCB) is a data structure in Kernel Space used by the Operating System (OS) to manage and track each process. During context switching, data is stored in the PCB.

## PCB Structure

The PCB consists of the following components:

1. **Process ID (PID)**: This is a unique identifier for each process.
2. **Program Counter (PC)**: This is the address of the register of the assembly code line of the program. The CPU executes this code line by line, remembering which line it's on and loading stored instructions from that register. The program counter is another CPU register that stores the memory address of the next instruction to be executed.
3. **Stack Pointer**: This points to the top of the execution stack. It only changes when PUSH/POP operations occur.
4. **Heap Pointer**: This points to the start of the process's heap, which is a region of memory used for dynamic memory allocation.
5. **Process State**
6. **Priority**
7. **Open File List**
8. **Open Device List**
9. Other attributes include program code, data, stack, heap, file descriptors, memory mappings, and more.


### -----------------------------------------------------------------


### Each Process has Parent Process

==========================
 ### Architecture OF Process:
==========================
__________
| Stack  |
|________|
|  ..    |
|  ..    |
|________|
| Heap   | -> Stack overflow error: when continuesly creates new stack and it reaches size of HEAP this error will be thrown (need base case)
|________|   Out OF Memory Error-Circular Depedency-: when new Heap is allocated continously it reaches size of Stack this error will be thrown (create objects wisely)
| DATA   | -> Gloabl & Static Data
|________|
| Text   | -> compiled code
|________|

======================================
      Attributes of Process
======================================

1] [PCB] : a data structure
- OS manages Each Process so It is Obvious it
mainatins track record for each of them but where
in PROCESS CONTROL BLOCK ( PCB - is a Data Structure).
in Kernal Space
- in context switching data must be stored somewhare 
  it is stored in PCB
- OS uses PCB to find Process and manage it
- PCB structure: 
  - 1. Process ID [PID] : UID of Process
  - 2. Program Counter [PC]: address of register of ASSEBLY CODE LINE of Program 
        - as CPU executes this code line by line it remember which line 
        it's on and loads stored instrcutions from that register
        - The program counter is another CPU register 
        that stores the memory address of the next instruction to be executed.
  - Stack Pointer : Points to TOP of Execution Stack (when PUSH/POP then only changed)
  - Heap Pointer : points to the start of the process's heap, 
                  which is a region of memory used for dynamic memory allocation.
  - 3. Process State
  - 4. Priority
  - 5. Open File List
  - 6. Open Device List
  - 7. program code, data, stack, heap, file descriptors, 
  memory mappings, and other attributes.

