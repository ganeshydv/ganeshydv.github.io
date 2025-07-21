---
layout: post
title: "Operating System Components"
date: 2025-07-21
categories: [operating-systems, 4-os-components--md]
tags: [concurrency]
author: "GGurkhude"
excerpt: "Learning notes on operating system components"
original_path: "1_OS/4_OS_components_.md"
---


# Operating System Components

The Operating System (OS) consists of two main components:

1. User Space
2. Kernel

The equation can be represented as: `OS = User Space + Kernel`

## User Space

User Space includes the Graphical User Interface (GUI) and Command Line Interface (CLI).

## Kernel

The Kernel communicates with hardware and is responsible for:

- Process management (start/stop/schedule)
- Process and thread scheduling
- Context switching
- Time management of processes and threads
- Inter-process communication
- Memory management (RAM) - allocation, de-allocation, free space management
- File management (Hard disk) - directory and file creation
- I/O devices management - spooling, buffering, caching
- Handling interrupts for process switching

There is always switching between Kernel space and User Space. For example, when you use the command `mkdir dir`, it is in user mode. But when you hit enter, it goes to the kernel mode. This switch is facilitated by software interrupts.

The main tasks of the kernel are:

1. I/O management
2. File management
3. Process management
4. Memory management

## Types of Kernels

There are three main types of kernels:

1. **Monolithic Kernel**: All functions are performed by the kernel itself. It communicates fast as all functions are in the kernel, but it has a single point of failure, making it less reliable. Examples include Linux, Unix, MS-DOS.

2. **Micro Kernel**: File management and I/O management are handled in User Space, while process management and memory management are handled in the kernel. This makes the kernel less busy, faster, and more reliable than a monolithic kernel.

3. **Hybrid Kernel**: This is a combined approach of monolithic and micro kernels. File management is handled in User Space, while process, memory, and I/O management are handled in the kernel space. Examples include macOS and all Windows versions after Windows 7.

Other types of kernels include Nano Kernel and Exo Kernel.

## General Process

The general process of communication in an OS is: `User Space --> Kernel --> Hardware`

User Space applications communicate with the kernel using system calls. A system call is a mechanism or medium between User Space and the Kernel.

### --------------------------------------------------------------

OS has 2 Components:
1) user space
2) Kernal

 [ OS = User Space + Kernal ]

User Space = GUI + cli
Kernal = comminucates with Hardware 
- process management - start/stop/schedule
- process and thread schedule
- context switching , 
- time management of process, thread
- process comminucation between process
- memory management (RAM) - allocation, de-allocation, free space management, 
- file management ( Hard disk )- dir,file,- create,
- I/O devices management- spooling ,buffering, caching
- when working on something but want to stop and start new process it is done by Interrupt
  and software do this it uses Interrupt
- There is always switching between kernal space and User_Space 
  ex: when u use ; mkdir dir_ this is in user mode but when hit enter it will go to kernal and this is Interrupt
  so it is done because or by help of Interrupt of software - this is switching between user mode and kernal mode
- main tasks of kernal:
  1] I/O management
  2] file management
  3] process management
  4] memory management
- types: 3 
    1] monolithic Kernal (oldest)- all functions to be done by Kernal itself not gives someone else to do that task
       - comminucates fast as all functions are in Kernal
       - but single point of failure so less relaibale 
       ex; Linux, Unix, MS-dos
    2] Micro Kernal:
       - file management, I/O management: User_Space
       - process management, memory management : Kernal
       - pros: kernal less buily/ busy - fast , relaibale than monolithic kernal
    3] hybrid kernal:
       - combined approach monolithic and Micro
       - User_Space: file management
       - Kernal space: 1)process 2) memory 3) I/O management
       ex: mac os, windows all (after 7)
    - other kernal: 4] Nano 5] Exo kernal
general process:

User_Space --> Kernal --> Hardware

Q] how User_Space applications comminucates with kernal ? using System call
 - System call is mechanism or medium between User_Space and Kernal