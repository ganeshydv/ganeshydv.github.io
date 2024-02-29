
Node: single thread:

IO OPs: goes to EVENT loop
--> Event Loop: LibVu Library in Cpp
--> It uses io_uring: it's a data structure:
 which is used for handling Request
: this io_uring is used to interact between 
user space and kernal space of OS
instead of SYSTEM calls which makes 
process fatser 
(if use system calls it makes process slow)
: why fast?

1) Ring Buffers: A ring buffer is a data 
structure that allows data to be written 
and read in a circular manner. 
It consists of a fixed-size buffer 
with two pointers: one for reading (consumer) 
and one for writing (producer).
- There are 2 ring buffers, one for 
submission of requests (submission 
queue or SQ) and the other that 
informs you about completion of those 
requests (completion queue or CQ).

2) Kernel-User Space Communication:
- These ring buffers are shared between kernel and user space
- With io_uring, the main interface for I/O
operations is a pair of ring buffers:
- one for submitting I/O requests from 
user space to the kernel (submission queue) and 
another for receiving completions from the 
kernel back to user space (completion queue).

3) Reduced System Calls: Instead of making 
individual system calls for each I/O operation, 
applications can submit multiple I/O requests 
to the submission queue in a batch. 
The kernel processes these requests asynchronously, 
completing them in the background without 
requiring additional system calls.

4) Polling Mode: Additionally, io_uring supports 
a polling mode, where applications can continuously 
poll the completion queue for completed I/O operations, 
reducing the need for additional system calls to 
check for completion status.
==========================================================
why io_uring fast ?
Because of the shared ring buffers between the 
kernel and user space, io_uring can be a zero-copy system. 
Copying bytes around becomes necessary when 
system calls that transfer data between kernel 
and user space are involved. But since the bulk 
of the communication in io_uring is via buffers 
shared between the kernel and user space, 
this huge performance overhead is completely 
avoided