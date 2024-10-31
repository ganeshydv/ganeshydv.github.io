
# How OS Interacts with Devices

## Boot Process

1. **Power On**: The system powers on.
2. **BIOS/UEFI Firmware Start**: The BIOS/UEFI firmware starts up.
3. **Hardware Check**: The firmware checks the hardware, including RAM, GPU, and the interrupt controller.
4. **Hardware Firmware and Controller**: Each hardware component has its own firmware and controller stored on its own chip in ROM. This checks and starts each hardware controller so it becomes ready for operations.
5. **Load BootLoader**: The bootloader is loaded.
6. **Initialize Essential Hardware**: Essential hardware components, such as the memory controller, interrupt controller, and graphics card, are initialized.

## OS Interaction with Device

The OS interacts with the device through the device driver and the hardware through the device controller and firmware.

In depth:

1. The device driver loads the appropriate registers within the device controller based on the operation.
2. The controller takes action based on the register.
3. The controller transfers data in its buffer.
4. When the transfer completes, the controller informs the device driver by a software interrupt call.
5. The controller may return a pointer of the register.
6. The device drivers return control to the OS.

## Direct Memory Access (DMA)

DMA is used for every interaction with the device. It creates an interrupt which can create problems for large operations as other processes need to wait. 

After setting up buffers, pointers, and counters for the I/O device, the device controller transfers an entire block of data directly to or from its own buffer storage to memory, with no intervention by the CPU. This is fast as only one interrupt is used.

## Load OS Kernel in RAM

The OS kernel is located on the disk and loaded into RAM.

# ----------------------------------------------

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
      why? for every interaction with device it 
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