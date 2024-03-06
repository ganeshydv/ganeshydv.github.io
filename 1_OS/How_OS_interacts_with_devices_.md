

--> POWER_ON
--> BIOS/UEFI FIrmware start
--> Checks HARDWARE
--> RAM,GPU,INTTERUPT Controller
--> each Hardware has it's own firmare and controller
  stored on it's own chip in ROM 
  - this checks and starts each hardware controller
  so it becomes ready for Operations
--> LOAD BootLoader 
--> initializes essential Hardwares EX: the memory controller, 
set up the interrupt controller, or 
configure the graphics card.
EX: How OS interacts with DEVICE
  OS: { Device Driver } --> Hardware: { Device Controller:[Firmarware] }
[
    in Depth: 
    1) the device driver loads the appropriate registers
within the device controller based on Operation 
    2) controllers takes action based on Register
    3) controller --> transfer data in it's buffer
    4) when transfer completes controller
       informs Device driver by software interrupt call
    5) controller may return Pointer of Register 
    6) Device Drivers return COntrol to OS
    7) [DMA]: Direct memory Access:
      why? for every intersaction with device it 
      creates interrupt which is not good 
      as it creates problem for large operations
      other process needs to wait so DMA is used
      - After setting up buffers, pointers, and counters 
      for the I/O device, the device controller 
      transfers an entire block of data directly to or 
      from its own buffer storage to
      memory, with no intervention by the CPU
      - fast as only one interrupt is used.
]
--> Locate on DISK & Loads OS Kernal in RAM
--> 