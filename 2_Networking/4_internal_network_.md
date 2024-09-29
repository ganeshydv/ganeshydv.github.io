
# Internal Network Communication

Always remember: For a frame, both IP (for packet) and MAC are always necessary. A frame cannot be sent over local or external network if MAC and IP are unknown.
-----
## Device to Device Communication in Internal Network

1. A device, when it needs to communicate with another, first searches in its ARP (Address Resolution Protocol) table for the MAC address associated with the IP of the target device.
2. If the MAC address is not found, the device broadcasts a request to all devices in the local network asking for the MAC address associated with the target IP.
3. Once the MAC address is received, it is updated in the ARP table.
4. The device then creates a packet (at Network layer-3) and a frame (at Link layer-2) using the MAC address.
5. The frame is sent to the target device.
6. Upon receiving a response from the target device, the source IP is replaced with the destination IP to complete the response.

------
## Role of MAC and IP in Internal Network Communication

Communication within an internal network typically involves both MAC addresses and IP addresses. Here's how they work together to facilitate the exchange of data between devices:

### MAC Addresses (Data Link Layer - Layer 2)

- MAC addresses are used for communication within the local network.
- Devices on the same local network use MAC addresses to address frames to each other.

### IP Addresses (Network Layer - Layer 3)

- IP addresses are used for logical addressing and end-to-end communication across networks.
- Devices use IP addresses to route packets between different networks.
- In an internal network, IP addresses are crucial for devices to identify each other and communicate logically.

### ARP (Address Resolution Protocol)

- ARP is used within a local network to map an IP address to its corresponding MAC address.
- When a device needs to communicate with another device on the same local network and it knows the destination IP address but not the MAC address, it uses ARP to discover the MAC address associated with that IP address.

In summary, internal network communication involves both MAC addresses and IP addresses. Devices within the same local network use MAC addresses to address frames for direct communication, and ARP helps resolve the mapping between IP addresses and MAC addresses when needed.

However, in some scenarios, local communication might be facilitated solely by MAC addresses, especially in non-IP-based networks or specific network configurations. In modern networks that use IP, the combination of MAC and IP addresses is the standard for efficient and logical communication within and between networks.

## ARP Process

1. **Device A wants to communicate with Device B**: Device A knows the IP address of Device B and wants to send data to it within the local network.
2. **ARP Request**: Device A checks its ARP table to see if it already knows the MAC address associated with the IP address of Device B. If the MAC address is not in the ARP table, Device A broadcasts an ARP request on the local network, asking, "Who has the IP address of Device B?"
3. **Device B Responds**: Device B, recognizing its IP address in the ARP request, replies with its MAC address. This ARP response is unicast back to Device A.
4. **ARP Table Update**: Device A updates its ARP table with the MAC address of Device B, associating it with the known IP address.
5. **Data Transmission**: Now that Device A has the MAC address of Device B, it can construct a frame with the data and destination MAC address. The frame is then transmitted over the local network to Device B based on the MAC address.

In this way, ARP helps devices within the same local network discover each other's MAC addresses based on their IP addresses. Once the MAC address is known, devices can efficiently communicate through data frames within the local network.

It's important to note that ARP is specific to local networks, and it operates at the link layer (Layer 2) of the OSI model. It facilitates communication within a single broadcast domain or local subnet.


### ==================================================================

    Always remeber : for FRAME : IP ( for packet) + MAC always necessary 
    - frame can not be sent over local or external network if mac and Ip is unknown

---------------------------------------------------------
   A] Internal Network ( device to device )
---------------------------------------------------------

    Device --> Searching in ARP for MAC and IP ( if no MAC )
    --> decide IP in local Network (using subnet mask along with IP)
    --> if yes create packet ( Network layer-3 in device itself )
    --> now find mac --> if not ask for mac by borad casting to
    every device to get MAC based on IP -->  Update to ARP
    --> create Frame using MAC ( link layer-2)
    --> send frame to IP ( device )
    --> Response from end Device --> replace soure IP to 
       destination IP
    --> Response complete

------

do communcation in internal network happen using only 
mac and independent of IP

Communication within an internal network typically 
involves both MAC addresses and IP addresses, and the 
two work together to facilitate the exchange of data 
between devices. Let's break down how these addresses 
are used in internal network communication:

MAC Addresses (at the Data Link Layer - Layer 2):

MAC addresses are used at the Data Link layer for 
communication within the local network.
Devices on the same local network use MAC addresses 
to address frames to each other.
When a device wants to communicate with another device 
within the same local network, it uses the destination 
device's MAC address in the frame.

IP Addresses (at the Network Layer - Layer 3):

IP addresses are used at the Network layer for logical 
addressing and end-to-end communication across networks.
Devices use IP addresses to route packets between different networks.
In an internal network, IP addresses are crucial 
for devices to identify each other and communicate logically.

ARP (Address Resolution Protocol):

ARP is a protocol used within a local network to map an 
IP address to its corresponding MAC address.
When a device needs to communicate with another device 
on the same local network and it knows the destination 
IP address but not the MAC address, it uses ARP to 
discover the MAC address associated with that IP address.
In summary, internal network communication involves 
both MAC addresses and IP addresses. Devices within the 
same local network use MAC addresses to address frames 
for direct communication, and ARP helps resolve the 
mapping between IP addresses and MAC addresses when needed.

However, it's worth noting that in some scenarios, local 
communication might be facilitated solely by MAC addresses, 
especially in non-IP-based networks or specific network 
configurations. In modern networks that use IP, the combination 
of MAC and IP addresses is the standard for efficient and 
logical communication within and between networks.

# -------------------------------------------------------
  ## Process [How device communcates in Same Network ]
# -----------------------------------------------------

1] Device A wants to communicate with Device B:
    Device A knows the IP address of Device B and wants to send data 
    to it within the local network.

2] ARP Request:
    Device A checks its ARP table to see if it already knows the 
    MAC address associated with the IP address of Device B.
    If the MAC address is not in the ARP table, Device A broadcasts an 
    ARP request on the local network, asking, "Who has the IP address of Device B?"

3] Device B Responds:
    Device B, recognizing its IP address in the ARP request, 
    replies with its MAC address.
    This ARP response is unicast back to Device A.

4] ARP Table Update:
    Device A updates its ARP table with the MAC address of Device B, 
    associating it with the known IP address.

5] Data Transmission:
    Now that Device A has the MAC address of Device B, it can 
    construct a frame with the data and destination MAC address.
    The frame is then transmitted over the local network to 
    Device B based on the MAC address.

In this way, ARP helps devices within the same local network 
discover each other's MAC addresses based on their IP addresses. 
Once the MAC address is known, devices can efficiently communicate 
through data frames within the local network.

It's important to note that ARP is specific to local networks, and 
it operates at the link layer (Layer 2) of the OSI model. It facilitates 
communication within a single broadcast domain or local subnet.
