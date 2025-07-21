---
layout: post
title: "How an Operating System Loads"
date: 2025-07-21
categories: [operating-systems, 0-2-how-os-loads--md]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on how an operating system loads"
original_path: "1_OS/0.2_How_OS_loads_.md"
---

# How an Operating System Loads

When you power on your computer, a series of steps occur to load the operating system. Here's a breakdown:

## Power Supply to CPU

When you power on your computer, the power supply unit provides electricity to the central processing unit (CPU) and other components.

## BIOS/UEFI Firmware

The Basic Input/Output System (BIOS) or Unified Extensible Firmware Interface (UEFI) firmware is the first piece of software that gets executed. It resides on a chip on the motherboard and is responsible for initializing and configuring essential hardware components.

## Hardware Check (POST)

The firmware performs a Power-On Self-Test (POST), which is a series of diagnostic checks to ensure that critical hardware components such as the CPU, memory, and storage are functioning correctly.

## OS Loading (Bootloader)

After the successful completion of POST, the firmware looks for the bootloader on the designated boot device (usually the system drive). The bootloader is a small program that loads the necessary files for the operating system into memory.

## BIOS/UEFI Hands Over Control

Once the bootloader loads the operating system, the BIOS/UEFI firmware's role diminishes. It hands over control to the operating system, which then takes charge of managing the system resources and running applications.

## BIOS/UEFI Stops

While the operating system is running, the BIOS/UEFI firmware is no longer actively involved in the day-to-day operations of the system. It remains in a dormant state until the next restart or power cycle.

In summary, the firmware (BIOS/UEFI) plays a crucial role in the early stages of the boot process, initializing hardware and facilitating the loading of the operating system. Once the operating system is successfully loaded, the firmware's role diminishes, and the operating system takes control of the system. The firmware doesn't actively run or participate in the ongoing operations of the operating system.



### [ Firmware and Bootloader: not part of OS]

so general process is  

power supply --> cpu goes to
--> RESET Vector on memory for initial instructions
--> CPU executes instructions [ which points to the initial 
    code stored in the system's firmware] 
--> BIOS/UEFI firmware 
    (Unified Extensible Firmware Interface)
--> initializes essential hardware components
--> performs power-on self-tests (POSTs), and configures 
    the system for booting
--> the firmware locates and loads the bootloader 
    from the boot device's boot sector into memory (RAM)
    [The bootloader's location is typically specified by 
    the firmware configuration or boot order settings]
--> Once loaded into memory, the bootloader takes control 
    of the system.
--> primary task is to locate and load the operating 
    system kernel into memory from the boot device
--> After loading the kernel, the bootloader hands over 
    control to the operating system kernel
--> The kernel initializes the remaining system components, 
    mounts the root file system, and starts the 
    user-space initialization process.
--> BIOS/UEFI stops--> OS takes over all system



