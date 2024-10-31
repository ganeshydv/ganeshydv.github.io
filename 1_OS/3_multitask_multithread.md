# Understanding Processes and Threads

- **Process**: A process is a running program. The CPU divides RAM/memory and allocates it to the process.

- **Subprocesses**: Within a single process, there can be multiple subprocesses. If these subprocesses are independent of each other, we can write logic to execute them using threads. This allows each thread to execute in parallel, saving time.

- **Memory Allocation**: These subprocesses receive memory allocation within the main process's memory allocation. In other words, the RAM allocated to the main process is further divided among the subprocesses.

--------------------------------------------------------------------

###  Process: It's a running program

- CPU divides RAM/ memory and gives to Process
- in one Process there can be multiple subprocessthese subprocess if independent on each other we can write logic to execute them using THREADSthen each thred will execute them in PARALLELi.e. time saving
- these subprocess gets memory allocation in main Process's memory allocation i.e.main Process's RAM will be divided 