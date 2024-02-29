How OS boots Up ?

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





