# How the Operating System Boots Up

The booting process of an operating system involves several steps:

## 1. Power On

When you power on your computer, the CPU gets activated.

## 2. CPU Loads BIOS/UEFI (Firmware)

The CPU initializes and goes to the BIOS/UEFI chip. The BIOS/UEFI runs tests and initializes the hardware. This process involves:

- Loading settings from a memory area, which is backed by the CMOS battery.
- Loading the BIOS/UEFI program to test if the hardware is working. This is known as the Power-On Self-Test (POST).

## 3. BIOS/UEFI Hands Off to Boot Device

The BIOS/UEFI hands off control to the boot device, which could be a disk, CD, or USB device. This device contains a program known as the bootloader.

## 4. Bootloader

The bootloader is a program that loads the operating system onto the system. It can be located in one of two places:

- **Master Boot Record (MBR)**: This is at the 0 index of the disk. It was used in older systems and is associated with BIOS.
- **EFI Partition**: This is a partition of the disk that stores the bootloader. It is associated with UEFI.

## 5. Bootloader Loads the Full OS

The bootloader loads the full operating system. The specific program used depends on the operating system:

- Windows: `bootmgr.exe`
- macOS: `boot.efi`
- Linux: `GRUB`

### --------------------------------------------------------
### How OS boots Up ?

====================
Steps:
1) Power On:
2) CPU loads BIOS/UEFI ( Firmware )
    1. cpu init
    2. goes to BIOS/UEFI chip 
    3. BIOS/UEFI run tests and init Hardware
    3.1 Loads setting from memory area --> Backed by CMOS Battery
    3.2 load BIOS/UEFI program --> tests HARDWARE is working
        - POST : Power On Self Test
    4. BIOS/UEFI hands off to boot Device: Disk,CD,USB device
    - boot device have BootLoader which is a program
    - Bootloader:program which loads OS on System
    - where Bootloader exists:
      -1. MBR (In BIOS) - master boot record 
     this is at 0 inde of disk it was in OLD system
      -2. EFI (In UEFI) - 
      this is a partion of DISK which stores bootloader
    5. Bootloader loads the full OS 
    - in Windows bootmgr.exe
    - mac : boot.efi
    - Linux - GRUB 





