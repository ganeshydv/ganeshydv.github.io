---
layout: post
title: "Network Communication Process"
date: 2025-07-21
categories: [system-design, 1--newroking---md]
tags: []
author: "GGurkhude"
excerpt: "Learning notes on network communication process"
original_path: "3_SystemDesign/1__newroking__.md"
---

# Network Communication Process

The process of network communication, whether within a Local Area Network (LAN) or across the internet, involves several steps:

## Communication within LAN

1. **Device Communication**: When a device in the LAN wants to communicate with another device within the same network, it checks whether the destination IP address is within the LAN.

2. **Address Resolution Protocol (ARP)**: If the destination is within the LAN, the device uses ARP to find the MAC address corresponding to the destination IP address. This mapping allows direct communication within the LAN.

## Routing to External Network

1. **Default Gateway**: If the destination is outside the LAN, the device sends the packet to its default gateway, usually a router.

2. **Router's Role**: The router examines the destination IP address and makes a routing decision. It encapsulates the packet in a new Ethernet frame with the source MAC address of the sending device and the destination MAC address of the router's interface connected to the LAN.

3. **Packet Forwarding**: The router receives the packet, updates the source MAC address with its own interface's MAC address, and forwards the packet towards its destination based on its routing table.

## Internet Routing

1. **Routing Decisions**: The packet traverses the Internet, with routers along the way making routing decisions based on the destination IP address.

2. **MAC Address Update**: At each hop, the MAC addresses within the Ethernet frame are updated, but the IP addresses remain constant.

## Final Destination Network

1. **ARP in Destination Network**: When the packet reaches the destination network (e.g., the network of a web server), the final router in that network uses ARP to determine the MAC address associated with the destination IP address within its local network.

2. **Delivery to Destination Device**: The packet is delivered to the destination device within its local network based on the mapping between IP and MAC addresses.

In summary, the process involves checking whether the destination is within the local network. If it is, ARP is used to find the MAC address for direct communication. If the destination is outside the local network, the packet is sent to the router, which encapsulates the packet and forwards it based on IP addresses across the Internet. At each hop, MAC addresses are updated within the Ethernet frame, while IP addresses remain constant for routing decisions.

```
Yes, you've captured the process correctly. Let's break down the steps:

Request within Local Network (LAN):

When a device in the local network wants to communicate with another 
device within the same network, it checks whether the destination IP 
address is within the local network.
If the destination is within the local network, the device may use 
ARP (Address Resolution Protocol) to find the MAC address corresponding 
to the destination IP address. This mapping allows direct communication 
within the LAN.

Routing to External Network (Internet):

If the destination is outside the local network, the device sends 
the packet to its default gateway (usually a router).
The router examines the destination IP address and makes a routing 
decision. It encapsulates the packet in a new Ethernet frame with 
the source MAC address of the sending device and the destination 
MAC address of the router's interface connected to the local network.
Router's Role:

The router receives the packet, updates the source MAC address with 
its own interface's MAC address, and forwards the packet towards 
its destination based on its routing table.


Internet Routing:

The packet traverses the Internet, with routers along the way 
making routing decisions based on the destination IP address.
At each hop, the MAC addresses within the Ethernet frame are 
updated, but the IP addresses remain constant.

Final Destination Network:

When the packet reaches the destination network 
(e.g., the network of a web server), the final router in 
that network uses ARP to determine the MAC address associated
with the destination IP address within its local network.
Delivery to Destination Device:

The packet is delivered to the destination device within its 
local network based on the mapping between IP and MAC addresses.
In summary, the process involves checking whether the 
destination is within the local network. If it is, ARP is 
used to find the MAC address for direct communication. If 
the destination is outside the local network, the packet is 
sent to the router, which encapsulates the packet and forwards 
it based on IP addresses across the Internet. At each hop, MAC 
addresses are updated within the Ethernet frame, while IP 
addresses remain constant for routing decisions.
```