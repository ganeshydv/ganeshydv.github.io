---
layout: post
title: "Packet Routing Process"
date: 2025-07-21
categories: [networking, packet-tracing]
tags: [networking]
author: "GGurkhude"
excerpt: "Learning notes on packet routing process"
original_path: "2_Networking/Packet_Tracing/1_packet__to_destiantion_.md"
---

# Packet Routing Process

This document describes the process of routing a packet from a source device (Device A) to a destination device.

## Key Tables Involved

1. **MAC Address Table**: Maps MAC address to port (Layer 2: Data Link Layer, e.g., Switch, Mobile, Laptop)
2. **ARP Table**: Maps IP address to MAC Address (Layer 2 - Data link layer, e.g., Router/Mobile/Laptop)
3. **Routing Table**: Maps IP address to IP address (Layer 3 - Network Layer, e.g., Router)

## Packet Creation and Routing

1. **Packet Creation**: Device A (Mobile) creates a packet. It finds the destination IP using DNS and creates a packet with the source and destination IP addresses (Layer 3).

2. **MAC Address Discovery**: Device A broadcasts an ARP request to all devices in the network. The router registers Device A's IP and MAC addresses in its ARP table and sends back an ARP response to Device A. Device A saves this response in its ARP table.

3. **Frame Creation**: Device A creates a frame by adding the MAC addresses (Layer 2: TCP/IP: Data Link Layer) to the packet. It then sends this frame to the router.

4. **Frame Processing by Router**: The router verifies the IP and decides using the subnet if the IP is local or not. The router removes the Layer 2 data (source and destination MAC addresses) but not Layer 3. If the router doesn't have the MAC of the destination, it broadcasts an ARP request. The destination device sends back an ARP response in unicast. Both the destination device and the router update their ARP tables.

5. **Frame Completion and Forwarding**: The router adds Layer 3 data (its MAC as the source and the receiver's MAC as the destination) to complete the frame. It then forwards the frame to the switch, which processes the MAC and the respective port. The switch forwards the received message to the port.

6. **Packet Reception by Destination Device**: The destination device strips Layer 2 and then Layer 3 data to recover the original data.

## Response Process

The response process follows the same steps in reverse. 
- The destination device creates a packet with the source and destination IP addresses. 
- It checks if the IP is local or not and broadcasts an ARP message to find the MAC of the router. 
- The router receives the request, refreshes its ARP table data, and sends a unicast ARP response. 
- The destination device saves the MAC and IP of the router in its ARP table and also updates its MAC table. 
- It then creates a frame and sends it to the router. 
- The router checks the destination IP by subnet to decide if it's local or not, strips the Layer 2 data, broadcasts an ARP request to find the MAC of the next hop router or ISP, gets the ARP response, updates its ARP and routing tables or NAT table, adds Layer 3 data to the packet, and forwards it to the next hop or ISP.
----
# 3 Tables:

### 1) MAC address tables : 
- maps MAC address to PORT ( Layer 2: Data Link Layer, EX. Switch, Mobile,Laptop)
### 2) ARP Table : 
- Maps IP address : MAC Address (Layer 2 - Data link layer , Ex. Router/Mobile/Laptop)
### 3) Routing Table : 
- IP address : IP address ( layer 3 - network Layer , Ex. ROuter)

-------------------------------------------------

## MAC Address Table : in Mobile
## ARP Table : in Mobile
## Routing Table : In ROuter
## IP address : provided by ISP
-------------------------------

### 1) create packet:
```text
Device A (Mobile )--> create packet : find destination IP - DNS 
--> create packet [ source IP : destination IP ] : layer 3
```

### 2) find MAC address to create frame :

```text
Device A from PORT (SWITCH - MAC Table ) 
--> broadcast ARP Request 
--> to all devices in Network 
--> ARP : Device A MAC + IP 
--> Router registers in ARP Table [ Device A IP : MAC ]
--> Router Sends Back ARP Response [ MAC and IP of Router ]
--> TO device A 
--> Device A saves ARP response in Device A'a ARP Table 
--> Device A creates Frame : add MAC  [LAyer 2: TCP/IP:DATA Link Layer] to packet [ source MAC : destination MAC]
--> send Frame to Router
--> ROuter verifies IP and decides using subnet if IP in local or not
--> Router Removes L2 data ( source MAC : destination MAC) - NOT L3
--> Router needed to complete Frame
--> if Router don't have MAC of destination it broadcasts ARP and 
   device sends back ARP Response in unicast [MAC address ]
   { 
      It's essential to clarify that ARP requests and responses are typically broadcast
    within the local network segment. Routers do not forward ARP broadcasts across different network segments.
}
--> destination updates ARP table 
--> on Receving response Router updates ARP table
--> ADDS L3 [ Routers MAC as source : destination MAC as receivers MAC]
--> frame is complete 
--> forward frame to SWITCH (device) it Processes MAC and Respective Port 
--> SWITCH forwards Recevied msg to PORT 
--> destination Device Stips L2 and then L3 and recovers Data
<-- back same Process for response 
<-- decide if ip is in local or not
<-- create packet [ Layer 3 : add source and destination Ip]
<-- now check if is in local or not
<-- broadcast ARP msg to find MAC of ROuter
<-- Router receives Request 
<-- Refresh ARP table Data
<-- unicast ARP Response [ MAC address + IP Address]
<-- destination Device Saves MAC + IP of ROuter In ARP table
<-- also MAC table [ Router MAC:Port_for_Router]
<-- create frame : Add L3 [ source mac:destination_device MAC and destination:Routers_MAC]
<-- frame to Router
<-- Router check destination IP by subnet to decide in local or not
<-- Router strips L2 [ mac]
<-- broadcast ARP to find MAC of next hop router of ISP
<-- Gets Response ARP updates ARP table and Routing Tables or NAT Table
<-- ADDs L3 to packet 
<-- forward to next hop or ISP 
```
