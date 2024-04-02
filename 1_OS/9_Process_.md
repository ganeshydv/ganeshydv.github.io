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
==========================
Each Process has Parent Process

==========================
Architecture OF Process:
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

