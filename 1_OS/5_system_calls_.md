# System Calls

A system call is responsible for communication between User Space and the Kernel. It is the only way to transition from user space to kernel space.

## Examples of System Calls

### Example 1: Creating a Folder

Let's say a user wants to create a folder. The steps involved are:

1. **User Space**: The user runs the `mkdir` command.
2. **System Call Interface (SCI)**: This command goes to the SCI.
3. **SCI to Kernel**: The SCI tells the Kernel to find and run the function associated with `mkdir`.
4. **Kernel**: The Kernel runs the associated function (which may be written in C) with `mkdir`.

### Example 2: Running an Executable File

When a user runs an executable (`.exe`) file, the following steps occur:

1. **User Space**: The user runs the application.
2. **SCI**: The SCI sends the respective instructions to the Kernel.
3. **Kernel**: The Kernel starts a new process, assigns memory, and performs any necessary operations.
4. **Software Interrupt**: A switch from User Space to Kernel Space occurs.

## Types of System Calls

There are several types of system calls, including:

1. Process Management System Calls
2. File Management System Calls
3. Device Management System Calls
4. Communication Management System Calls
5. Information Management System Calls

### ------------------------------------------------------------------
System call:

- it is responsible for comminucation between User_Space and Kernal
- System calls only way to go from user space to kernal space

Ex: 1) lets say user wants to create a folder
    steps: 1) In User_Space : runs mkdir cmd 
           2) this goes to SCI i.e. System Call Interface
           3) SCI tells Kernal to find and run associated function with mkdir
           4) Kernal runs associated function (may be written in C) with mkdir

Ex. 2) user runs a .exe file
    steps: 1) User_Space : user runs applications
           2) SCI tells respective instructions
           3) Kernal : 1. start new process
                       2. assigns memory
                       3. respective operations if required
           4) software Interrupt : switching from User_Space to kernal

-----------------------------------
> Types of System Calls:

1] process management SC
2] File management SC
3] Device management SC
4] comminucation management SC
5] Information management SC
