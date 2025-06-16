## Resident Set Size:
- Measures Process Memory-`Code + Stack + Heap + Files_loaded_in_RAM_by_process`
- Each process have thir own RSS.
- Worker threads will have own RSS

### RSS (Resident Set Size) only measures the physical memory (RAM) currently used by your Node.js process, including:
   - Code segment (your app and dependencies)
   - Stack
   - Heap (objects, variables, etc.)
   - Memory-mapped files (e.g., native modules)
### RSS does not include:

- Memory used by other processes (like child processes or external worker threads not in the same process)
- Disk I/O buffers outside your process
- Kernel-level I/O buffers
- Memory used by OS-level threads not managed by your Node.js process
### For Node.js worker threads:
- If you use the worker_threads module, each worker is a separate Node.js process with its own RSS. The main process’s RSS does not include the memory used by worker threads; you’d need to measure each worker’s RSS separately.
### For I/O:

- RSS does not include disk I/O buffers managed by the OS or files being read/written outside your process’s memory space.

----

## Heap Total
- heapTotal in process.memoryUsage() is `not the specific heap size` given to the process, but rather the `total size of the allocated JavaScript heap at that moment`.
### What does heapTotal mean?
- It represents the total amount of memory (in bytes) currently allocated for the V8 JavaScript heap.
- This is the memory available for JavaScript objects, strings, closures, etc.
- It can grow or shrink as the process runs, depending on memory needs and garbage collection.

### Is it the maximum heap size?
- `No`. The maximum heap size is set by Node.js (and can be changed with --max-old-space-size), but heapTotal is just the current allocation, not the limit.
- If your app needs more heap, `V8 may increase heapTotal` up to the maximum allowed.

> heapTotal = current allocated JS heap size (not the max, not a fixed limit).

> It shows how much heap memory Node.js is currently using for JS objects, not the total memory used by the process