---
layout: post
title: "Scheduler"
date: 2025-07-21
categories: [operating-systems, 10-1-scheduler--md]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on scheduler"
original_path: "1_OS/10.1_scheduler_.md"
---

# Scheduler

The scheduler is a module that uses different data structures to handle which job needs to be moved from the Ready to Running state.

## Process State Queues

1. **Job Queue**: Queue for new processes. These are in RAM or Disk.
2. **Ready Queue**: Queue for ready processes. The degree of multi-programming determines how many processes can stay in the Ready Queue at a time. The ready queue is typically implemented as a data structure in memory, such as a priority queue or a FIFO queue.
3. **Waiting Queue**: Queue for processes that are waiting for some operation to complete.

## Transition Between States

1. **Job Scheduler/Long-Term Scheduler**: Moves jobs from the New state to the Ready state (Program from Disk to RAM). Transfers jobs from the Job Queue to the Ready Queue.
2. **CPU Scheduler/Short-Term Scheduler**: Moves jobs from the Ready state to the Running state. Dispatches jobs to the CPU, done by the Scheduler Dispatcher.
3. For other states, different components may be responsible for the transition, such as the scheduler, I/O subsystem, and process management facilities.

## Key Points About Schedulers in Operating Systems

- **Module or Component**: The scheduler is typically implemented as a module or component within the operating system kernel. It is responsible for making decisions about which processes to run on the CPU and when to execute them.
- **Algorithms and Policies**: Schedulers employ various scheduling algorithms and policies to determine the order in which processes are executed. Examples of scheduling algorithms include First-Come, First-Served (FCFS), Shortest Job Next (SJN), Round Robin (RR), and Priority Scheduling.
- **Data Structures**: Schedulers utilize data structures such as queues, lists, or trees to maintain information about processes in the system and to facilitate efficient scheduling decisions. For example, ready queues are often used to store processes that are ready to execute.
- **Interaction with Other Components**: The scheduler interacts closely with other components of the operating system, such as process management, interrupt handling, and I/O subsystems. It coordinates CPU allocation with events such as process creation, termination, and I/O operations.
- **Dynamic Nature**: Schedulers adapt their behavior dynamically based on changing system conditions, such as CPU load, process priorities, and resource availability. They continuously monitor the system state and adjust scheduling decisions accordingly.

## --------------------------------------------

Schedualr : a module that uses differet data structure 
to handle which job needs to be moved from 
Ready to Running state
---------------------------------------
-------------------------------------------
Process State Queues :
 -
1) Job Queue : NEW process queue. [IN_RAM] ? Disk 
2) Ready Queue : Ready Proocess [IN_RAM]
  - Degree Of multi-programming : how many processes
    can stay in Ready Queue at a time
- The ready queue is typically implemented as 
a data structure in memory, such as a priority 
queue or a FIFO queue
3) waiting Queue

------------------------------------------------
 How Process goes from one state to another ?
------------------------------------------------
1) Job scheduler/ Long_Term Schedular : 
- Moves Jobs from NEW to Ready state
  [ Program from DISK to RAM ]
- Jobs from Job Queue -> to Ready Queue
2) CPU shcedular/ Short_Term Schedular :
- Moves Jobs from Ready state to Running 
 [ Dispateches Jobs to CPU done by Schedular Dispatcher ]
3) for other states:
- there may be different component responsible for transition
the scheduler, I/O subsystem, and process management 
facilities.etc
4) Medium Term schedular : 

---------------------------------------

Here are some key points about schedulers in 
operating systems:

Module or Component: The scheduler is typically 
implemented as a module or component within the 
operating system kernel. It is responsible for 
making decisions about which processes to run 
on the CPU and when to execute them.

Algorithms and Policies: Schedulers employ various 
scheduling algorithms and policies to determine 
the order in which processes are executed. Examples 
of scheduling algorithms include First-Come, 
First-Served (FCFS), Shortest Job Next (SJN), 
Round Robin (RR), and Priority Scheduling.

Data Structures: Schedulers utilize data structures 
such as queues, lists, or trees to maintain 
information about processes in the system and 
to facilitate efficient scheduling decisions. 
For example, ready queues are often used to 
store processes that are ready to execute.

Interaction with Other Components: The scheduler 
interacts closely with other components of the 
operating system, such as process management, 
interrupt handling, and I/O subsystems. It 
coordinates CPU allocation with events such 
as process creation, termination, and I/O operations.

Dynamic Nature: Schedulers adapt their behavior 
dynamically based on changing system conditions, 
such as CPU load, process priorities, and resource 
availability. They continuously monitor the system 
state and adjust scheduling decisions accordingly.