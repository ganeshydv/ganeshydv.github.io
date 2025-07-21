---
layout: post
title: "What is BIOS"
date: 2025-07-21
categories: [operating-systems, 0-1--os---md]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on what is bios"
original_path: "1_OS/0.1__os__.md"
---

# What is BIOS

BIOS stands for Basic Input/Output System. It is a firmware that resides on a chip on the computer's motherboard. The BIOS is essential for the computer's initial startup and hardware initialization process. Its primary functions include:

## Power-On Self-Test (POST)

The BIOS performs a series of diagnostic tests to check if the essential components like the processor, memory, storage, and other hardware components are functioning correctly.

## Bootstrap Loader

After the POST, the BIOS searches for the bootloader, which is a small program responsible for loading the operating system into the computer's memory.

## System Initialization

The BIOS initializes various system devices such as the graphics card, USB controllers, and other peripherals during the boot process.

## CMOS Setup

The BIOS stores configuration settings in a small piece of non-volatile memory called CMOS (Complementary Metal-Oxide-Semiconductor). Users can access the CMOS setup utility to configure system settings, such as boot order, system date and time, and hardware parameters.

## BIOS/UEFI Settings

Users can access the BIOS settings during the boot process by pressing a specific key (commonly Del, F2, F10, or Esc) to enter the BIOS setup. In modern systems, the traditional BIOS has been largely replaced by UEFI (Unified Extensible Firmware Interface), which offers a more advanced and user-friendly interface.

## BIOS Updates

Manufacturers release BIOS updates to provide compatibility with new hardware, improve system stability, and fix security vulnerabilities. Users can update the BIOS firmware to take advantage of these improvements.

It's important to note that while the term "BIOS" is commonly used, many modern systems use UEFI instead. UEFI offers additional features and advantages over traditional BIOS, including support for larger hard drives, faster boot times, and a more advanced user interface. Despite this, people often still refer to the firmware settings as the "BIOS" out of habit.

---------------------------------------------------

## do UEFI is upgraded version of BIOS- yes

# UEFI vs BIOS

UEFI (Unified Extensible Firmware Interface) is often considered as the modern and more advanced successor to the traditional BIOS (Basic Input/Output System). While both BIOS and UEFI serve similar fundamental functions, UEFI offers several improvements and additional features over the older BIOS system. Here are some key differences:

## Graphical User Interface (GUI)

UEFI typically provides a graphical user interface, making it more user-friendly and allowing users to interact with firmware settings using a mouse and a visual interface. In contrast, BIOS usually relies on a text-based interface.

## Boot Process

UEFI supports faster boot times and can work with larger hard drives, surpassing the limitations of the older BIOS system. It uses the GPT (GUID Partition Table) for partitioning, which allows for larger and more efficient disk management compared to the MBR (Master Boot Record) used by BIOS.

## Secure Boot

UEFI introduces Secure Boot, a security feature that ensures the system only boots with signed and authenticated operating system loaders and firmware. This helps protect against malware and unauthorized operating system loaders.

## Networking Capabilities

UEFI has built-in networking capabilities, allowing the system to connect to the internet even before the operating system is loaded. This can be useful for tasks such as firmware updates.

## Compatibility

UEFI is designed to be more extensible and flexible, supporting modern hardware standards. It is better equipped to handle the demands of contemporary computing environments.

While UEFI is more advanced and provides several benefits, the term "BIOS" is still commonly used colloquially to refer to firmware settings. Many people use the terms interchangeably, even though UEFI is a distinct technology. The transition from BIOS to UEFI has been occurring in the computing industry over the years. and most modern systems now come with UEFI firmware.

==============================================================

### so do firmware is software which start first as soon as power is supplied to motherboard : yes

# Understanding Firmware

Firmware is a type of software that is embedded into hardware. It plays a crucial role in the functionality of electronic devices, including computers. When you power on a computer, the firmware is the first software that is executed, initializing and coordinating the hardware components during the boot process.

The firmware resides on a chip on the motherboard and is responsible for tasks like:

## Power-On Self-Test (POST)

This process involves checking the essential hardware components to ensure they are functioning properly.

## Bootstrap Loader

The firmware is responsible for locating and loading the bootloader, which is a small program responsible for starting the operating system.

## System Initialization

During this phase, the firmware initializes and configures various hardware components, such as the processor, memory, and storage devices.

## Firmware Settings

The firmware provides a user interface (text-based or graphical) for configuring system settings, including boot order, date and time, and hardware parameters.

In the context of PCs, the terms "BIOS" (Basic Input/Output System) or "UEFI" (Unified Extensible Firmware Interface) are often used to refer to the firmware. These are specific types of firmware that are responsible for managing the system's basic input/output functions and settings.

In summary, firmware is a type of software that runs on a chip within the hardware, and it's the first software to execute when the power is supplied to the motherboard. It plays a critical role in the boot process and overall system functionality.

=====================================================================

### do the bootloader is present in all pc or laptops?

# Understanding Bootloaders

Virtually all personal computers and laptops have a bootloader. The bootloader is a small program or piece of code that is stored in a specific location on the computer's storage device (usually the hard drive or SSD) and is executed during the boot process. Its primary function is to load and start the operating system.

The bootloader is a critical component of the boot process, and without it, the operating system wouldn't be able to initialize and run. Different operating systems may have their own bootloaders. For example:

## Windows

Windows uses the Windows Boot Manager as its bootloader. The boot manager is responsible for presenting a menu (if you have multiple operating systems installed) and loading the necessary files to start the Windows operating system.

## Linux

Linux distributions commonly use GRUB (Grand Unified Bootloader) or a similar bootloader. GRUB allows users to choose from different installed operating systems or kernel versions.

## macOS

On Mac systems, the bootloader is part of the macOS firmware and is responsible for loading the macOS operating system.

The bootloader is typically installed during the operating system installation process. It is placed in a specific location on the storage device's boot sector or EFI system partition, depending on the system's boot mode (legacy BIOS or UEFI).

In summary, the bootloader is a standard component of the boot process on PCs and laptops, ensuring that the operating system is loaded into memory and executed when the computer is powered on.

=================================================================================
### so if there is uefi update or bios update do it will automatically update it self it is like auto upgrading right

# Updating UEFI or BIOS Firmware

Updating the UEFI or BIOS (Basic Input/Output System) firmware on a computer is typically a manual process. This is to ensure that users have control over the update process, as it carries some risk and requires careful adherence to the manufacturer's instructions.

Here's a general overview of how the firmware update process works:

## Check for Updates

Manufacturers periodically release updates to UEFI or BIOS firmware to provide improvements, new features, bug fixes, and security patches. Users need to check the manufacturer's website for their specific motherboard or system model to see if any updates are available.

## Download the Update

If a firmware update is available, users usually need to download the update file from the manufacturer's website. The update file is specific to the motherboard or system model.

## Prepare for Update

Before proceeding with the update, it's crucial to read the manufacturer's instructions and ensure that the system has stable power and won't be interrupted during the update process. Some systems may have a feature called Dual BIOS or similar, which provides a backup in case the update fails.

## Run the Update Utility

Many motherboard manufacturers provide a utility for updating the UEFI or BIOS firmware. This utility is often run from within the operating system, and users can follow on-screen instructions to apply the update.

## Restart the System

After applying the update, the system usually needs to be restarted for the changes to take effect. During the restart, the new firmware is loaded.

While some modern motherboards may have features like "Internet Flash" that allow firmware updates over the internet directly from the UEFI/BIOS interface, these features are often not enabled by default, and users may still need to initiate the update manually.

It's crucial to follow the manufacturer's instructions carefully when updating firmware, as an interrupted or incorrect update process could potentially lead to issues with the motherboard. Always make sure that the firmware update is compatible with your hardware and that you understand the potential risks before proceeding.

=============================================================================
### so these bios or uefi firware will be download and installed on chip just like other software but it is main software to start os so does it means os has access to this main firmware and do firware stops running after it loads os and checks all hardware working? : YES

# Understanding UEFI/BIOS and the Boot Process

Yes, you have the right understanding. The UEFI or BIOS firmware is indeed a piece of software that is stored on a chip (often a flash memory chip) on the motherboard. It is separate from the operating system and acts as the initial software that runs when the computer is powered on.

Here's a breakdown of the process:

## Power-On and Firmware Initialization

When you power on your computer, the UEFI or BIOS firmware is the first software that gets executed. It performs a series of checks and tasks during the Power-On Self-Test (POST) to ensure that essential hardware components are functioning correctly.

## Bootloader Execution

After the firmware initialization, the UEFI or BIOS looks for the bootloader, a small program stored on the storage device (HDD, SSD) that is responsible for loading the operating system. The bootloader is part of the OS installation.

## Operating System Loading

The bootloader loads the necessary files to start the operating system. Once the operating system is loaded into memory, it takes control of the system.

## Operating System Control

Once the operating system is running, it takes control of the computer's resources, and the firmware (UEFI/BIOS) is no longer actively involved in the day-to-day operation of the system.

The UEFI or BIOS firmware essentially acts as a bridge between the hardware and the operating system during the boot process. Once the OS is successfully loaded, the firmware's role diminishes, and it essentially stops running in the sense that it is no longer actively managing the system.

However, it's important to note that the firmware settings and configurations (such as boot order, system date and time, etc.) remain in effect until the next restart. Users can access the UEFI or BIOS settings to make changes even while the operating system is running, but these changes typically take effect upon the next system restart.

===========================================================================================================================================

### so it means once update is downloaded it will be replace previous firmware by new one and so is restart operation is independent of os and firmware as it is replacing firmware with new one and it means it is also a software so who starts this restart do os do this and can say restart is like firmware : Yes

# Firmware Update Process

Yes, you have the right idea. When you perform a firmware update (whether it's updating the BIOS or UEFI), the process typically involves replacing the existing firmware on the motherboard's flash memory with a newer version. This is akin to updating any other software on your computer, but it's specifically focused on the low-level system firmware.

Here's how the update process generally works:

## Download and Prepare Update

Users download the firmware update file from the manufacturer's website and follow any provided instructions. This file usually contains the updated firmware.

## Run the Update Utility

The user runs a firmware update utility, often provided by the motherboard manufacturer. This utility may run within the operating system and is responsible for applying the firmware update.

## Flash Memory Update

The firmware update utility writes the new firmware to the flash memory on the motherboard, replacing the existing firmware.

## Restart

After applying the firmware update, the user typically needs to restart the computer. This restart is crucial for the new firmware to take effect.

## POST and Bootloader

During the restart, the updated firmware goes through the Power-On Self-Test (POST) process, similar to the initial boot, ensuring that the hardware is functioning correctly. The firmware then proceeds to load the bootloader.

## Operating System Load

The bootloader, as before, loads the operating system into memory, and the operating system takes control of the system.

The restart operation is initiated by the user (either manually or as part of the firmware update process). During this restart, the firmware executes its usual initialization processes, and the updated firmware becomes active.

In summary, the restart operation is indeed independent of the operating system. It's a process that involves the firmware (UEFI/BIOS) initializing the hardware and, in the case of a firmware update, incorporating the changes from the updated firmware. The operating system is loaded only after the firmware completes its tasks during the boot process.

=========================================================================================
### so the utility has the access to all firm wares it means os has the access to all the firmwares right

# Firmware Update Process and Operating System Involvement

The utility used for firmware updates typically operates at a lower level than the operating system and communicates directly with the firmware (UEFI/BIOS) on the motherboard. While the operating system itself doesn't directly manage the firmware update process, the utility used for the update is a separate program that interacts with the firmware.

Here's the general flow:

## Firmware Update Utility

This utility is a specific program provided by the motherboard or system manufacturer. It operates independently of the operating system and interacts directly with the firmware. The utility is responsible for downloading the new firmware, initiating the update process, and writing the new firmware to the motherboard's flash memory.

## Operating System Involvement

During a firmware update, the operating system is typically not actively managing the process. The firmware update utility may be executed from within the operating system, but the utility itself handles the communication with the firmware.

## Restart and Firmware Initialization

After the new firmware is written to the flash memory, the user is usually required to restart the computer. During this restart, the updated firmware is loaded and initialized, a process that occurs before the operating system starts.

## Operating System Load

Once the firmware completes its initialization and checks during the Power-On Self-Test (POST), it proceeds to load the bootloader and subsequently the operating system.

In summary, while the firmware update utility is a separate program that manages the firmware update process, it doesn't grant direct access to the firmware for regular operations to the operating system. The firmware and its settings are managed by the firmware itself during the system boot process, and the operating system takes control only after the firmware completes its initialization tasks.

==================================================================================
### can u explain restart process does it means stop and start supply to cpu

# Understanding the Restart Process

When you initiate a restart on your computer, you're essentially instructing the system to go through a controlled shutdown and then start back up. Here's a simplified explanation of the restart process:

## User Initiation

You, as the user, initiate the restart either through the operating system's user interface (e.g., clicking on "Restart" in the Start menu) or by using a physical button on the computer case.

## Operating System Actions

The operating system receives the restart command and begins to shut down various processes and services. It notifies applications to close gracefully and saves any necessary data to the disk.

## Halt CPU and System Components

As part of the shutdown process, the operating system instructs the CPU to stop executing instructions, essentially bringing it to a halt. System components, including memory, are also prepared for the upcoming restart.

## Power Cycle

Once the system is in a halted state, the power to the entire system is momentarily cut off. This is a crucial step in the restart process. The power cycle ensures that all components are cleared and reset to their initial state.

## Power-On Self-Test (POST)

When power is restored, the system goes through the Power-On Self-Test (POST). This is a series of diagnostic checks performed by the firmware (UEFI or BIOS) to ensure that essential hardware components such as the CPU, memory, and storage are functioning correctly.

## Firmware Initialization

After the successful completion of POST, the firmware (UEFI or BIOS) initializes system components, sets up hardware parameters, and identifies the boot devices.

## Bootloader Execution

The firmware then looks for the bootloader on the designated boot device (usually the system drive). The bootloader is a small program responsible for loading the operating system.

## Operating System Load

The bootloader loads the necessary files for the operating system into memory, and the operating system takes control of the system.

## User Interface Restoration

Finally, the operating system restores user interfaces, applications, and services to their pre-restart state.

The restart process involves briefly cutting off power to the CPU and other components, followed by a systematic reboot. This allows for a fresh start of the system, clearing any temporary states or issues that might have arisen during regular operation.

===========================================================================================
### so in this process do it checks for firmware update ? :NO

No, in the standard restart process, the system does not automatically 
check for firmware (UEFI or BIOS) updates. The restart process primarily 
involves shutting down the operating system, powering off the system, 
and then restarting it, going through the Power-On Self-Test (POST) 
and boot process.

Firmware updates are typically a separate process initiated by the user. 
If you want to update the firmware on your motherboard, you would need 
# Firmware Updates and System Restart

No, in the standard restart process, the system does not automatically check for firmware (UEFI or BIOS) updates. The restart process primarily involves shutting down the operating system, powering off the system, and then restarting it, going through the Power-On Self-Test (POST) and boot process.

Firmware updates are typically a separate process initiated by the user. If you want to update the firmware on your motherboard, you would need to follow specific steps, such as:

## Check for Updates

Visit the manufacturer's website for your motherboard or system to see if there are any new firmware updates available.

## Download Firmware Update

If updates are available, download the firmware update file provided by the manufacturer. This file usually comes with instructions on how to apply the update.

## Run Firmware Update Utility

Execute the firmware update utility, often provided by the motherboard manufacturer. This utility may run within the operating system, and it is responsible for writing the new firmware to the motherboard's flash memory.

## Restart

After applying the firmware update, you will usually be required to restart your computer. During this restart, the new firmware is loaded and takes effect.

The restart that occurs during a firmware update is a deliberate action taken by the user as part of the update process. It's not a routine system restart like the one initiated through the operating system's restart command. Firmware updates are important for improving system stability, adding new features, and addressing security vulnerabilities, but they are separate from the regular restart process.